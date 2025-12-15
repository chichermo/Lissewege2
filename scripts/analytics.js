// ============================================
// GOOGLE ANALYTICS INTEGRATION
// ============================================
function initAnalytics() {
    // Google Analytics 4 (GA4) - Replace G-XXXXXXXXXX with your tracking ID
    const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your actual tracking ID
    
    if (GA_TRACKING_ID === 'G-XXXXXXXXXX') {
        console.log('Google Analytics: Please add your tracking ID in scripts/analytics.js');
        return;
    }

    // Load GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize GA
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);

    // Track page views
    trackPageView();

    // Track custom events
    trackCustomEvents();
}

function trackPageView() {
    // Track initial page view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }

    // Track page changes (for SPA)
    const originalShowPage = window.showPage;
    if (originalShowPage) {
        window.showPage = function(pageId) {
            originalShowPage(pageId);
            
            setTimeout(() => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'page_view', {
                        page_title: `${pageId} - R.F.C. Lissewege`,
                        page_location: window.location.href
                    });
                }
            }, 100);
        };
    }
}

function trackCustomEvents() {
    // Track button clicks
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a, button');
        if (!target) return;

        const text = target.textContent.trim();
        const href = target.getAttribute('href');

        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'engagement',
                event_label: text || href,
                value: 1
            });
        }
    });

    // Track form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'engagement',
                    event_label: form.id || 'form'
                });
            }
        });
    });

    // Track search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'search', {
                        event_category: 'engagement',
                        search_term: searchInput.value
                    });
                }
            }, 1000);
        });
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
    initAnalytics();
}

