const CACHE_NAME = 'test-series-product';
// precaching on first page load
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          '/',
          '/display-tests.html',
          '/css/utilities.css',
          '/css/display-test.css',
          '/css/styles.css',
          '/images/linkedin.png',
          '/scripts/display_test_archive.js',
          '/data/tests.json'
        ])
      })
  )
})

// resulting the cached response if found in cache
// or fetching over network and storing in different cache
self.addEventListener('fetch', (event) => {
  console.log(event.request.url);
  console.log(event.request);
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

          caches.open(getCacheName(event.request))
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

function getCacheName(request) {
  const {destination} = request;
  switch (destination) {
    case 'script': return 'scripts';
    case 'style': return 'styles';
    case 'document': return 'html';
    case 'image': return 'images';
    case 'object': return 'data';
  }
  const [contentType] = request.url.split(/\./).splice(-1);
  if (contentType === 'json') return 'data';

  return 'test';
}