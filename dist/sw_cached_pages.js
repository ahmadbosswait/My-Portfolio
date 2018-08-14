const cacheName = 'v2';

const cacheAssets = [
  "index.html",
  "about.html",
  "work.html",
  "contact.html",
  "js/main.js",
  "css/main.css",
  "img/background.jpg",
  "img/portrait_small.jpg",
  "img/portrait-old.jpg",
  "img/projects/project1.jpg",
  "img/projects/project2.jpg",
  "img/projects/project3.jpg",
  "img/projects/project4.jpg",
  "img/projects/project5.jpg",
  "img/portrait.jpg"
];

// Call Install Event
self.addEventListener("install", e => {
  console.log("Service Worker: Installed");
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("Service Worker: Caching Files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener("activate", e => {
  console.log("Service Worker: Activated");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener("fetch", e => {
  console.log("Service Worker: Fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
