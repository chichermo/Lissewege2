// ============================================
// CLUB HISTORY & ARCHIVE SYSTEM
// ============================================
// Systeem voor club geschiedenis en archief

if (typeof ClubHistory === 'undefined') {
    class ClubHistory {
    constructor() {
        this.seasons = [];
        this.achievements = [];
        this.timeline = [];
        this.init();
    }

    init() {
        this.loadHistoryData();
        this.setupEventListeners();
        this.renderTimeline();
    }

    /**
     * Laadt geschiedenis data
     */
    loadHistoryData() {
        this.seasons = [
            {
                id: '2024-2025',
                year: '2024-2025',
                league: '4e Provinciale C West-Vlaanderen',
                position: 3,
                matches: 15,
                wins: 9,
                draws: 3,
                losses: 3,
                goalsFor: 32,
                goalsAgainst: 18,
                points: 30,
                topScorer: { name: 'Jan De Vries', goals: 12 },
                highlights: ['Goede start van het seizoen', 'Winst tegen FC Zeebrugge']
            },
            {
                id: '2023-2024',
                year: '2023-2024',
                league: '4e Provinciale C West-Vlaanderen',
                position: 5,
                matches: 28,
                wins: 14,
                draws: 6,
                losses: 8,
                goalsFor: 48,
                goalsAgainst: 32,
                points: 48,
                topScorer: { name: 'Jan De Vries', goals: 18 },
                highlights: ['Beste seizoen in jaren', 'Kwalificatie voor beker']
            },
            {
                id: '2022-2023',
                year: '2022-2023',
                league: '4e Provinciale C West-Vlaanderen',
                position: 7,
                matches: 26,
                wins: 10,
                draws: 5,
                losses: 11,
                goalsFor: 38,
                goalsAgainst: 42,
                points: 35,
                topScorer: { name: 'Pieter Janssens', goals: 8 },
                highlights: ['Herstructurering van teams']
            }
        ];

        this.achievements = [
            { year: 2024, title: 'Beste Positie in 5 Jaar', description: '3e plaats in competitie' },
            { year: 2023, title: 'Kwalificatie Beker', description: 'Eerste keer in beker competitie' },
            { year: 2020, title: '75 Jaar Club', description: 'Viering van 75 jaar RFC Lissewege' },
            { year: 2015, title: 'Nieuwe Kleedkamers', description: 'Renovatie faciliteiten' },
            { year: 2010, title: 'Jeugd Academie', description: 'Start van jeugd programma' },
            { year: 2000, title: 'Clubhuis Opening', description: 'Nieuw clubhuis gebouwd' },
            { year: 1947, title: 'Club Opgericht', description: 'RFC Lissewege opgericht' }
        ];

        this.timeline = [
            { year: 1947, event: 'Oprichting', description: 'Royal Football Club Lissewege wordt opgericht' },
            { year: 1950, event: 'Eerste Competitie', description: 'Deelname aan eerste officiële competitie' },
            { year: 1965, event: 'Eerste Kampioenschap', description: 'Eerste titel in provinciale competitie' },
            { year: 1980, event: 'Uitbreiding', description: 'Uitbreiding naar meerdere teams' },
            { year: 2000, event: 'Nieuw Clubhuis', description: 'Opening van nieuw clubhuis' },
            { year: 2010, event: 'Jeugd Academie', description: 'Start van gestructureerd jeugdprogramma' },
            { year: 2020, event: '75 Jaar', description: 'Viering van 75-jarig bestaan' },
            { year: 2024, event: 'Modernisering', description: 'Nieuwe website en digitale transformatie' }
        ];
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Season selector
        const seasonSelect = document.getElementById('historySeasonSelect');
        if (seasonSelect) {
            seasonSelect.addEventListener('change', (e) => {
                this.showSeasonDetails(e.target.value);
            });
        }

        // Timeline filter
        const timelineFilter = document.getElementById('timelineFilter');
        if (timelineFilter) {
            timelineFilter.addEventListener('change', (e) => {
                this.filterTimeline(e.target.value);
            });
        }
    }

    /**
     * Rendert timeline
     */
    renderTimeline(filter = 'all') {
        const container = document.getElementById('historyTimeline');
        if (!container) return;

        let filtered = this.timeline;
        if (filter === 'recent') {
            filtered = this.timeline.filter(t => t.year >= 2000);
        } else if (filter === 'early') {
            filtered = this.timeline.filter(t => t.year < 2000);
        }

        container.innerHTML = filtered.map((item, index) => `
            <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-content">
                    <h4>${item.event}</h4>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');
    }

    /**
     * Toont seizoen details
     */
    showSeasonDetails(seasonId) {
        const season = this.seasons.find(s => s.id === seasonId);
        if (!season) return;

        const container = document.getElementById('seasonDetails');
        if (!container) return;

        const winPercentage = ((season.wins / season.matches) * 100).toFixed(1);
        const avgGoalsFor = (season.goalsFor / season.matches).toFixed(2);
        const avgGoalsAgainst = (season.goalsAgainst / season.matches).toFixed(2);

        container.innerHTML = `
            <div class="season-header">
                <h3>Seizoen ${season.year}</h3>
                <span class="season-league">${season.league}</span>
            </div>
            <div class="season-stats-grid">
                <div class="season-stat-box">
                    <div class="stat-icon"><i class="fas fa-trophy"></i></div>
                    <div class="stat-value">${season.position}e</div>
                    <div class="stat-label">Positie</div>
                </div>
                <div class="season-stat-box">
                    <div class="stat-icon"><i class="fas fa-calendar"></i></div>
                    <div class="stat-value">${season.matches}</div>
                    <div class="stat-label">Wedstrijden</div>
                </div>
                <div class="season-stat-box">
                    <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
                    <div class="stat-value">${season.wins}</div>
                    <div class="stat-label">Overwinningen</div>
                </div>
                <div class="season-stat-box">
                    <div class="stat-icon"><i class="fas fa-equals"></i></div>
                    <div class="stat-value">${season.draws}</div>
                    <div class="stat-label">Gelijk</div>
                </div>
                <div class="season-stat-box">
                    <div class="stat-icon"><i class="fas fa-times-circle"></i></div>
                    <div class="stat-value">${season.losses}</div>
                    <div class="stat-label">Nederlagen</div>
                </div>
                <div class="season-stat-box">
                    <div class="stat-icon"><i class="fas fa-futbol"></i></div>
                    <div class="stat-value">${season.goalsFor}</div>
                    <div class="stat-label">Doelpunten Voor</div>
                </div>
                <div class="season-stat-box">
                    <div class="stat-icon"><i class="fas fa-shield-alt"></i></div>
                    <div class="stat-value">${season.goalsAgainst}</div>
                    <div class="stat-label">Doelpunten Tegen</div>
                </div>
                <div class="season-stat-box">
                    <div class="stat-icon"><i class="fas fa-star"></i></div>
                    <div class="stat-value">${season.points}</div>
                    <div class="stat-label">Punten</div>
                </div>
            </div>
            <div class="season-details">
                <div class="season-highlights">
                    <h4>Highlights</h4>
                    <ul>
                        ${season.highlights.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                </div>
                <div class="season-top-scorer">
                    <h4>Topscorer</h4>
                    <div class="top-scorer-info">
                        <span class="scorer-name">${season.topScorer.name}</span>
                        <span class="scorer-goals">${season.topScorer.goals} doelpunten</span>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Filtert timeline
     */
    filterTimeline(filter) {
        this.renderTimeline(filter);
    }

    /**
     * Rendert achievements
     */
    renderAchievements() {
        const container = document.getElementById('achievementsList');
        if (!container) return;

        container.innerHTML = this.achievements.map(achievement => `
            <div class="achievement-item">
                <div class="achievement-year">${achievement.year}</div>
                <div class="achievement-content">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `).join('');
    }
}
    window.ClubHistory = ClubHistory;
}

// Initialiseer wanneer DOM klaar is
if (!window.clubHistory) {
    let clubHistory;
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.clubHistory) {
            clubHistory = new ClubHistory();
            window.clubHistory = clubHistory;
            clubHistory.renderAchievements();
        }
    });
}

