// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================
function initAccessibility() {
    // Add ARIA labels where missing
    addARIALabels();
    
    // Improve keyboard navigation
    improveKeyboardNavigation();
    
    // Add skip to content link
    addSkipToContent();
    
    // Improve focus indicators
    improveFocusIndicators();
}

function addARIALabels() {
    // Add aria-labels to buttons without text
    document.querySelectorAll('button:not([aria-label]):not(:has(span)):not(:has(.fas))').forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) {
            const iconClass = icon.className;
            let label = 'Button';
            if (iconClass.includes('bars')) label = 'Toggle menu';
            if (iconClass.includes('times')) label = 'Close';
            if (iconClass.includes('chevron')) label = 'Navigate';
            btn.setAttribute('aria-label', label);
        }
    });

    // Add aria-labels to links
    document.querySelectorAll('a[href="#"]:not([aria-label])').forEach(link => {
        const text = link.textContent.trim();
        if (!text) {
            link.setAttribute('aria-label', 'Link');
        }
    });
}

function improveKeyboardNavigation() {
    // Add keyboard navigation to cards
    const cards = document.querySelectorAll('.team-card, .news-card, .product-item, .pricing-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = card.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
    });

    // Improve sidebar keyboard navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach((link, index) => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextLink = sidebarLinks[index + 1];
                if (nextLink) nextLink.focus();
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevLink = sidebarLinks[index - 1];
                if (prevLink) prevLink.focus();
            }
        });
    });
}

function addSkipToContent() {
    const skipLink = document.createElement('a');
    skipLink.href = '#mainContent';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.setAttribute('aria-label', 'Skip to main content');
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .skip-to-content {
            position: absolute;
            top: -100px;
            left: 0;
            background: var(--primary-color);
            color: var(--white);
            padding: 1rem 2rem;
            text-decoration: none;
            z-index: 10000;
            border-radius: 0 0 8px 0;
        }
        .skip-to-content:focus {
            top: 0;
        }
    `;
    document.head.appendChild(style);
}

function improveFocusIndicators() {
    const style = document.createElement('style');
    style.textContent = `
        *:focus-visible {
            outline: 3px solid var(--accent-color);
            outline-offset: 2px;
            border-radius: 4px;
        }
        button:focus-visible,
        a:focus-visible {
            outline: 3px solid var(--accent-color);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccessibility);
} else {
    initAccessibility();
}

