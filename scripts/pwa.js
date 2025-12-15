// ============================================
// PROGRESSIVE WEB APP (PWA)
// ============================================
function initPWA() {
    // Register service worker
    registerServiceWorker();
    
    // Add install prompt
    addInstallPrompt();
}

function registerServiceWorker() {
    // Only register service worker if running on HTTP/HTTPS (not file://)
    if ('serviceWorker' in navigator && (location.protocol === 'http:' || location.protocol === 'https:')) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    // Silently fail for local development
                    if (location.protocol !== 'file:') {
                        console.log('Service Worker registration failed:', error);
                    }
                });
        });
    }
}

function addInstallPrompt() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button
        showInstallButton();
    });

    function showInstallButton() {
        const installBtn = document.createElement('button');
        installBtn.className = 'pwa-install-btn';
        installBtn.innerHTML = '<i class="fas fa-download"></i> <span>Installeer App</span>';
        installBtn.setAttribute('aria-label', 'Installeer als app');
        
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            const sidebarFooter = sidebar.querySelector('.sidebar-footer');
            if (sidebarFooter) {
                sidebarFooter.insertBefore(installBtn, sidebarFooter.firstChild);
            }
        }

        installBtn.addEventListener('click', async () => {
            if (!deferredPrompt) return;
            
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                console.log('User accepted install prompt');
            }
            
            deferredPrompt = null;
            installBtn.remove();
        });

        // Add CSS
        const style = document.createElement('style');
        style.textContent = `
            .pwa-install-btn {
                width: 100%;
                padding: 0.75rem;
                background: var(--accent-color);
                color: var(--white);
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                margin-bottom: 1rem;
                transition: all 0.3s ease;
            }
            .pwa-install-btn:hover {
                background: var(--accent-light);
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPWA);
} else {
    initPWA();
}

