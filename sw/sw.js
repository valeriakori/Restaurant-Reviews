self.addEventListener('install', (evt) => {
    
    //let cacheName = 'static-cache-v1';
    let urlsToCache = [
    '/skeleton',
    '//normalize-css.googlecode.com/svn/trunk/normalize.css',
    ''
    ];

    evt.waitUntil(
        caches.open('cacheName').then((cache) => {
            //console.log('cache activated')
            return cache.addAll(urlsToCache);
        }).catch((event) => console.log(event))
    );
});

