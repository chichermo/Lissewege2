/**
 * Professional Top Navigation Behavior
 */
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('mainHeader');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Header Effect
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Mobile Menu Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Icon animation
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Active Link Highlighting based on Page State
    const updateActiveLink = (pageId) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${pageId}`) {
                link.classList.add('active');
            }
        });
    };

    // Listen to custom event from main.js
    document.addEventListener('pageChanged', (e) => {
        if (e.detail && e.detail.pageId) {
            updateActiveLink(e.detail.pageId);
        }
    });

    // Initial check
    const currentHash = window.location.hash.substring(1) || 'home';
    updateActiveLink(currentHash);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Mobile menu close logic
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            // Note: Navigation is handled by main.js via hash change
        });
    });
});
