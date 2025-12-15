// ============================================
// IMAGE OPTIMIZATION & LAZY LOADING
// ============================================
function initImageOptimization() {
    // Add lazy loading to all images
    addLazyLoading();
    
    // Convert images to WebP where supported
    optimizeImageFormats();
}

function addLazyLoading() {
    // Use native lazy loading with Intersection Observer fallback
    const images = document.querySelectorAll('img:not([loading])');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        images.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback: Intersection Observer
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => {
            if (!img.src || img.src === '') {
                img.dataset.src = img.getAttribute('src') || '';
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            }
            imageObserver.observe(img);
        });
    }

    // Add loading placeholder
    const style = document.createElement('style');
    style.textContent = `
        img[loading="lazy"] {
            background: var(--light-color);
            min-height: 200px;
        }
        img.loaded {
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

function optimizeImageFormats() {
    // Check WebP support
    const webpSupported = checkWebPSupport();
    
    if (webpSupported) {
        // Convert image sources to WebP
        const images = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]');
        images.forEach(img => {
            const src = img.src;
            // In production, you would replace with actual WebP versions
            // img.src = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        });
    }
}

function checkWebPSupport() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

// Add responsive images with srcset
function addResponsiveImages() {
    const images = document.querySelectorAll('img:not([srcset])');
    
    images.forEach(img => {
        if (img.src && !img.hasAttribute('srcset')) {
            // Generate srcset for responsive images
            const baseSrc = img.src;
            const srcset = `
                ${baseSrc}?w=400 400w,
                ${baseSrc}?w=800 800w,
                ${baseSrc}?w=1200 1200w
            `;
            img.srcset = srcset;
            img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
        }
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageOptimization);
} else {
    initImageOptimization();
}

// Re-optimize when new content is loaded
document.addEventListener('pageChanged', () => {
    setTimeout(initImageOptimization, 100);
});

