// ============================================
// BREADCRUMBS NAVIGATION
// ============================================
const breadcrumbMap = {
    'home': { title: 'Home', icon: 'fas fa-home' },
    'club-info': { title: 'Club Info', icon: 'fas fa-building' },
    'over-ons': { title: 'Over Ons', icon: 'fas fa-info-circle' },
    'teams': { title: 'Teams', icon: 'fas fa-users' },
    'spelers': { title: 'Spelers', icon: 'fas fa-user-friends' },
    'nieuws': { title: 'Nieuws', icon: 'fas fa-newspaper' },
    'galerij': { title: 'Galerij', icon: 'fas fa-images' },
    'kalender': { title: 'Kalender', icon: 'fas fa-calendar-alt' },
    'prijslijst': { title: 'Prijslijst', icon: 'fas fa-euro-sign' },
    'team': { title: 'Team', icon: 'fas fa-user-tie' },
    'sponsors': { title: 'Sponsors', icon: 'fas fa-handshake' },
    'contact': { title: 'Contact', icon: 'fas fa-envelope' }
};

function initBreadcrumbs() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    // Create breadcrumbs container
    const breadcrumbsHTML = `
        <nav class="breadcrumbs" id="breadcrumbs" aria-label="Breadcrumb">
            <ol class="breadcrumbs-list" id="breadcrumbsList"></ol>
        </nav>
    `;

    // Insert at the beginning of main content
    mainContent.insertAdjacentHTML('afterbegin', breadcrumbsHTML);

    updateBreadcrumbs('home');
}

function updateBreadcrumbs(pageId) {
    const breadcrumbsList = document.getElementById('breadcrumbsList');
    if (!breadcrumbsList) return;

    const currentPage = breadcrumbMap[pageId];
    if (!currentPage) return;

    breadcrumbsList.innerHTML = `
        <li class="breadcrumbs-item">
            <a href="#home" class="breadcrumbs-link" data-section="home">
                <i class="fas fa-home breadcrumbs-icon"></i>
                <span>Home</span>
            </a>
        </li>
        <li class="breadcrumbs-separator">
            <i class="fas fa-chevron-right"></i>
        </li>
        <li class="breadcrumbs-item">
            <span class="breadcrumbs-link active">
                <i class="${currentPage.icon} breadcrumbs-icon"></i>
                <span>${currentPage.title}</span>
            </span>
        </li>
    `;

    // Add click handler for home link
    const homeLink = breadcrumbsList.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('home');
        });
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBreadcrumbs);
} else {
    initBreadcrumbs();
}

// Update breadcrumbs when page changes
document.addEventListener('pageChanged', (e) => {
    if (e.detail && e.detail.pageId) {
        updateBreadcrumbs(e.detail.pageId);
    }
});

// Also listen for direct showPage calls
setInterval(() => {
    const activePage = document.querySelector('.page-section.active');
    if (activePage && activePage.id) {
        const currentBreadcrumb = document.querySelector('.breadcrumbs-link.active');
        if (!currentBreadcrumb || currentBreadcrumb.textContent !== breadcrumbMap[activePage.id]?.title) {
            updateBreadcrumbs(activePage.id);
        }
    }
}, 500);

