const CACHE_NAME = 'test-series-product';
// self.addEventListener('install', (e) => {
//   e.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => {
//         return cache.addAll([
//           '/',
//           '/display-tests.html',
//           '/css/utilities.css',
//           '/css/display-test.css',
//           '/css/styles.css',
//           '/images/linkedin.png',
//           '/scripts/display_test_archive.js',
//           '/data/tests.json'
//         ])
//       })
//   )
// })

self.addEventListener('fetch', (event) => {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // cache hit
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          if (isNotValidResponse(response)) return response;

          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        })
      })
  )
})

function isNotValidResponse(response) {
  return !response || response.status !== 200 || response.type !== 'basic'
}