importScripts("https://cdn.jsdelivr.net/npm/localforage/dist/localforage.js");

const deleteCache = async (key) => {
  await caches.delete(key);
};
const VERSION = "v3";
/**
 * Deletes all old cache files
 * @returns {Promise<void>}
 */
const deleteOldCaches = async () => {
  const cacheKeepList = [""];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
  await Promise.all(cachesToDelete.map(deleteCache));
};
const APPSHELL_FILES = [
  "/",
  "/projects",
];


const handleFetchRequest = (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open("appshell" + VERSION);
      cache.put(e.request, response.clone());
      return response;
    })(),
  );
}

const handleProjectsFetchRequest = (e) => {
   return e.respondWith(
    fetch(e.request).then((response) => { 
      return response;
    }).catch((err) => {
      localforage.keys().then((keys) => {
        const projectPromises = keys.map((key) => localforage.getItem(key));

        // Wait for all promises to resolve
        return Promise.all(projectPromises);
      }).then((projects) => {   
        return new Response(JSON.stringify({ data: projects }), {
          headers: { "Content-Type": "application/json"  },
        });
      }
      );
    }
    )

  );
  
}

self.addEventListener("fetch", (e, t) => {

  const url = e.request.url;

  // if url contains /projects, fetch differently 
  if (url.includes("/projects")) {
    handleProjectsFetchRequest(e);
  }
  else handleFetchRequest(e);

});

self.addEventListener("activate", (event) => {
  event.waitUntil(deleteOldCaches());
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open("appshell" + VERSION);
      cache.addAll(APPSHELL_FILES);
    })(),
  );
});