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
    
    // Completely skip service worker for external APIs and cross-origin requests
    // This prevents CORS errors from appearing in the console
    if (url.origin !== self.location.origin || 
        url.hostname.includes('api.') ||
        url.hostname.includes('voetbalinbelgie.be') ||
        url.hostname.includes('api-football.com') ||
        url.hostname.includes('football-data.org') ||
        url.hostname.includes('googleapis.com') ||
        url.hostname.includes('gstatic.com') ||
        url.hostname.includes('cdnjs.cloudflare.com')) {
        // Don't intercept external API requests at all - let them pass through
        return;
    }
    
    // For local resources only, use cache-first strategy
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

