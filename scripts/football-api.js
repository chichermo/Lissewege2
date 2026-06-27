// ============================================
// FOOTBALL API INTEGRATION - BELGIUM LEAGUES
// ============================================

// API Football Free Tier (alternative: Football-Data.org, API-Sports)
const API_FOOTBALL_KEY = 'YOUR_API_KEY'; // You'll need to get a free API key
const API_FOOTBALL_BASE = 'https://api.football-data.org/v4';

// REAL DATA - 4e Provinciale C West-Vlaanderen 2025/2026
class FootballAPI {
    constructor() {
        this.teamId = null; // RFC Lissewege team ID when available
        this.leagueId = null; // Belgium league ID
        this.competition = '4e Provinciale C West-Vlaanderen';
    }

    // REAL DATA - 4e Provinciale C West-Vlaanderen 2025/2026
    async getNextMatch() {
        const upcoming = this.getFilteredUpcoming();
        if (!upcoming.length) return null;
        const m = upcoming[0];
        return {
            homeTeam: m.homeTeam,
            awayTeam: m.awayTeam,
            date: m.date,
            time: m.time || '15:00',
            category: '4e Provinciale C',
            venue: m.venue,
            address: m.venue === 'home' ? 'Pol Dhondtstraat 70, 8380 Lissewege' : `${m.awayTeam === 'RFC Lissewege' ? m.homeTeam : m.awayTeam} Stadion`,
            competition: '4e Provinciale C West-Vlaanderen'
        };
    }

