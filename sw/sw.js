self.addEventListener('install', (evt) => {
    
    //let cacheName = 'static-cache-v1';
    let urlsToCache = [
    '/skeleton',
    '//normalize-css.googlecode.com/svn/trunk/normalize.css',
    ''
    ];

    evt.waitUntil(
        caches.open('cacheName')
        .then((cache) => {
            //console.log('cache activated')
            return cache.addAll(urlsToCache);
        })
        .catch((event) => console.log(event))
    );
});

self.addEventListener('fetch', (evt) => {

    let requestUrl = new URL(evt.request.url);

    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
            evt.respondWith(caches.match('skeleton'))
        }
    }

    evt.respondWith(caches.match(evt.request)
    .then((response) => {
        return response || fetch(evt.request);
    }));

});
