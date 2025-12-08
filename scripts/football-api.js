// ============================================
// FOOTBALL API INTEGRATION - BELGIUM LEAGUES
// ============================================

// API Football Free Tier (alternative: Football-Data.org, API-Sports)
const API_FOOTBALL_KEY = 'YOUR_API_KEY'; // You'll need to get a free API key
const API_FOOTBALL_BASE = 'https://api.football-data.org/v4';

// For Belgium, we'll use mock data structure that can be replaced with real API
class FootballAPI {
    constructor() {
        this.teamId = null; // RFC Lissewege team ID when available
        this.leagueId = null; // Belgium league ID
    }

    // Mock data structure - Replace with real API calls
    async getNextMatch() {
        // In production, this would be: fetch(`${API_FOOTBALL_BASE}/teams/${this.teamId}/matches?status=SCHEDULED&limit=1`)
        return {
            homeTeam: 'RFC Lissewege',
            awayTeam: 'Tegenstander FC',
            date: '2025-12-07',
            time: '14:00',
            category: 'U13',
            venue: 'home',
            address: 'Pol Dhondtstraat 70, 8380 Lissewege',
            competition: 'Jeugdcompetitie'
        };
    }

    async getLeagueStandings() {
        // Mock data - Replace with real API
        return {
            position: 3,
            team: 'RFC Lissewege',
            played: 15,
            won: 10,
            drawn: 3,
            lost: 2,
            points: 33
        };
    }

    async getUpcomingMatches(count = 10) {
        // Mock data - Replace with real API
        return [
            {
                date: '2025-12-07',
                time: '14:00',
                category: 'U13',
                homeTeam: 'RFC Lissewege',
                awayTeam: 'Tegenstander FC',
                venue: 'home',
                address: 'Pol Dhondtstraat 70, 8380 Lissewege'
            },
            {
                date: '2025-12-10',
                time: '18:00',
                category: 'Training',
                homeTeam: 'RFC Lissewege',
                awayTeam: 'Alle Teams',
                venue: 'home',
                address: 'Pol Dhondtstraat 70, 8380 Lissewege'
            },
            {
                date: '2025-12-14',
                time: '10:00',
                category: 'U10',
                homeTeam: 'Vijand FC',
                awayTeam: 'RFC Lissewege',
                venue: 'away',
                address: 'Sportstraat 15, 8000 Brugge'
            },
            {
                date: '2025-12-17',
                time: '19:00',
                category: 'Event',
                homeTeam: 'RFC Lissewege',
                awayTeam: 'Clubavond',
                venue: 'home',
                address: 'Clubhuis, Pol Dhondtstraat 70'
            },
            {
                date: '2025-12-21',
                time: '11:00',
                category: 'U8',
                homeTeam: 'RFC Lissewege',
                awayTeam: 'Competitor FC',
                venue: 'home',
                address: 'Pol Dhondtstraat 70, 8380 Lissewege'
            },
            {
                date: '2025-12-28',
                time: '18:00',
                category: 'Training',
                homeTeam: 'RFC Lissewege',
                awayTeam: 'Alle Teams',
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
        const match = await footballAPI.getNextMatch();
        const matchDate = document.getElementById('matchDate');
        const matchTime = document.getElementById('matchTime');
        const opponentName = document.getElementById('opponentName');
        const matchLocation = document.getElementById('matchLocation');
        const matchCategory = document.getElementById('matchCategory');
        const locationType = document.querySelector('.location-type');
        const locationAddress = document.querySelector('.location-address span');

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

        if (opponentName) {
            opponentName.textContent = match.venue === 'home' ? match.awayTeam : match.homeTeam;
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

        // Update countdown
        updateMatchCountdown(match.date, match.time);
    } catch (error) {
        console.error('Error fetching next match:', error);
    }
}

// Update Other Matches
async function updateOtherMatches() {
    try {
        const matches = await footballAPI.getUpcomingMatches();
        const matchesGrid = document.getElementById('otherMatchesGrid');
        
        if (!matchesGrid) return;

        // Get the first match to exclude it from the list
        const nextMatch = await footballAPI.getNextMatch();
        const otherMatches = matches.filter(m => 
            !(m.date === nextMatch.date && m.time === nextMatch.time && m.category === nextMatch.category)
        );

        matchesGrid.innerHTML = '';

        otherMatches.forEach(match => {
            const date = new Date(match.date);
            const isHome = match.venue === 'home';
            const ourTeam = isHome ? match.homeTeam : match.awayTeam;
            const opponent = isHome ? match.awayTeam : match.homeTeam;

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
                        <div class="match-card-team-logo">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <span class="match-card-team-name ${isHome ? 'home' : ''}">${ourTeam}</span>
                    </div>
                    <div class="match-card-vs">VS</div>
                    <div class="match-card-team">
                        <div class="match-card-team-logo">
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

