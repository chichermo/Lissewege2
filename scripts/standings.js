// ============================================
// LEAGUE STANDINGS DATA & DISPLAY - REAL API
// ============================================

// Archief — 4e Provinciale C West-Vlaanderen 2025/2026 (afgesloten seizoen)
const ARCHIVED_STANDINGS_2025_2026 = [
    { position: 1, team: 'KVV Aartrijke', played: 13, won: 10, drawn: 2, lost: 1, goalsFor: 45, goalsAgainst: 13, points: 32 },
    { position: 2, team: 'KFC Damme', played: 13, won: 9, drawn: 1, lost: 3, goalsFor: 41, goalsAgainst: 13, points: 28 },
    { position: 3, team: 'VV Eendracht Brugge', played: 13, won: 8, drawn: 2, lost: 3, goalsFor: 30, goalsAgainst: 15, points: 26 },
    { position: 4, team: 'KSK Steenbrugge', played: 13, won: 8, drawn: 2, lost: 3, goalsFor: 30, goalsAgainst: 17, points: 26 },
    { position: 5, team: 'KFC Sint-Joris Sportief', played: 13, won: 6, drawn: 6, lost: 1, goalsFor: 30, goalsAgainst: 15, points: 24 },
    { position: 6, team: 'K. Excelsior Zedelgem B', played: 13, won: 7, drawn: 2, lost: 4, goalsFor: 36, goalsAgainst: 21, points: 23 },
    { position: 7, team: 'KSKD Hertsberge', played: 13, won: 6, drawn: 5, lost: 2, goalsFor: 33, goalsAgainst: 13, points: 23 },
    { position: 8, team: 'RFC Lissewege', played: 13, won: 6, drawn: 3, lost: 4, goalsFor: 41, goalsAgainst: 24, points: 21 },
    { position: 9, team: 'VVC Beernem B', played: 13, won: 5, drawn: 1, lost: 7, goalsFor: 17, goalsAgainst: 25, points: 16 },
    { position: 10, team: 'VKSO Zerkegem B', played: 13, won: 4, drawn: 1, lost: 8, goalsFor: 24, goalsAgainst: 38, points: 13 },
    { position: 11, team: 'KFC Heist B', played: 13, won: 4, drawn: 0, lost: 9, goalsFor: 26, goalsAgainst: 54, points: 12 },
    { position: 12, team: 'FC Zeebrugge', played: 13, won: 3, drawn: 0, lost: 10, goalsFor: 25, goalsAgainst: 60, points: 9 },
    { position: 13, team: 'KSV Bredene B', played: 13, won: 2, drawn: 1, lost: 10, goalsFor: 20, goalsAgainst: 38, points: 7 },
    { position: 14, team: 'VC Vamos Zandvoorde', played: 13, won: 0, drawn: 0, lost: 13, goalsFor: 8, goalsAgainst: 61, points: 0 }
];

// Huidig seizoen 2026/2027 — nog geen officiële stand
const REAL_STANDINGS_DATA = [];

let standingsData = [];

async function loadStandingsData() {
    if (window.realFootballAPI) {
        try {
            const realStandings = await window.realFootballAPI.getLeagueStandings();
            if (realStandings && realStandings.length > 0) {
                standingsData = realStandings;
                return;
            }
        } catch (error) {
            console.warn('Could not load real standings from API, using season placeholder:', error);
        }
    }

    standingsData = REAL_STANDINGS_DATA;
}

function renderStandingsRows(data) {
    return data.map(team => {
        const goalDifference = team.goalDifference !== undefined ? team.goalDifference : (team.goalsFor - team.goalsAgainst);
        const goalDiffSign = goalDifference >= 0 ? '+' : '';
        const teamLogo = window.getTeamLogo
            ? window.getTeamLogo(team.team)
            : (window.generatePlaceholderLogo ? window.generatePlaceholderLogo(team.team) : '/images/logos/100b.jpeg');

        const rowClass = team.team === 'RFC Lissewege' || team.team.toLowerCase().includes('lissewege')
            ? 'our-team'
            : (team.position <= 3 ? `position-${team.position}` : '');

        return `
            <tr class="${rowClass}">
                <td>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <img src="${teamLogo}" alt="${team.team} logo" class="standings-team-logo" onerror="if(window.generatePlaceholderLogo) { this.src = window.generatePlaceholderLogo('${team.team}'); this.onerror = null; } else { this.src='/images/logos/100b.jpeg'; }">
                        <span>${team.position}</span>
                    </div>
                </td>
                <td style="text-align: left;"><strong>${team.team}</strong></td>
                <td>${team.played || team.playedGames || 0}</td>
                <td>${team.won || 0}</td>
                <td>${team.drawn || team.draw || 0}</td>
                <td>${team.lost || 0}</td>
                <td>${team.goalsFor || 0}</td>
                <td>${team.goalsAgainst || 0}</td>
                <td>${goalDiffSign}${goalDifference}</td>
                <td><strong>${team.points || 0}</strong></td>
            </tr>
        `;
    }).join('');
}

function updateStandingsTable() {
    const tbody = document.getElementById('standingsTableBody');
    if (!tbody) return;

    if (standingsData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; padding: 2.5rem 1.5rem; color: var(--text-light);">
                    <i class="fas fa-hourglass-half" style="font-size: 2rem; margin-bottom: 1rem; display: block; color: var(--primary-color); opacity: 0.7;"></i>
                    <p style="font-weight: 600; color: var(--dark-color); margin-bottom: 0.5rem;">Seizoen 2026/2027 — stand volgt binnenkort</p>
                    <p style="font-size: 0.9rem; max-width: 520px; margin: 0 auto;">De competitie is nog niet gestart. De klassement wordt automatisch bijgewerkt zodra er officiële wedstrijden zijn gespeeld.</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = renderStandingsRows(standingsData);
}

function updateArchivedStandingsTable() {
    const tbody = document.getElementById('archivedStandingsTableBody');
    if (!tbody) return;
    tbody.innerHTML = renderStandingsRows(ARCHIVED_STANDINGS_2025_2026);
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadStandingsData();
    updateStandingsTable();
    updateArchivedStandingsTable();

    setTimeout(() => {
        if (window.updateTeamLogos) {
            window.updateTeamLogos();
        }
    }, 100);
});

window.updateStandingsTable = updateStandingsTable;
window.loadStandingsData = loadStandingsData;
