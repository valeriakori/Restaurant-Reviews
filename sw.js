let staticCacheName = 'static-cache-v1';
let urlsToCache = [
    '/skeleton',
    '//normalize-css.googlecode.com/svn/trunk/normalize.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'css/styles.css',
    'data/restaurant.json',
    'js/dbhelper.js',
    'js/main.js',
    'restaurant_info.js',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',    
    ];

self.addEventListener('install', (event) => {
    
    event.waitUntil(
        caches.open(staticCacheName)
        .then((cache) => {
            console.log('cache activated')
            return cache.addAll(urlsToCache);
        })
        .catch((event) => console.log(event))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
        .then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName.startsWith('static-') &&
                           cacheName != staticCacheName;
                })
                .map((cacheName) => {
                    return cache.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {

    let requestUrl = new URL(event.request.url);

    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
            event.respondWith(caches.match('skeleton'))
        }
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
