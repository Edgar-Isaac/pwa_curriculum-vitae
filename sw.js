;

const CACHE_NAME ='v1_cache_cv',
urlsToCache=[
    './',
    './style.css',
    './script.js',
    './img/Apperture Mesa.png',
    './img/Apperture Mesa-500.png',
    './img/bullseye-icon.png',
    './img/cazadorNW.png',
    './img/Csharp_Logo.png',
    './img/Perfil.png',
    './img/unity-tab.png',
    
]

//Almacenar en cache durante la instalación
self.addEventListener('install',e=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache=>{
                return cache.addAll(urlsToCache)
                    .then(()=>self.skipWaiting())
            })
            .catch(err=>console.log('Fallo registro de cache',err))
    )
})

//Activar Service Worker y buscar recursos para funcionar sin conexion
self.addEventListener('activate',e=>{
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
            .then(cacheNames=>{
                cacheNames.map(cacheName=>{
                    if(cacheWhitelist.indexOf(cacheName)===-1){
                        return caches.delete(cacheName)
                    }
                })
            })
            .then(()=>self.clients.claim())
    )
})

//Recuperar recursos del navegador
self.addEventListener('fetch',e=>{
e.respondWith(
    caches.match(e.request)
    .then(res=>{
        if (res) {
            return res
        }
        return fetch(e.request)
    })
)
})