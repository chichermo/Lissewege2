// ============================================
// DATA REFRESH MANAGER
// ============================================
function formatUpdateTimestamp() {
    const now = new Date();
    return now.toLocaleString('nl-BE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function updateTimestamp(id) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = formatUpdateTimestamp();
    }
}

async function refreshMatches() {
    if (window.updateNextMatchWidget) {
        await window.updateNextMatchWidget();
    }
    if (window.updateOtherMatches) {
        await window.updateOtherMatches();
    }
    if (window.updateRecentResults) {
        await window.updateRecentResults();
    }
    if (window.initCalendar) {
        await window.initCalendar();
    }
    updateTimestamp('calendarLastUpdate');
    updateTimestamp('upcomingLastUpdate');
}

async function refreshStandings() {
    if (window.loadStandingsData) {
        await window.loadStandingsData();
    }
    if (window.updateStandingsTable) {
        window.updateStandingsTable();
    }
    updateTimestamp('standingsLastUpdate');
}

async function refreshSquad() {
    if (window.updateApiSquad) {
        await window.updateApiSquad();
    }
}

function refreshSponsors() {
    if (window.fixSponsorImages) {
        window.fixSponsorImages();
    }
}

function initDataRefreshManager() {
    const intervals = window.APP_CONFIG?.refreshIntervals || {};
    const matchesInterval = intervals.matches || 10 * 60 * 1000;
    const standingsInterval = intervals.standings || 15 * 60 * 1000;
    const squadInterval = intervals.squad || 60 * 60 * 1000;

    refreshMatches();
    refreshStandings();
    refreshSquad();
    refreshSponsors();

    setInterval(refreshMatches, matchesInterval);
    setInterval(refreshStandings, standingsInterval);
    setInterval(refreshSquad, squadInterval);
    setInterval(refreshSponsors, 30 * 60 * 1000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDataRefreshManager);
} else {
    initDataRefreshManager();
}

document.addEventListener('pageChanged', (event) => {
    if (event.detail?.pageId === 'kalender') {
        refreshMatches();
        refreshStandings();
    }
    if (event.detail?.pageId === 'spelers') {
        refreshSquad();
    }
});
