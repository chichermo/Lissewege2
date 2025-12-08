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
        // Próximo partido real: 13/12/2025 RFC Lissewege vs FC Zeebrugge
        return {
            homeTeam: 'RFC Lissewege',
            awayTeam: 'FC Zeebrugge',
            date: '2025-12-13',
            time: '19:00',
            category: '4e Provinciale C',
            venue: 'home',
            address: 'Pol Dhondtstraat 70, 8380 Lissewege',
            competition: '4e Provinciale C West-Vlaanderen'
        };
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

    async getUpcomingMatches(count = 10) {
        // REAL DATA - Próximos partidos 4e Provinciale C West-Vlaanderen 2025/2026
        return [
            {
                date: '2025-12-13',
                time: '19:00',
                category: '4e Provinciale C',
                homeTeam: 'RFC Lissewege',
                awayTeam: 'FC Zeebrugge',
                venue: 'home',
                address: 'Pol Dhondtstraat 70, 8380 Lissewege'
            },
            {
                date: '2026-01-18',
                time: '15:00',
                category: '4e Provinciale C',
                homeTeam: 'RFC Lissewege',
                awayTeam: 'VKSO Zerkegem B',
                venue: 'home',
                address: 'Pol Dhondtstraat 70, 8380 Lissewege'
            },
            {
                date: '2026-01-25',
                time: '14:30',
                category: '4e Provinciale C',
                homeTeam: 'KSK Steenbrugge',
                awayTeam: 'RFC Lissewege',
                venue: 'away',
                address: 'KSK Steenbrugge Stadion'
            },
            {
                date: '2026-02-01',
                time: '15:00',
                category: '4e Provinciale C',
                homeTeam: 'RFC Lissewege',
                awayTeam: 'KFC Heist B',
                venue: 'home',
                address: 'Pol Dhondtstraat 70, 8380 Lissewege'
            },
            {
                date: '2026-02-07',
                time: '19:30',
                category: '4e Provinciale C',
                homeTeam: 'KSV Bredene B',
                awayTeam: 'RFC Lissewege',
                venue: 'away',
                address: 'KSV Bredene Stadion'
            },
            {
                date: '2026-02-15',
                time: '15:00',
                category: '4e Provinciale C',
                homeTeam: 'RFC Lissewege',
                awayTeam: 'VVC Beernem B',
                venue: 'home',
                address: 'Pol Dhondtstraat 70, 8380 Lissewege'
            },
            {
                date: '2026-02-22',
                time: '15:00',
                category: '4e Provinciale C',
                homeTeam: 'KVV Aartrijke',
                awayTeam: 'RFC Lissewege',
                venue: 'away',
                address: 'KVV Aartrijke Stadion'
            },
            {
                date: '2026-03-01',
                time: '15:00',
                category: '4e Provinciale C',
                homeTeam: 'RFC Lissewege',
                awayTeam: 'KFC Damme',
                venue: 'home',
                address: 'Pol Dhondtstraat 70, 8380 Lissewege'
            }
        ];
    }
}

// Initialize API
const footballAPI = new FootballAPI();

// Update Next Match Widget
async function updateNextMatchWidget() {
    try {
        // Try to get real match first
        let match = null;
        if (window.realFootballAPI) {
            try {
                const realMatches = await window.realFootballAPI.getUpcomingMatches(null, 1);
                if (realMatches && realMatches.length > 0) {
                    const realMatch = realMatches[0];
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

        const matchDate = document.getElementById('matchDate');
        const matchTime = document.getElementById('matchTime');
        const opponentName = document.getElementById('opponentName');
        const matchLocation = document.getElementById('matchLocation');
        const matchCategory = document.getElementById('matchCategory');
        const locationType = document.querySelector('.location-type');
        const locationAddress = document.querySelector('.location-address span');
        const homeTeamLogo = document.querySelector('.team-home .team-logo-placeholder');
        const awayTeamLogo = document.querySelector('.team-away .team-logo-placeholder');

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
            matchCategory.textContent = match.category || 'U13';
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
                homeImg.className = 'team-logo-img';
                homeImg.onerror = function() { 
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
                awayImg.className = 'team-logo-img';
                awayImg.onerror = function() { 
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
                matches = await window.realFootballAPI.getUpcomingMatches(null, 10);
                if (matches) {
                    // Transform API data to our format
                    matches = matches.map(m => ({
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

        // Fallback to mock data if API unavailable
        if (!matches) {
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
                <div class="match-card-teams">
                    <div class="match-card-team">
                        <img src="${ourTeamLogo}" alt="${ourTeam} logo" class="match-card-team-logo-img" onerror="if(window.generatePlaceholderLogo) { this.src = window.generatePlaceholderLogo('${ourTeam}'); this.onerror = null; } else { this.style.display='none'; this.nextElementSibling.style.display='flex'; }">
                        <div class="match-card-team-logo" style="display: none;">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <span class="match-card-team-name ${isHome ? 'home' : ''}">${ourTeam}</span>
                    </div>
                    <div class="match-card-vs">VS</div>
                    <div class="match-card-team">
                        <img src="${opponentLogo}" alt="${opponent} logo" class="match-card-team-logo-img" onerror="if(window.generatePlaceholderLogo) { this.src = window.generatePlaceholderLogo('${opponent}'); this.onerror = null; } else { this.style.display='none'; this.nextElementSibling.style.display='flex'; }">
                        <div class="match-card-team-logo" style="display: none;">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <span class="match-card-team-name">${opponent}</span>
                    </div>
                </div>
                <div class="match-card-time">${match.time}</div>
                <div class="match-card-location ${match.venue === 'away' ? 'away' : ''}">
                    <i class="fas fa-${match.venue === 'away' ? 'plane' : 'home'}"></i>
                    <span>${match.venue === 'away' ? 'Uit' : 'Thuis'} - ${match.address}</span>
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
        const standings = await footballAPI.getLeagueStandings();
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

