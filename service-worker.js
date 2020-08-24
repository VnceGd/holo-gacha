// Resources
// https://developers.google.com/web/tools/workbox/guides/get-started
// https://developers.google.com/web/fundamentals/primers/service-workers

let CACHE_NAME = 'holo-cache'
let urlsToCache = ['/']

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response
            }
            return fetch(event.request)
            .then(
                function(response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response
                    }

                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    let responseToCache = response.clone()
        
                    caches.open(CACHE_NAME)
                    .then(function(cache) {
                        cache.put(event.request, responseToCache)
                    })
                    return response
                }
            )
        })
    )
})

self.addEventListener('activate', function(event) {
    let cacheAllowlist = ['holo-cache']

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

workbox.routing.registerRoute(
    ({url}) => url.pathname.startsWith('assets/audio/'),
    new workbox.strategies.CacheFirst()
)

workbox.routing.registerRoute(
    ({url}) => url.pathname.startsWith('assets/img/'),
    new workbox.strategies.CacheFirst()
)

workbox.routing.registerRoute(
    ({request}) => request.destination === 'style',
    new workbox.strategies.CacheFirst()
  )

workbox.routing.registerRoute(
    ({request}) => request.destination === 'script',
    new workbox.strategies.CacheFirst()
)