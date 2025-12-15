// ============================================
// SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale'
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Auto-add animation classes to cards and sections
    const cards = document.querySelectorAll('.team-card, .news-card, .pricing-card, .product-item, .member-card, .about-card, .benefit-item');
    cards.forEach((card, index) => {
        card.classList.add('fade-in-up');
        if (index % 2 === 0) {
            card.classList.add(`stagger-delay-${(index % 5) + 1}`);
        }
    });

    // Observe cards
    cards.forEach(card => observer.observe(card));
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// Re-initialize when page changes
document.addEventListener('pageChanged', initScrollAnimations);

