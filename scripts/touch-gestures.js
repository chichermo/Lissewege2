// ============================================
// TOUCH GESTURES FOR MOBILE
// ============================================
function initTouchGestures() {
    // Swipe for gallery
    initGallerySwipe();
    
    // Pull to refresh
    initPullToRefresh();
}

function initGallerySwipe() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        let startX = 0;
        let startY = 0;
        let distX = 0;
        let distY = 0;
        let threshold = 50;
        let restraint = 100;
        let allowedTime = 300;
        let startTime = 0;

        item.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = new Date().getTime();
        });

        item.addEventListener('touchend', (e) => {
            const touch = e.changedTouches[0];
            distX = touch.clientX - startX;
            distY = touch.clientY - startY;
            const elapsedTime = new Date().getTime() - startTime;

            if (elapsedTime <= allowedTime) {
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                    if (distX > 0) {
                        // Swipe right - previous image
                        const lightbox = document.getElementById('lightbox');
                        if (lightbox && lightbox.classList.contains('active')) {
                            showPreviousImage();
                        }
                    } else {
                        // Swipe left - next image
                        const lightbox = document.getElementById('lightbox');
                        if (lightbox && lightbox.classList.contains('active')) {
                            showNextImage();
                        }
                    }
                }
            }
        });
    });
}

function initPullToRefresh() {
    let touchStartY = 0;
    let touchEndY = 0;
    const pullThreshold = 100;

    document.addEventListener('touchstart', (e) => {
        if (window.scrollY === 0) {
            touchStartY = e.touches[0].clientY;
        }
    });

    document.addEventListener('touchmove', (e) => {
        if (window.scrollY === 0 && touchStartY > 0) {
            touchEndY = e.touches[0].clientY;
            const pullDistance = touchEndY - touchStartY;

            if (pullDistance > pullThreshold) {
                // Show pull to refresh indicator
                showPullIndicator(pullDistance);
            }
        }
    });

    document.addEventListener('touchend', () => {
        if (touchEndY - touchStartY > pullThreshold && window.scrollY === 0) {
            refreshContent();
        }
        touchStartY = 0;
        touchEndY = 0;
        hidePullIndicator();
    });
}

function showPullIndicator(distance) {
    let indicator = document.getElementById('pullIndicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'pullIndicator';
        indicator.innerHTML = '<i class="fas fa-sync-alt"></i> <span>Trek om te vernieuwen</span>';
        document.body.appendChild(indicator);

        const style = document.createElement('style');
        style.textContent = `
            #pullIndicator {
                position: fixed;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                background: var(--gradient-primary);
                color: var(--white);
                padding: 1rem 2rem;
                border-radius: 0 0 12px 12px;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                z-index: 10000;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }
        `;
        document.head.appendChild(style);
    }
    indicator.style.display = 'flex';
}

function hidePullIndicator() {
    const indicator = document.getElementById('pullIndicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
}

function refreshContent() {
    // Reload page or refresh content
    window.location.reload();
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTouchGestures);
} else {
    initTouchGestures();
}

