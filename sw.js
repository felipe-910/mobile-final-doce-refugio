const CACHE_NAME = 'refugio-doce-cache-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './cardapio.html',
    './checkout.html', './login.html',
    './CSS/style.css',
    './CSS/cardapio.css',
    './CSS/checkout.css', './CSS/login.css',
    './JS/cardapio.js', './JS/cardapio_novo.js',
    './JS/checkout_api.js', './JS/login.js', './JS/firebase_config.js', './JS/auth.js', './JS/register-sw.js',
    './service-worker.js',
    './WhatsAppImage2025-11-20at16.41.15(1).jpeg',
    './WhatsAppImage2025-11-20at16.41.15(1).jpeg'
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );

});



