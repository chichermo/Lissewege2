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
    'eventos': { title: 'Evenementen', icon: 'fas fa-calendar-star' },
    'competities': { title: 'Competities', icon: 'fas fa-trophy' },
    'rivalen': { title: 'Rivalen', icon: 'fas fa-fist-raised' },
    'members': { title: 'Leden', icon: 'fas fa-id-card' },
    'contact': { title: 'Contact', icon: 'fas fa-envelope' },
    'statistieken': { title: 'Statistieken', icon: 'fas fa-chart-bar' },
    'reserveringen': { title: 'Reserveringen', icon: 'fas fa-calendar-check' },
    'winkel': { title: 'Clubwinkel', icon: 'fas fa-shopping-bag' },
    'notificaties': { title: 'Notificaties', icon: 'fas fa-bell' },
    'geschiedenis': { title: 'Geschiedenis', icon: 'fas fa-landmark' }
};

let lastBreadcrumbPage = null;

function initBreadcrumbs() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent || document.getElementById('breadcrumbs')) return;

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
    const breadcrumbs = document.getElementById('breadcrumbs');
    const breadcrumbsList = document.getElementById('breadcrumbsList');
    if (!breadcrumbsList) return;

    if (pageId === lastBreadcrumbPage) return;
    lastBreadcrumbPage = pageId;

    if (pageId === 'home' || !pageId) {
        if (breadcrumbs) breadcrumbs.style.display = 'none';
        breadcrumbsList.innerHTML = '';
        return;
    }

    const currentPage = breadcrumbMap[pageId];
    if (!currentPage) {
        if (breadcrumbs) breadcrumbs.style.display = 'none';
        breadcrumbsList.innerHTML = '';
        return;
    }

    if (breadcrumbs) breadcrumbs.style.display = 'block';

    breadcrumbsList.innerHTML = `
        <li class="breadcrumbs-item">
            <span class="breadcrumbs-link active" aria-current="page">
                <i class="${currentPage.icon} breadcrumbs-icon"></i>
                <span>${currentPage.title}</span>
            </span>
        </li>
    `;
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBreadcrumbs);
} else {
    initBreadcrumbs();
}

// Update breadcrumbs when page changes via custom event
document.addEventListener('pageChanged', (e) => {
    if (e.detail && e.detail.pageId) {
        updateBreadcrumbs(e.detail.pageId);
    }
});

window.updateBreadcrumbs = updateBreadcrumbs;

