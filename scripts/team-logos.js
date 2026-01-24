// ============================================
// TEAM LOGOS MANAGEMENT - REAL LOGOS
// ============================================

// Map of team names to their logo URLs
// 4e Provinciale C West-Vlaanderen teams
const TEAM_LOGOS = {
    // RFC Lissewege
    'RFC Lissewege': 'images/logos/teams/rfc-lissewege.webp',
    'R.F.C. Lissewege': 'images/logos/teams/rfc-lissewege.webp',

    // Equilibrium teams
    'KVV Aartrijke': 'images/logos/teams/kvv-aartrijke.webp',
    'KFC Damme': 'images/logos/teams/kfc-damme.webp',
    'VV Eendracht Brugge': 'images/logos/teams/vv-eendracht-brugge.webp',
    'KSK Steenbrugge': 'images/logos/teams/ksk-steenbrugge.webp',
    'KFC Sint-Joris Sportief': 'images/logos/teams/kfc-sint-joris-sportief.webp',
    'KFC Sint-Joris': 'images/logos/teams/kfc-sint-joris-sportief.webp',
    'K. Excelsior Zedelgem B': 'images/logos/teams/k-excelsior-zedelgem-b.webp',
    'KSKD Hertsberge': 'images/logos/teams/kskd-hertsberge.webp',
    'VVC Beernem B': 'images/logos/teams/vvc-beernem-b.webp',
    'VKSO Zerkegem B': 'images/logos/teams/vkso-zerkegem-b.webp',
    'KFC Heist B': 'images/logos/teams/kfc-heist-b.webp',
    'FC Zeebrugge': 'images/logos/teams/fc-zeebrugge.webp',
    'KSV Bredene B': 'images/logos/teams/ksv-bredene-b.webp',
    'VC Vamos Zandvoorde': 'images/logos/teams/vc-vamos-zandvoorde.webp',
};

// Function to generate placeholder logo with team initials
function generatePlaceholderLogo(teamName) {
    // Extraer iniciales del nombre del equipo
    const words = teamName.split(' ').filter(word => {
        // Filtrar palabras comunes que no queremos en las iniciales
        const skipWords = ['FC', 'KFC', 'KVV', 'VV', 'VC', 'KSK', 'KSKD', 'VKSO', 'VVC', 'KSV', 'K.', 'B'];
        return !skipWords.includes(word.toUpperCase());
    });

    let initials = '';
    if (words.length >= 2) {
        // Tomar primera letra de las dos primeras palabras significativas
        initials = words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    } else if (words.length === 1) {
        // Si solo hay una palabra, tomar las dos primeras letras
        initials = words[0].substring(0, 2).toUpperCase();
    } else {
        // Fallback: tomar las primeras dos letras del nombre completo
        initials = teamName.replace(/[^A-Za-z]/g, '').substring(0, 2).toUpperCase();
    }

    // Crear un SVG con las iniciales como data URL
    const svg = `<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad-${teamName.replace(/[^A-Za-z0-9]/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#1a7a4a;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#0d4d2e;stop-opacity:1" />
            </linearGradient>
        </defs>
        <circle cx="40" cy="40" r="38" fill="url(#grad-${teamName.replace(/[^A-Za-z0-9]/g, '')})" stroke="#fff" stroke-width="2"/>
        <text x="40" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="central">${initials}</text>
    </svg>`;

    // Convertir SVG a data URL
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

// Function to get team logo
function getTeamLogo(teamName) {
    // Check exact match first
    if (TEAM_LOGOS[teamName] && TEAM_LOGOS[teamName] !== null) {
        return TEAM_LOGOS[teamName];
    }

    // Check case-insensitive
    const lowerName = teamName.toLowerCase();
    for (const [key, value] of Object.entries(TEAM_LOGOS)) {
        if (key.toLowerCase() === lowerName && value !== null) {
            return value;
        }
    }

    // Generate placeholder with initials as fallback
    return generatePlaceholderLogo(teamName);
}

// Function to update team logos in DOM
function updateTeamLogos() {
    // Update match cards
    document.querySelectorAll('.match-card-team-logo, .team-logo-placeholder').forEach(logoEl => {
        const teamName = logoEl.closest('.match-card-team, .team-home, .team-away')?.querySelector('.team-name, .match-card-team-name')?.textContent;

        // Check if there's already an image sibling (prevents duplication with football-api.js)
        if (logoEl.previousElementSibling && logoEl.previousElementSibling.tagName === 'IMG') {
            return;
        }

        if (teamName) {
            const logoUrl = getTeamLogo(teamName.trim());
            if (logoEl.tagName === 'IMG') {
                logoEl.src = logoUrl;
            } else {
                // Replace icon with img
                const img = document.createElement('img');
                img.src = logoUrl;
                img.alt = `${teamName} logo`;
                img.className = 'team-logo-img';
                logoEl.replaceWith(img);
            }
        }
    });

    // Update standings table
    document.querySelectorAll('.standings-table tbody tr').forEach(row => {
        const teamName = row.querySelector('td:nth-child(2)')?.textContent;
        if (teamName) {
            const logoUrl = getTeamLogo(teamName.trim());
            const firstCell = row.querySelector('td:first-child');
            if (firstCell && !firstCell.querySelector('img')) {
                const img = document.createElement('img');
                img.src = logoUrl;
                img.alt = `${teamName} logo`;
                img.className = 'standings-team-logo';
                firstCell.appendChild(img);
            }
        }
    });
}

// Export
window.getTeamLogo = getTeamLogo;
window.generatePlaceholderLogo = generatePlaceholderLogo;
window.updateTeamLogos = updateTeamLogos;
window.TEAM_LOGOS = TEAM_LOGOS;

