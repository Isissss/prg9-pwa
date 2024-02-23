const deleteCache = async (key) => {
    await caches.delete(key);
};
const VERSION = "v1"; 
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

  self.addEventListener("fetch", (e) => {
    console.log(`[Service Worker] Fetched resource ${e.request.url}`);
  });

self.addEventListener("activate", (event) => {
    event.waitUntil(deleteOldCaches());
});
 
  self.addEventListener("install", (event) => {
    event.waitUntil(
      (async () => {
        const cache = await caches.open("appshell" + VERSION);
        console.log("[Service Worker] Caching all: app shell and content");
        cache.addAll(APP_STATIC_RESOURCES);
      })(),
    );
  });