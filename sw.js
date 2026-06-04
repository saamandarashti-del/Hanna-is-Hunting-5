const CACHE = 'hanna-v1';
const FILES = [
  './hanna_is_hunting%20(3).html',
  './'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(cache){
      return cache.addAll(FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  self.clients.claim();
});

self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(r){
      return r || fetch(e.request).then(function(res){
        caches.open(CACHE).then(function(c){c.put(e.request,res.clone());});
        return res;
      });
    }).catch(function(){
      return caches.match(e.request);
    })
  );
});
