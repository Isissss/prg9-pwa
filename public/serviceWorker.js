importScripts("https://cdn.jsdelivr.net/npm/localforage/dist/localforage.js");

const deleteCache = async (key) => {
  await caches.delete(key);
};
const VERSION = "v2";

const APPSHELL_FILES = [
  "/",
  "/project/natuurdekkers",
  "/hello",  
  "_next/static/chunks/app/project/[slug]/page.js"]

/**
 * Deletes all old cache files
 * @returns {Promise<void>}
 */
const deleteOldCaches = async () => {
  const cacheKeepList = [];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
  await Promise.all(cachesToDelete.map(deleteCache));
};

const handleFetchRequest = (e) => {
  e.respondWith(
    (async () => {
      const cachedResponse = await caches.match(e.request);
      if (cachedResponse) {
        return cachedResponse;
      }
      try {
        const networkResponse = await fetch(e.request);
        if (networkResponse.ok) {
          const cache = await caches.open("appshell" + VERSION);
          cache.put(e.request, networkResponse.clone());
        }
        return networkResponse;
      } catch (error) {
        return Response.error();
      }
    })(),
  );
}

const cacheProjectImages = async () => {
  // open cache with project-images 
  try {
    const cache = await caches.open("project-images");
    const response = await fetch('https://cmgt.hr.nl/api/projects')
    const data = await response.json()
    const projects = data.data

    const images = projects?.map(({ project }) => {
      let images = []
      images.push(project.header_image)
      project?.screenshots?.forEach(screenshot => images.push(screenshot))
      return images
    }) ?? []

    await cache.addAll(images)
  } catch (e) {
    console.error("Failed to cache project images", e);
  }
}

const handleProjectImageFetchRequest = (e) => {
  e.respondWith(
    (async () => {
      try {
        // get cached response
        const cachedResult = await caches.match(e.request);
        if (cachedResult) {
          return cachedResult;
        }

        const response = await fetch(e.request);
        const cache = await caches.open("project-images");
        cache.put(e.request, response.clone());
        return response;
      } catch (e) {
        console.error("Failed to cache project images", e);
      }
    })(),
  );
}


const handleProjectFetchRequest = (e) => {
  e.respondWith(
    fetch(e.request).then((response) => {
      return response;
    }).catch((err) => {
      console.log("Failed to fetch project data, trying to retrieve from localForage");


      const url = new URL(e.request.url);
      const projectName = url.pathname.split("/").pop();
      return localforage.getItem(projectName).then((project) => {
        return new Response(JSON.stringify(project), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      }).catch((localForageErr) => {
        console.error("Error retrieving data from localForage:", localForageErr);
        return new Response(JSON.stringify({ error: "Failed to fetch data and retrieve local data" }), {
          headers: { "Content-Type": "application/json" },
          status: 500,
        });
      });
    })
  );
}


const handleProjectsFetchRequest = (e) => {
  e.respondWith(
    fetch(e.request).then((response) => {
      return response;
    }).catch((err) => {
      // get all projects and map through them 
      return localforage.keys().then((keys) => {
        const projectPromises = keys.map((key) => localforage.getItem(key));

        return Promise.all(projectPromises);
      }).then((projects) => {
        // return the projects as a response
        return new Response(JSON.stringify({ data: projects }), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      }).catch((localForageErr) => {
        // if localforage fails, return an error response
        console.error("Error retrieving data from localForage:", localForageErr);
        return new Response(JSON.stringify({ error: "Failed to fetch data and retrieve local data" }), {
          headers: { "Content-Type": "application/json" },
          status: 500,
        });
      });
    })
  );
};

self.addEventListener("fetch", (e) => {

  const url = e.request.url;

  // if url contains /projects, fetch differently 
  if (url === "https://cmgt.hr.nl/api/projects") {
    handleProjectsFetchRequest(e);
    // project/project-name
  } else if (url.includes("https://cmgt.hr.nl/api/projects")) {
    handleProjectFetchRequest(e);
  }
  else if (url.includes("https://cmgt.hr.nl/storage/uploads")) {
    handleProjectImageFetchRequest(e);
  }
  else handleFetchRequest(e);

});

self.addEventListener("activate", (event) => {
  event.waitUntil(deleteOldCaches());
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open("appshell" + VERSION);
        await cache.addAll(APPSHELL_FILES);
      } catch (e) {
        console.error("Failed to cache app shell", e);
      }
    })(),
  );

  (async () => {
    try {
      await cacheProjectImages()
    } catch (e) {
      console.error("Failed to cache project images", e);
    }
  })()
});