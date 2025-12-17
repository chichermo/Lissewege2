// ============================================
// PAGE NAVIGATION SYSTEM (Single Page App)
// ============================================
let pages = [];
let sidebarLinks = [];
let currentPage = 'home';

// Update active sidebar link based on current page
function updateActiveSidebarLink(pageId) {
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.substring(1) === pageId) {
            link.classList.add('active');
        }
    });
}

// Show specific page
function showPage(pageId) {
    console.log('=== Showing page:', pageId, '===');
    
    // Refresh pages list in case DOM changed
    pages = document.querySelectorAll('.page-section');
    console.log('Total pages found:', pages.length);
    
    // Hide ALL pages first
    pages.forEach((page, index) => {
        const pageIdAttr = page.getAttribute('id');
        console.log(`Hiding page ${index + 1}:`, pageIdAttr);
        page.classList.remove('active');
        page.style.display = 'none';
        page.style.opacity = '0';
        page.style.visibility = 'hidden';
    });
    
    // Find and show target page
    const targetPage = document.getElementById(pageId);
    console.log('Target page element found:', targetPage ? 'YES' : 'NO');
    
    if (targetPage) {
        console.log('Target page classes before:', targetPage.className);
        targetPage.classList.add('active');
        targetPage.style.display = 'block';
        targetPage.style.opacity = '1';
        targetPage.style.visibility = 'visible';
        console.log('Target page classes after:', targetPage.className);
        console.log('Target page computed display:', window.getComputedStyle(targetPage).display);
        
        currentPage = pageId;
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Update URL hash without scrolling
        if (history.pushState) {
            history.pushState(null, null, `#${pageId}`);
        } else {
            window.location.hash = pageId;
        }
        
        // Update active sidebar link
        updateActiveSidebarLink(pageId);
        
        // Initialize section-specific functionality
        initializeSectionFeatures(pageId);
        
        console.log('✓ Page shown successfully:', pageId);
        console.log('==========================================');
    } else {
        console.error('✗ Page not found:', pageId);
        const availableIds = Array.from(pages).map(p => p.id).filter(id => id);
        console.log('Available page IDs:', availableIds);
        console.log('==========================================');
    }
}

// Initialize section-specific features
function initializeSectionFeatures(pageId) {
    switch(pageId) {
        case 'statistieken':
            // Initialize statistics
            if (window.playerStats) {
                setTimeout(() => {
                    window.playerStats.updateStatistics('2024-2025');
                }, 100);
            }
            break;
        case 'reserveringen':
            // Initialize reservations
            if (window.facilityReservations) {
                setTimeout(() => {
                    window.facilityReservations.renderCalendar();
                    window.facilityReservations.updateReservationsList();
                }, 100);
            }
            break;
        case 'winkel':
            // Initialize shop
            if (window.clubShop) {
                setTimeout(() => {
                    window.clubShop.renderProducts();
                    window.clubShop.updateCartUI();
                }, 100);
            }
            break;
        case 'notificaties':
            // Initialize notifications
            if (window.notificationsSystem) {
                setTimeout(() => {
                    window.notificationsSystem.renderNotifications();
                    window.notificationsSystem.updatePermissionUI();
                }, 100);
            }
            break;
        case 'geschiedenis':
            // Initialize history
            if (window.clubHistory) {
                setTimeout(() => {
                    window.clubHistory.showSeasonDetails('2024-2025');
                    window.clubHistory.renderTimeline();
                    window.clubHistory.renderAchievements();
                }, 100);
            }
            break;
    }
}

// Initialize: show home page
function initPages() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    } else {
        showPage('home');
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Get all elements after DOM is loaded
    pages = document.querySelectorAll('.page-section');
    sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    const sidebar = document.getElementById('sidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    console.log('Pages found:', pages.length);
    console.log('Sidebar links found:', sidebarLinks.length);
    
    // Ensure all pages are hidden initially
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            if (sidebar) {
                sidebar.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
                if (mobileOverlay) mobileOverlay.classList.toggle('active');
                document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
            }
        });
    }
    
    // Close sidebar when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            if (sidebar) sidebar.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Sidebar toggle (desktop)
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            if (sidebar) sidebar.classList.toggle('collapsed');
        });
    }
    
    // Smooth navigation for sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const href = link.getAttribute('href');
            if (!href || href === '#') {
                console.log('No href found or href is #');
                return;
            }
            
            const targetId = href.substring(1);
            console.log('Link clicked:', targetId, 'Full href:', href);
            
            // Verify page exists before showing
            const targetPage = document.getElementById(targetId);
            if (!targetPage) {
                console.error('Page not found for ID:', targetId);
                console.log('Available IDs:', Array.from(pages).map(p => p.id));
                return;
            }
            
        showPage(targetId);
        
        // Trigger page change event for other scripts
        document.dispatchEvent(new CustomEvent('pageChanged', { detail: { pageId: targetId } }));
        
        // Close mobile menu if open
        if (sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showPage(hash);
        }
    });
    
    // Initialize pages
    initPages();
    
    // Double check after a short delay
    setTimeout(() => {
        pages.forEach(page => {
            if (!page.classList.contains('active')) {
                page.style.display = 'none';
            } else {
                page.style.display = 'block';
            }
        });
    }, 100);
});

// ============================================
// NEWS CAROUSEL
// ============================================
let currentSlide = 0;
const newsSlides = document.querySelectorAll('.news-slide');
const prevBtn = document.getElementById('prevNews');
const nextBtn = document.getElementById('nextNews');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    newsSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + newsSlides.length) % newsSlides.length;
        showSlide(currentSlide);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % newsSlides.length;
        showSlide(currentSlide);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-play carousel
setInterval(() => {
    if (newsSlides.length > 0) {
        currentSlide = (currentSlide + 1) % newsSlides.length;
        showSlide(currentSlide);
    }
}, 5000);

// ============================================
// TEAM SELECTOR FOR PLAYERS
// ============================================
const teamSelectBtns = document.querySelectorAll('.team-select-btn');
const playersTeams = document.querySelectorAll('.players-team');

teamSelectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const teamId = btn.getAttribute('data-team');
        
        // Update active button
        teamSelectBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show selected team
        playersTeams.forEach(team => {
            team.classList.remove('active');
            if (team.id === `team-${teamId}`) {
                team.classList.add('active');
            }
        });
    });
});

// ============================================
// ANIMATED COUNTERS
// ============================================

const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.animated) {
                const target = parseInt(statNumber.dataset.target);
                animateCounter(statNumber, target);
                statNumber.dataset.animated = 'true';
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(item => {
    counterObserver.observe(item);
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add fade-in animation to sections
document.querySelectorAll('.section, .about-card, .team-card, .news-card, .gallery-item, .calendar-card, .pricing-card, .member-card, .contact-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(element);
});

// ============================================
// FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Bedankt voor je bericht! We nemen zo spoedig mogelijk contact met je op.');
        
        // Reset form
        contactForm.reset();
    });
}

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would normally send the email to a server
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Bedankt voor je aanmelding! Je ontvangt binnenkort onze nieuwsbrief.');
        
        // Reset form
        newsletterForm.reset();
    });
}

// ============================================
// GALLERY LIGHTBOX (Simple Implementation)
// ============================================

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            // Simple alert - you can implement a proper lightbox here
            // For a full implementation, consider using a library like Lightbox2 or GLightbox
            window.open(img.src, '_blank');
        }
    });
});

// ============================================
// PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight);
        }
    }
});

// ============================================
// LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('R.F.C. Lissewege website loaded successfully!');
    
    // Set initial active nav link
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

