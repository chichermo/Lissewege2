// ============================================
// CALENDAR MANAGEMENT - PAST & UPCOMING MATCHES
// ============================================

// Load and display past matches
async function loadPastMatches() {
    const calendarGrid = document.getElementById('pastMatchesGrid');
    if (!calendarGrid) return;

    // Get past matches from real data
    let pastMatches = [];
    
    if (window.PAST_MATCHES) {
        pastMatches = window.PAST_MATCHES;
    } else if (window.realFootballAPI) {
        try {
            const matches = await window.realFootballAPI.getPastMatches();
            if (matches && matches.length > 0) {
                pastMatches = matches;
            }
        } catch (error) {
            console.warn('Could not load past matches from API:', error);
        }
    }

    if (pastMatches.length === 0) {
        calendarGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-light);">
                <i class="fas fa-info-circle" style="font-size: 3rem; margin-bottom: 1rem; display: block; opacity: 0.5;"></i>
                <p>Geen resultaten beschikbaar.</p>
            </div>
        `;
        return;
    }

    // Sort by date (most recent first)
    pastMatches.sort((a, b) => new Date(b.date) - new Date(a.date));

    calendarGrid.innerHTML = '';

    pastMatches.forEach(match => {
        const matchDate = new Date(match.date);
        const isHome = match.venue === 'home';
        const homeTeam = match.homeTeam;
        const awayTeam = match.awayTeam;
        const score = match.score || 'TBD';
        const [homeScore, awayScore] = score.split('-').map(s => s.trim());
        
        // Determine result for RFC Lissewege
        let resultClass = '';
        let resultText = '';
        if (isHome) {
            if (parseInt(homeScore) > parseInt(awayScore)) {
                resultClass = 'win';
                resultText = 'Winst';
            } else if (parseInt(homeScore) < parseInt(awayScore)) {
                resultClass = 'loss';
                resultText = 'Verlies';
            } else {
                resultClass = 'draw';
                resultText = 'Gelijk';
            }
        } else {
            if (parseInt(awayScore) > parseInt(homeScore)) {
                resultClass = 'win';
                resultText = 'Winst';
            } else if (parseInt(awayScore) < parseInt(homeScore)) {
                resultClass = 'loss';
                resultText = 'Verlies';
            } else {
                resultClass = 'draw';
                resultText = 'Gelijk';
            }
        }

        // Get team logos
        const homeLogo = window.getTeamLogo ? window.getTeamLogo(homeTeam) : '/images/logos/100b.jpeg';
        const awayLogo = window.getTeamLogo ? window.getTeamLogo(awayTeam) : '/images/logos/100b.jpeg';

        // Get venue address
        let venueAddress = match.address;
        if (!venueAddress) {
            if (isHome) {
                venueAddress = 'Pol Dhondtstraat 70, 8380 Lissewege';
            } else {
                // Try to get address from TEAM_INFO
                const teamInfo = window.TEAM_INFO && window.TEAM_INFO[homeTeam];
                venueAddress = teamInfo?.address || `${homeTeam} Stadion`;
            }
        }

        const matchCard = document.createElement('div');
        matchCard.className = `calendar-card-modern past-match ${resultClass}`;
        matchCard.innerHTML = `
            <div class="calendar-date-modern">
                <span class="date-day-modern">${String(matchDate.getDate()).padStart(2, '0')}</span>
                <span class="date-month-modern">${matchDate.toLocaleDateString('nl-BE', { month: 'short' }).toUpperCase()}</span>
            </div>
            <div class="calendar-content-modern">
                <div class="event-type-badge match ${resultClass}">
                    <i class="fas fa-futbol"></i> ${resultText}
                </div>
                <h3>${homeTeam} vs ${awayTeam}</h3>
                <div class="match-result-display">
                    <div class="match-result-team">
                        <img src="${homeLogo}" alt="${homeTeam} logo" class="match-result-logo" onerror="if(window.generatePlaceholderLogo) { this.src = window.generatePlaceholderLogo('${homeTeam}'); this.onerror = null; } else { this.style.display='none'; }">
                        <span class="match-result-score ${isHome && parseInt(homeScore) > parseInt(awayScore) ? 'winner' : ''}">${homeScore}</span>
                    </div>
                    <span class="match-result-separator">-</span>
                    <div class="match-result-team">
                        <span class="match-result-score ${!isHome && parseInt(awayScore) > parseInt(homeScore) ? 'winner' : ''}">${awayScore}</span>
                        <img src="${awayLogo}" alt="${awayTeam} logo" class="match-result-logo" onerror="if(window.generatePlaceholderLogo) { this.src = window.generatePlaceholderLogo('${awayTeam}'); this.onerror = null; } else { this.style.display='none'; }">
                    </div>
                </div>
                <div class="event-details">
                    <p class="event-location">
                        <i class="fas fa-${isHome ? 'home' : 'plane'}"></i> 
                        ${isHome ? 'Thuis' : 'Uit'} - ${venueAddress}
                    </p>
                    <p class="event-category">
                        <i class="fas fa-trophy"></i> 4e Provinciale C
                    </p>
                </div>
            </div>
        `;

        calendarGrid.appendChild(matchCard);
    });
}

// Load and display upcoming matches
async function loadUpcomingMatches() {
    const calendarGrid = document.getElementById('upcomingMatchesGrid');
    if (!calendarGrid) return;

    // Get upcoming matches
    let upcomingMatches = [];
    
    if (window.UPCOMING_MATCHES) {
        upcomingMatches = window.UPCOMING_MATCHES;
    } else if (window.realFootballAPI) {
        try {
            const matches = await window.realFootballAPI.getUpcomingMatches(null, 20);
            if (matches && matches.length > 0) {
                upcomingMatches = matches.map(m => {
                    let address = m.address;
                    if (!address) {
                        if (m.venue === 'home') {
                            address = 'Pol Dhondtstraat 70, 8380 Lissewege';
                        } else {
                            const teamInfo = window.TEAM_INFO && window.TEAM_INFO[m.homeTeam];
                            address = teamInfo?.address || `${m.homeTeam} Stadion`;
                        }
                    }
                    return {
                        date: m.date,
                        time: m.time,
                        homeTeam: m.homeTeam,
                        awayTeam: m.awayTeam,
                        venue: m.venue,
                        address: address
                    };
                });
            }
        } catch (error) {
            console.warn('Could not load upcoming matches from API:', error);
        }
    } else if (window.footballAPI) {
        try {
            const matches = await window.footballAPI.getUpcomingMatches(20);
            upcomingMatches = matches;
        } catch (error) {
            console.warn('Could not load upcoming matches:', error);
        }
    }

    if (upcomingMatches.length === 0) {
        calendarGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-light);">
                <i class="fas fa-info-circle" style="font-size: 3rem; margin-bottom: 1rem; display: block; opacity: 0.5;"></i>
                <p>Geen komende wedstrijden beschikbaar.</p>
            </div>
        `;
        return;
    }

    // Sort by date (soonest first)
    upcomingMatches.sort((a, b) => new Date(a.date) - new Date(b.date));

    calendarGrid.innerHTML = '';

    upcomingMatches.forEach(match => {
        const matchDate = new Date(match.date);
        const isHome = match.venue === 'home';
        const homeTeam = match.homeTeam;
        const awayTeam = match.awayTeam;

        // Get team logos (will use placeholder if logo not found)
        const homeLogo = window.getTeamLogo ? window.getTeamLogo(homeTeam) : (window.generatePlaceholderLogo ? window.generatePlaceholderLogo(homeTeam) : '/images/logos/100b.jpeg');
        const awayLogo = window.getTeamLogo ? window.getTeamLogo(awayTeam) : (window.generatePlaceholderLogo ? window.generatePlaceholderLogo(awayTeam) : '/images/logos/100b.jpeg');

        // Get venue address
        let venueAddress = match.address;
        if (!venueAddress) {
            if (isHome) {
                venueAddress = 'Pol Dhondtstraat 70, 8380 Lissewege';
            } else {
                // Try to get address from TEAM_INFO
                const teamInfo = window.TEAM_INFO && window.TEAM_INFO[homeTeam];
                venueAddress = teamInfo?.address || `${homeTeam} Stadion`;
            }
        }

        const matchCard = document.createElement('div');
        matchCard.className = 'calendar-card-modern upcoming-match';
        matchCard.innerHTML = `
            <div class="calendar-date-modern">
                <span class="date-day-modern">${String(matchDate.getDate()).padStart(2, '0')}</span>
                <span class="date-month-modern">${matchDate.toLocaleDateString('nl-BE', { month: 'short' }).toUpperCase()}</span>
            </div>
            <div class="calendar-content-modern">
                <div class="event-type-badge match upcoming">
                    <i class="fas fa-calendar-check"></i> Komende Wedstrijd
                </div>
                <h3>${homeTeam} vs ${awayTeam}</h3>
                <div class="match-teams-display">
                    <div class="match-team-upcoming">
                        <img src="${homeLogo}" alt="${homeTeam} logo" class="match-team-logo-small" onerror="if(window.generatePlaceholderLogo) { this.src = window.generatePlaceholderLogo('${homeTeam}'); this.onerror = null; } else { this.style.display='none'; }">
                        <span>${homeTeam}</span>
                    </div>
                    <span class="match-vs-upcoming">VS</span>
                    <div class="match-team-upcoming">
                        <span>${awayTeam}</span>
                        <img src="${awayLogo}" alt="${awayTeam} logo" class="match-team-logo-small" onerror="if(window.generatePlaceholderLogo) { this.src = window.generatePlaceholderLogo('${awayTeam}'); this.onerror = null; } else { this.style.display='none'; }">
                    </div>
                </div>
                <div class="event-details">
                    <p class="event-time">
                        <i class="fas fa-clock"></i> ${match.time || 'TBD'}
                    </p>
                    <p class="event-location">
                        <i class="fas fa-${isHome ? 'home' : 'plane'}"></i> 
                        ${isHome ? 'Thuis' : 'Uit'} - ${venueAddress}
                    </p>
                    <p class="event-category">
                        <i class="fas fa-trophy"></i> 4e Provinciale C
                    </p>
                </div>
            </div>
        `;

        calendarGrid.appendChild(matchCard);
    });
}

// Initialize calendar data
async function initCalendar() {
    // Wait a bit for other scripts to load
    setTimeout(async () => {
        await loadPastMatches();
        await loadUpcomingMatches();
    }, 300);
}

// Initialize calendar on page load
document.addEventListener('DOMContentLoaded', async () => {
    await initCalendar();
    
    // Also initialize when navigating to calendar page (SPA)
    const calendarPage = document.getElementById('kalender');
    if (calendarPage) {
        // Use MutationObserver to detect when calendar page becomes visible
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isActive = calendarPage.classList.contains('active');
                    if (isActive && calendarPage.style.display !== 'none') {
                        // Page is now visible, reload calendar data
                        initCalendar();
                    }
                }
            });
        });
        
        observer.observe(calendarPage, {
            attributes: true,
            attributeFilter: ['class', 'style']
        });
    }
});

// Also listen for hash changes (SPA navigation)
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash === 'kalender') {
        setTimeout(() => {
            initCalendar();
        }, 300);
    }
});

// Export functions
window.loadPastMatches = loadPastMatches;
window.loadUpcomingMatches = loadUpcomingMatches;
window.initCalendar = initCalendar;