    getFilteredUpcoming() {
        const raw = Array.isArray(window.UPCOMING_MATCHES) ? window.UPCOMING_MATCHES : [];
        const today = new Date().toISOString().slice(0, 10);
        return raw
            .filter(m => m.date >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    async getUpcomingMatches(count = 10) {
        return this.getFilteredUpcoming().slice(0, count).map(m => ({
            date: m.date,
            time: m.time || '15:00',
            category: '4e Provinciale C',
            homeTeam: m.homeTeam,
            awayTeam: m.awayTeam,
            venue: m.venue,
            address: m.venue === 'home' ? 'Pol Dhondtstraat 70, 8380 Lissewege' : 'Tegenstander Stadion'
        }));
    }

    async getLeagueStandings() {
        // Real data - RFC Lissewege está en posición 8
        return {
            position: 8,
            team: 'RFC Lissewege',
            played: 13,
            won: 6,
            drawn: 3,
            lost: 4,
            goalsFor: 41,
            goalsAgainst: 24,
            points: 21
        };
    }
}

function normalizeMatch(rawMatch) {
    if (!rawMatch) return null;
    const teamName = window.APP_CONFIG?.team?.name || 'RFC Lissewege';
    const date = rawMatch.date
        || rawMatch.matchDate
        || (rawMatch.utcDate ? rawMatch.utcDate.split('T')[0] : null);
    if (!date) return null;

    const time = rawMatch.time
        || rawMatch.matchTime
        || (rawMatch.utcDate ? new Date(rawMatch.utcDate).toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' }) : '');

    const homeTeam = rawMatch.homeTeam?.name || rawMatch.homeTeam || rawMatch.home || rawMatch.teamHome || '';
    const awayTeam = rawMatch.awayTeam?.name || rawMatch.awayTeam || rawMatch.away || rawMatch.teamAway || '';
    let venue = rawMatch.venue;
    if (!venue && homeTeam && awayTeam) {
        venue = homeTeam === teamName ? 'home' : (awayTeam === teamName ? 'away' : null);
    }

    return {
        date,
        time,
        homeTeam,
        awayTeam,
        venue: venue || rawMatch.venue || null,
        address: rawMatch.address || '',
        score: rawMatch.score || ''
    };
}

// Initialize API
const footballAPI = new FootballAPI();

function filterFutureMatches(matches) {
    const today = new Date().toISOString().slice(0, 10);
    return (matches || [])
        .map(m => normalizeMatch(m))
        .filter(m => m && m.date >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
}

function filterPastMatches(matches, count = 5) {
    const today = new Date().toISOString().slice(0, 10);
    return (matches || [])
        .map(m => normalizeMatch(m))
        .filter(m => m && m.date < today)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, count);
}

// Update Next Match Widget
async function updateNextMatchWidget() {
    try {
        // Try to get real match first
        let match = null;
        if (window.realFootballAPI) {
            try {
                const realMatches = await window.realFootballAPI.getUpcomingMatches(null, 15);
                const future = filterFutureMatches(realMatches);
                if (future.length > 0) {
                    const realMatch = future[0];
                    match = {
                        homeTeam: realMatch.homeTeam,
                        homeTeamId: realMatch.homeTeamId,
                        awayTeam: realMatch.awayTeam,
                        awayTeamId: realMatch.awayTeamId,
                        date: realMatch.date,
                        time: realMatch.time,
                        category: realMatch.competition || 'Competitie',
                        venue: realMatch.venue,
                        address: realMatch.venue === 'home' ? 'Pol Dhondtstraat 70, 8380 Lissewege' : 'Tegenstander Stadion'
                    };
                }
            } catch (error) {
                console.warn('Real API failed, using fallback:', error);
            }
        }

        // Fallback to mock data
        if (!match) {
            match = await footballAPI.getNextMatch();
        }
        if (!match) return;
        const matchTime = document.getElementById('matchTime');
        const opponentName = document.getElementById('opponentName');
        const matchLocation = document.getElementById('matchLocation');
        const matchCategory = document.getElementById('matchCategory');
        const locationType = document.querySelector('.location-type');
        const locationAddress = document.querySelector('.location-address span');
        const homeTeamLogo = document.querySelector('.match-team-row:first-child .team-logo-placeholder');
        const awayTeamLogo = document.querySelector('.match-team-row:last-child .team-logo-placeholder');

        if (matchDate) {
            const date = new Date(match.date);
            matchDate.textContent = date.toLocaleDateString('nl-BE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }

        if (matchTime) {
            matchTime.textContent = match.time;
        }

        const opponent = match.venue === 'home' ? match.awayTeam : match.homeTeam;
        if (opponentName) {
            opponentName.textContent = opponent;
        }

        if (matchCategory) {
            matchCategory.textContent = match.category || '4e Prov C';
        }

        if (locationType) {
            if (match.venue === 'away') {
                locationType.classList.add('away');
                locationType.innerHTML = '<i class="fas fa-plane"></i><span>Uit</span>';
            } else {
                locationType.classList.remove('away');
                locationType.innerHTML = '<i class="fas fa-home"></i><span>Thuis</span>';
            }
        }

        if (locationAddress) {
            locationAddress.textContent = match.address || 'Pol Dhondtstraat 70, 8380 Lissewege';
        }

        // Update logos
        if (window.getTeamLogo) {
            const homeLogo = window.getTeamLogo(match.homeTeam);
            const awayLogo = window.getTeamLogo(opponent);

            if (homeTeamLogo) {
                const homeImg = document.createElement('img');
                homeImg.src = homeLogo;
                homeImg.alt = `${match.homeTeam} logo`;
                homeImg.width = 44;
                homeImg.height = 44;
                homeImg.className = 'team-logo-img';
                homeImg.onerror = function () {
                    if (window.generatePlaceholderLogo) {
                        this.src = window.generatePlaceholderLogo(match.homeTeam);
                        this.onerror = null;
                    } else {
                        this.style.display = 'none';
                    }
                };
                homeTeamLogo.innerHTML = '';
                homeTeamLogo.appendChild(homeImg);
            }

            if (awayTeamLogo) {
                const awayImg = document.createElement('img');
                awayImg.src = awayLogo;
                awayImg.alt = `${opponent} logo`;
                awayImg.width = 44;
                awayImg.height = 44;
                awayImg.className = 'team-logo-img';
                awayImg.onerror = function () {
                    if (window.generatePlaceholderLogo) {
                        this.src = window.generatePlaceholderLogo(opponent);
                        this.onerror = null;
                    } else {
                        this.style.display = 'none';
                    }
                };
                awayTeamLogo.innerHTML = '';
                awayTeamLogo.appendChild(awayImg);
            }
        }

        // Update countdown
        updateMatchCountdown(match.date, match.time);
    } catch (error) {
        console.error('Error fetching next match:', error);
    }
}

// Update Other Matches
async function updateOtherMatches() {
    try {
        // Try to get real matches first
        let matches = null;
        if (window.realFootballAPI) {
            try {
                matches = await window.realFootballAPI.getUpcomingMatches(null, 15);
                if (matches) {
                    matches = filterFutureMatches(matches).map(m => ({
                        date: m.date,
                        time: m.time,
                        category: m.competition || 'Competitie',
                        homeTeam: m.homeTeam,
                        homeTeamId: m.homeTeamId,
                        awayTeam: m.awayTeam,
                        awayTeamId: m.awayTeamId,
                        venue: m.venue,
                        address: m.venue === 'home' ? 'Pol Dhondtstraat 70, 8380 Lissewege' : 'Tegenstander Stadion'
                    }));
                }
            } catch (error) {
                console.warn('Real API failed, using fallback:', error);
            }
        }

        if (!matches || matches.length === 0) {
            matches = await footballAPI.getUpcomingMatches();
        }

        const matchesGrid = document.getElementById('otherMatchesGrid');
        if (!matchesGrid) return;

        // Get the first match to exclude it from the list
        const nextMatch = await footballAPI.getNextMatch();
        const otherMatches = matches.filter(m =>
            !(m.date === nextMatch.date && m.time === nextMatch.time)
        );

        matchesGrid.innerHTML = '';

        otherMatches.forEach(match => {
            const date = new Date(match.date);
            const isHome = match.venue === 'home';
            const ourTeam = isHome ? match.homeTeam : match.awayTeam;
            const opponent = isHome ? match.awayTeam : match.homeTeam;
            const ourTeamId = isHome ? match.homeTeamId : match.awayTeamId;
            const opponentId = isHome ? match.awayTeamId : match.homeTeamId;

            // Get logos
            const ourTeamLogo = window.getTeamLogo ? window.getTeamLogo(ourTeam) : (window.generatePlaceholderLogo ? window.generatePlaceholderLogo(ourTeam) : '/images/logos/100b.jpeg');
            const opponentLogo = window.getTeamLogo ? window.getTeamLogo(opponent) : (window.generatePlaceholderLogo ? window.generatePlaceholderLogo(opponent) : '/images/logos/100b.jpeg');

            const matchCard = document.createElement('div');
            matchCard.className = 'match-card';
            matchCard.innerHTML = `
                <div class="match-card-header">
                    <span class="match-card-category">${match.category}</span>
                    <div class="match-card-date">
                        <span class="match-card-date-day">${date.getDate()}</span>
                        <span class="match-card-date-month">${date.toLocaleDateString('nl-BE', { month: 'short' })}</span>
                    </div>
                </div>
                <div class="match-card-teams match-card-teams--horizontal">
                    <div class="match-card-team">
                        <div class="match-card-logo-circle">
                            <img src="${ourTeamLogo}" alt="${ourTeam}" class="match-card-team-logo-img" width="40" height="40" loading="lazy" decoding="async" onerror="if(window.generatePlaceholderLogo){this.src=window.generatePlaceholderLogo('${ourTeam.replace(/'/g, "\\'")}');this.onerror=null;}">
                        </div>
                        <span class="match-card-team-name ${isHome ? 'home' : ''}">${ourTeam}</span>
                    </div>
                    <span class="match-card-vs">vs</span>
                    <div class="match-card-team match-card-team--away">
                        <div class="match-card-logo-circle">
                            <img src="${opponentLogo}" alt="${opponent}" class="match-card-team-logo-img" width="40" height="40" loading="lazy" decoding="async" onerror="if(window.generatePlaceholderLogo){this.src=window.generatePlaceholderLogo('${opponent.replace(/'/g, "\\'")}');this.onerror=null;}">
                        </div>
                        <span class="match-card-team-name">${opponent}</span>
                    </div>
                </div>
                <div class="match-card-footer">
                    <span class="match-card-time">${match.time}</span>
                    <div class="match-card-location ${match.venue === 'away' ? 'away' : ''}">
                        <i class="fas fa-${match.venue === 'away' ? 'plane' : 'home'}"></i>
                        <span>${match.venue === 'away' ? 'Uit' : 'Thuis'}</span>
                    </div>
                </div>
            `;

            matchesGrid.appendChild(matchCard);
        });
    } catch (error) {
        console.error('Error fetching other matches:', error);
    }
}

// Update Match Countdown
function updateMatchCountdown(matchDate, matchTime) {
    const countdownElement = document.getElementById('nextMatchCountdown');
    if (!countdownElement) return;

    const [hours, minutes] = matchTime.split(':');
    const matchDateTime = new Date(matchDate);
    matchDateTime.setHours(parseInt(hours), parseInt(minutes), 0);

    const now = new Date();
    const diff = matchDateTime - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        countdownElement.textContent = days;
    } else {
        countdownElement.textContent = '0';
    }
}

// Update League Position
async function updateLeaguePosition() {
    try {
        let standings = null;
        if (window.realFootballAPI) {
            try {
                const realStandings = await window.realFootballAPI.getLeagueStandings();
                if (realStandings && realStandings.length > 0) {
                    const teamName = window.APP_CONFIG?.team?.name || 'RFC Lissewege';
                    standings = realStandings.find(team => team.team === teamName || team.team?.toLowerCase().includes('lissewege'));
                }
            } catch (error) {
                console.warn('Real standings API failed, using fallback:', error);
            }
        }

        if (!standings) {
            standings = await footballAPI.getLeagueStandings();
        }
        const positionElement = document.getElementById('leaguePosition');

        if (positionElement) {
            positionElement.textContent = `#${standings.position}`;
        }
    } catch (error) {
        console.error('Error fetching league position:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const seasonLabel = document.getElementById('homeSeasonLabel');
    if (seasonLabel && window.CURRENT_SEASON_LABEL) {
        seasonLabel.textContent = `Seizoen ${window.CURRENT_SEASON_LABEL} · 4e Provinciale C West-Vlaanderen`;
    }

    updateNextMatchWidget();
    updateOtherMatches();
    updateLeaguePosition();

    // Update countdown every minute
    setInterval(() => {
        const matchDate = document.getElementById('matchDate')?.textContent;
        const matchTime = document.getElementById('matchTime')?.textContent;
        if (matchDate && matchTime) {
            updateMatchCountdown(matchDate, matchTime);
        }
    }, 60000);
});

// Export for use in other scripts
window.footballAPI = footballAPI;
window.updateNextMatchWidget = updateNextMatchWidget;
window.updateOtherMatches = updateOtherMatches;
window.updateLeaguePosition = updateLeaguePosition;

