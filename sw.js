const CACHE_NAME = "seo-petals-v1";
const assets = [
  "./",
  "./index.html",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
];

// Instala o service worker e faz o cache da interface
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(assets);
    })
  );
});

// Intercepta a requisição e carrega do cache se o usuário estiver offline
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});