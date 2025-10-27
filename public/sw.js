const CACHE_NAME = 'EPR-v1';
const ASSETS = [
    '/',               
    '/offline',        
    '/android-chrome-192x192.png' 
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
        )
    );
    self.clients.claim(); 
});

self.addEventListener('fetch', (event) => {
    const req = event.request;

    // 1) For navigations (HTML): network-first + fallback to /offline
    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req).catch(() => caches.match('/offline'))
        );
        return;
    }

    // 2) For same-origin static assets: cache-first (fast/offline)
    const url = new URL(req.url);
    const isSameOrigin = url.origin === self.location.origin;
    const isStatic = ['style', 'script', 'image', 'font'].includes(req.destination);

    if (req.method === 'GET' && isSameOrigin && isStatic) {
        event.respondWith(
            caches.match(req).then((hit) =>
                hit ||
                fetch(req).then((res) => {
                    const resClone = res.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
                    return res;
                })
            )
        );
        return;
    }

    // 3) Otherwise: just use the network as usual
    // (prevents breaking third-party API requests, POST, etc.)
});