self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('vagas-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/app.js',
                '/Manifest.json',
                'icons/icons-192x192.png',
                'icons/icons-512x512.png',
                '/vaga.json'
                
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
