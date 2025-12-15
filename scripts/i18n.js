// ============================================
// MULTILANGUAGE SUPPORT (i18n)
// ============================================
const translations = {
    nl: {
        home: 'Home',
        clubInfo: 'Club Info',
        about: 'Over Ons',
        teams: 'Teams',
        players: 'Spelers',
        news: 'Nieuws',
        gallery: 'Galerij',
        calendar: 'Kalender',
        pricing: 'Prijslijst',
        team: 'Team',
        sponsors: 'Sponsors',
        contact: 'Contact',
        search: 'Zoek op de website...',
        noResults: 'Geen resultaten gevonden',
        resultsFound: 'resultaten gevonden'
    },
    fr: {
        home: 'Accueil',
        clubInfo: 'Info Club',
        about: 'À Propos',
        teams: 'Équipes',
        players: 'Joueurs',
        news: 'Actualités',
        gallery: 'Galerie',
        calendar: 'Calendrier',
        pricing: 'Tarifs',
        team: 'Équipe',
        sponsors: 'Sponsors',
        contact: 'Contact',
        search: 'Rechercher sur le site...',
        noResults: 'Aucun résultat trouvé',
        resultsFound: 'résultats trouvés'
    },
    en: {
        home: 'Home',
        clubInfo: 'Club Info',
        about: 'About Us',
        teams: 'Teams',
        players: 'Players',
        news: 'News',
        gallery: 'Gallery',
        calendar: 'Calendar',
        pricing: 'Pricing',
        team: 'Team',
        sponsors: 'Sponsors',
        contact: 'Contact',
        search: 'Search the website...',
        noResults: 'No results found',
        resultsFound: 'results found'
    }
};

let currentLanguage = localStorage.getItem('language') || 'nl';

function initI18n() {
    // Create language selector
    createLanguageSelector();
    
    // Apply current language
    applyLanguage(currentLanguage);
}

function createLanguageSelector() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const sidebarFooter = sidebar.querySelector('.sidebar-footer');
    if (!sidebarFooter) return;

    const langSelector = document.createElement('div');
    langSelector.className = 'language-selector';
    langSelector.innerHTML = `
        <select id="languageSelect" aria-label="Select language">
            <option value="nl" ${currentLanguage === 'nl' ? 'selected' : ''}>NL</option>
            <option value="fr" ${currentLanguage === 'fr' ? 'selected' : ''}>FR</option>
            <option value="en" ${currentLanguage === 'en' ? 'selected' : ''}>EN</option>
        </select>
    `;

    sidebarFooter.insertBefore(langSelector, sidebarFooter.firstChild);

    // Add event listener
    const select = document.getElementById('languageSelect');
    if (select) {
        select.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .language-selector {
            margin-bottom: 1rem;
        }
        .language-selector select {
            width: 100%;
            padding: 0.75rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: var(--white);
            font-family: inherit;
            cursor: pointer;
        }
        .language-selector select option {
            background: var(--dark-color);
            color: var(--white);
        }
    `;
    document.head.appendChild(style);
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    applyLanguage(lang);
    document.documentElement.lang = lang;
}

function applyLanguage(lang) {
    const t = translations[lang] || translations.nl;
    
    // Update sidebar links
    document.querySelectorAll('.sidebar-link').forEach(link => {
        const section = link.getAttribute('data-section');
        if (t[section]) {
            const span = link.querySelector('span');
            if (span) span.textContent = t[section];
        }
    });

    // Update search placeholder
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = t.search;
    }

    // Update document language
    document.documentElement.lang = lang;
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}

