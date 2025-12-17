// ============================================
// SERVICE WORKER FOR PWA
// ============================================
const CACHE_NAME = 'rfc-lissewege-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/styles/sidebar.css',
    '/styles/buttons.css',
    '/scripts/main.js'
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // Skip caching for external APIs and cross-origin requests
    if (url.origin !== self.location.origin || 
        url.hostname.includes('api.') ||
        url.hostname.includes('voetbalinbelgie.be') ||
        url.hostname.includes('api-football.com') ||
        url.hostname.includes('football-data.org')) {
        // For external APIs, just fetch without caching
        event.respondWith(
            fetch(event.request).catch(() => {
                // Silently fail for external API errors
                return new Response('{}', {
                    headers: { 'Content-Type': 'application/json' }
                });
            })
        );
        return;
    }
    
    // For local resources, use cache-first strategy
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request).catch(() => {
                    // Return empty response if fetch fails
                    return new Response('', { status: 404 });
                });
            })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

