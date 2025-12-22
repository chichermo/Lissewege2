// ============================================
// PLAYER STATISTICS SYSTEM
// ============================================
// Systeem voor statistieken van spelers en teams

if (typeof PlayerStatistics === 'undefined') {
    class PlayerStatistics {
    constructor() {
        this.players = [];
        this.matches = [];
        this.seasons = [];
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
    }

    /**
     * Laadt statistieken data
     */
    loadData() {
        // Laad van localStorage of gebruik demo data
        const savedStats = localStorage.getItem('player_statistics');
        if (savedStats) {
            const data = JSON.parse(savedStats);
            this.players = data.players || [];
            this.matches = data.matches || [];
            this.seasons = data.seasons || [];
        } else {
            this.loadDemoData();
        }
    }

    /**
     * Laadt demo data voor ontwikkeling
     */
    loadDemoData() {
        this.seasons = [
            { id: '2024-2025', name: '2024-2025', active: true },
            { id: '2023-2024', name: '2023-2024', active: false },
            { id: '2022-2023', name: '2022-2023', active: false }
        ];

        this.players = [
            {
                id: 1,
                name: 'Jan De Vries',
                team: 'A-Kern',
                position: 'Aanvaller',
                jerseyNumber: 9,
                stats: {
                    '2024-2025': {
                        matches: 15,
                        goals: 12,
                        assists: 5,
                        yellowCards: 2,
                        redCards: 0,
                        minutes: 1250,
                        rating: 8.2
                    },
                    '2023-2024': {
                        matches: 28,
                        goals: 18,
                        assists: 8,
                        yellowCards: 3,
                        redCards: 0,
                        minutes: 2450,
                        rating: 7.8
                    }
                }
            },
            {
                id: 2,
                name: 'Pieter Janssens',
                team: 'A-Kern',
                position: 'Middenvelder',
                jerseyNumber: 10,
                stats: {
                    '2024-2025': {
                        matches: 14,
                        goals: 3,
                        assists: 12,
                        yellowCards: 1,
                        redCards: 0,
                        minutes: 1180,
                        rating: 8.5
                    },
                    '2023-2024': {
                        matches: 26,
                        goals: 5,
                        assists: 15,
                        yellowCards: 2,
                        redCards: 0,
                        minutes: 2280,
                        rating: 8.1
                    }
                }
            },
            {
                id: 3,
                name: 'Tom Maes',
                team: 'A-Kern',
                position: 'Verdediger',
                jerseyNumber: 4,
                stats: {
                    '2024-2025': {
                        matches: 16,
                        goals: 1,
                        assists: 2,
                        yellowCards: 4,
                        redCards: 0,
                        minutes: 1440,
                        rating: 7.5
                    },
                    '2023-2024': {
                        matches: 30,
                        goals: 2,
                        assists: 3,
                        yellowCards: 6,
                        redCards: 1,
                        minutes: 2700,
                        rating: 7.2
                    }
                }
            },
            {
                id: 4,
                name: 'Lucas Vermeulen',
                team: 'U15',
                position: 'Aanvaller',
                jerseyNumber: 7,
                stats: {
                    '2024-2025': {
                        matches: 12,
                        goals: 15,
                        assists: 4,
                        yellowCards: 1,
                        redCards: 0,
                        minutes: 980,
                        rating: 8.8
                    }
                }
            },
            {
                id: 5,
                name: 'Noah De Smet',
                team: 'U13',
                position: 'Doelman',
                jerseyNumber: 1,
                stats: {
                    '2024-2025': {
                        matches: 10,
                        goals: 0,
                        assists: 0,
                        yellowCards: 0,
                        redCards: 0,
                        minutes: 900,
                        cleanSheets: 6,
                        goalsConceded: 8,
                        saves: 45,
                        rating: 8.0
                    }
                }
            }
        ];

        this.matches = [
            {
                id: 1,
                date: '2024-09-15',
                opponent: 'FC Zeebrugge',
                result: '2-0',
                competition: '4e Provinciale C',
                players: [
                    { playerId: 1, goals: 1, assists: 0, yellowCards: 0, redCards: 0, rating: 8.0 },
                    { playerId: 2, goals: 0, assists: 1, yellowCards: 0, redCards: 0, rating: 8.5 },
                    { playerId: 3, goals: 0, assists: 0, yellowCards: 1, redCards: 0, rating: 7.0 }
                ]
            },
            {
                id: 2,
                date: '2024-09-22',
                opponent: 'KVV Aartrijke',
                result: '2-4',
                competition: '4e Provinciale C',
                players: [
                    { playerId: 1, goals: 2, assists: 0, yellowCards: 0, redCards: 0, rating: 8.5 },
                    { playerId: 2, goals: 0, assists: 2, yellowCards: 0, redCards: 0, rating: 8.0 },
                    { playerId: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0, rating: 6.5 }
                ]
            }
        ];
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Season selector
        const seasonSelect = document.getElementById('statsSeasonSelect');
        if (seasonSelect) {
            seasonSelect.addEventListener('change', (e) => {
                this.updateStatistics(e.target.value);
            });
        }

        // Team filter
        const teamFilter = document.getElementById('statsTeamFilter');
        if (teamFilter) {
            teamFilter.addEventListener('change', (e) => {
                this.filterByTeam(e.target.value);
            });
        }

        // Player detail clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.player-stat-card')) {
                const card = e.target.closest('.player-stat-card');
                const playerId = parseInt(card.dataset.playerId);
                this.showPlayerDetails(playerId);
            }
        });
    }

    /**
     * Toont statistieken voor een seizoen
     */
    updateStatistics(seasonId) {
        const container = document.getElementById('playerStatsContainer');
        if (!container) return;

        const players = this.players.filter(p => p.stats[seasonId]);
        const sortedPlayers = players.sort((a, b) => {
            const aGoals = a.stats[seasonId].goals || 0;
            const bGoals = b.stats[seasonId].goals || 0;
            return bGoals - aGoals;
        });

        container.innerHTML = sortedPlayers.map(player => {
            const stats = player.stats[seasonId];
            const goalsPerMatch = (stats.goals / stats.matches).toFixed(2);
            const assistsPerMatch = (stats.assists / stats.matches).toFixed(2);

            return `
                <div class="player-stat-card" data-player-id="${player.id}">
                    <div class="stat-card-header">
                        <div class="player-jersey-number">${player.jerseyNumber}</div>
                        <div class="player-info">
                            <h4>${player.name}</h4>
                            <span class="player-position">${player.position} • ${player.team}</span>
                        </div>
                        <div class="player-rating">
                            <span class="rating-value">${stats.rating}</span>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="stat-card-body">
                        <div class="stat-row">
                            <div class="stat-item">
                                <span class="stat-label">Wedstrijden</span>
                                <span class="stat-value">${stats.matches}</span>
                            </div>
                            <div class="stat-item highlight">
                                <span class="stat-label">Doelpunten</span>
                                <span class="stat-value">${stats.goals}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Assists</span>
                                <span class="stat-value">${stats.assists}</span>
                            </div>
                        </div>
                        <div class="stat-row">
                            <div class="stat-item">
                                <span class="stat-label">Gele Kaarten</span>
                                <span class="stat-value">${stats.yellowCards || 0}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Rode Kaarten</span>
                                <span class="stat-value">${stats.redCards || 0}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Minuten</span>
                                <span class="stat-value">${stats.minutes}</span>
                            </div>
                        </div>
                        ${stats.cleanSheets !== undefined ? `
                            <div class="stat-row">
                                <div class="stat-item">
                                    <span class="stat-label">Clean Sheets</span>
                                    <span class="stat-value">${stats.cleanSheets}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Tegen Doelpunten</span>
                                    <span class="stat-value">${stats.goalsConceded}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Reddingen</span>
                                    <span class="stat-value">${stats.saves || 0}</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    <div class="stat-card-footer">
                        <button class="btn-view-details" onclick="playerStats.showPlayerDetails(${player.id})">
                            <i class="fas fa-chart-line"></i> Details Bekijken
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Update charts
        this.updateCharts(seasonId);
    }

    /**
     * Filtert spelers op team
     */
    filterByTeam(teamId) {
        const container = document.getElementById('playerStatsContainer');
        if (!container) return;

        const cards = container.querySelectorAll('.player-stat-card');
        cards.forEach(card => {
            const player = this.players.find(p => p.id === parseInt(card.dataset.playerId));
            if (teamId === 'all' || player.team === teamId) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    /**
     * Toont details van een speler
     */
    showPlayerDetails(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;

        const modal = document.getElementById('playerDetailsModal');
        if (!modal) {
            this.createDetailsModal();
        }

        const detailsModal = document.getElementById('playerDetailsModal');
        const seasonSelect = document.getElementById('playerDetailsSeason');
        const currentSeason = seasonSelect ? seasonSelect.value : '2024-2025';

        // Update modal content
        const modalContent = detailsModal.querySelector('.modal-content');
        modalContent.innerHTML = this.generatePlayerDetailsHTML(player, currentSeason);

        detailsModal.style.display = 'flex';

        // Setup chart
        this.drawPlayerChart(player, currentSeason);
    }

    /**
     * Genereert HTML voor speler details
     */
    generatePlayerDetailsHTML(player, seasonId) {
        const stats = player.stats[seasonId];
        if (!stats) {
            return `<p>Geen statistieken beschikbaar voor dit seizoen.</p>`;
        }

        const allSeasons = Object.keys(player.stats);
        const matches = this.matches.filter(m => 
            m.players.some(p => p.playerId === player.id)
        );

        return `
            <div class="player-details-header">
                <button class="modal-close" onclick="this.closest('.modal').style.display='none'">
                    <i class="fas fa-times"></i>
                </button>
                <div class="player-details-info">
                    <div class="player-details-jersey">${player.jerseyNumber}</div>
                    <div>
                        <h2>${player.name}</h2>
                        <p>${player.position} • ${player.team}</p>
                    </div>
                </div>
            </div>
            
            <div class="player-details-body">
                <div class="details-tabs">
                    <button class="detail-tab active" data-tab="overview">Overzicht</button>
                    <button class="detail-tab" data-tab="matches">Wedstrijden</button>
                    <button class="detail-tab" data-tab="comparison">Vergelijking</button>
                </div>

                <div class="details-content">
                    <div class="detail-panel active" id="overview-panel">
                        <div class="stats-grid-detailed">
                            <div class="stat-box">
                                <div class="stat-icon"><i class="fas fa-futbol"></i></div>
                                <div class="stat-info">
                                    <span class="stat-number">${stats.goals}</span>
                                    <span class="stat-label">Doelpunten</span>
                                </div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-icon"><i class="fas fa-hand-holding"></i></div>
                                <div class="stat-info">
                                    <span class="stat-number">${stats.assists}</span>
                                    <span class="stat-label">Assists</span>
                                </div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-icon"><i class="fas fa-calendar-check"></i></div>
                                <div class="stat-info">
                                    <span class="stat-number">${stats.matches}</span>
                                    <span class="stat-label">Wedstrijden</span>
                                </div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-icon"><i class="fas fa-star"></i></div>
                                <div class="stat-info">
                                    <span class="stat-number">${stats.rating}</span>
                                    <span class="stat-label">Gemiddelde Rating</span>
                                </div>
                            </div>
                        </div>
                        <div class="chart-container">
                            <canvas id="playerChart" width="400" height="200"></canvas>
                        </div>
                    </div>

                    <div class="detail-panel" id="matches-panel">
                        <div class="matches-list">
                            ${matches.map(match => {
                                const playerMatch = match.players.find(p => p.playerId === player.id);
                                if (!playerMatch) return '';
                                return `
                                    <div class="match-item">
                                        <div class="match-date">${new Date(match.date).toLocaleDateString('nl-BE')}</div>
                                        <div class="match-info">
                                            <span class="match-opponent">vs ${match.opponent}</span>
                                            <span class="match-result">${match.result}</span>
                                        </div>
                                        <div class="match-stats">
                                            <span><i class="fas fa-futbol"></i> ${playerMatch.goals}</span>
                                            <span><i class="fas fa-hand-holding"></i> ${playerMatch.assists}</span>
                                            <span><i class="fas fa-star"></i> ${playerMatch.rating}</span>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <div class="detail-panel" id="comparison-panel">
                        <p>Vergelijking met teamgenoten komt binnenkort beschikbaar.</p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Tekent grafiek voor speler
     */
    drawPlayerChart(player, seasonId) {
        const canvas = document.getElementById('playerChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const stats = player.stats[seasonId];
        if (!stats) return;

        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw bar chart
        const data = [
            { label: 'Doelpunten', value: stats.goals, max: 20, color: '#ff6b35' },
            { label: 'Assists', value: stats.assists, max: 15, color: '#2d8f5f' },
            { label: 'Wedstrijden', value: stats.matches, max: 30, color: '#1e3a8a' }
        ];

        const barWidth = width / data.length - 20;
        const maxValue = Math.max(...data.map(d => d.max));

        data.forEach((item, index) => {
            const x = index * (barWidth + 20) + 10;
            const barHeight = (item.value / maxValue) * (height - 60);
            const y = height - barHeight - 30;

            // Draw bar
            ctx.fillStyle = item.color;
            ctx.fillRect(x, y, barWidth, barHeight);

            // Draw value
            ctx.fillStyle = '#333';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5);

            // Draw label
            ctx.font = '12px Arial';
            ctx.fillText(item.label, x + barWidth / 2, height - 10);
        });
    }

    /**
     * Maakt details modal aan
     */
    createDetailsModal() {
        const modal = document.createElement('div');
        modal.id = 'playerDetailsModal';
        modal.className = 'modal';
        modal.innerHTML = '<div class="modal-content player-details-modal-content"></div>';
        document.body.appendChild(modal);
    }

    /**
     * Update charts voor seizoen
     */
    updateCharts(seasonId) {
        // Update top scorers chart
        this.updateTopScorersChart(seasonId);
        this.updateTeamStatsChart(seasonId);
    }

    /**
     * Update top scorers chart
     */
    updateTopScorersChart(seasonId) {
        const canvas = document.getElementById('topScorersChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const players = this.players
            .filter(p => p.stats[seasonId])
            .sort((a, b) => (b.stats[seasonId].goals || 0) - (a.stats[seasonId].goals || 0))
            .slice(0, 5);

        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        const maxGoals = Math.max(...players.map(p => p.stats[seasonId].goals || 0), 1);
        const barHeight = (height - 40) / players.length;

        players.forEach((player, index) => {
            const goals = player.stats[seasonId].goals || 0;
            const barWidth = (goals / maxGoals) * (width - 100);
            const y = index * barHeight + 20;

            // Draw bar
            ctx.fillStyle = '#ff6b35';
            ctx.fillRect(50, y, barWidth, barHeight - 5);

            // Draw name
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(player.name, 5, y + barHeight / 2 + 4);

            // Draw goals
            ctx.textAlign = 'right';
            ctx.font = 'bold 14px Arial';
            ctx.fillText(goals.toString(), width - 5, y + barHeight / 2 + 4);
        });
    }

    /**
     * Update team stats chart
     */
    updateTeamStatsChart(seasonId) {
        const canvas = document.getElementById('teamStatsChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const teams = {};
        
        this.players.forEach(player => {
            if (player.stats[seasonId]) {
                if (!teams[player.team]) {
                    teams[player.team] = { goals: 0, assists: 0, matches: 0, players: 0 };
                }
                teams[player.team].goals += player.stats[seasonId].goals || 0;
                teams[player.team].assists += player.stats[seasonId].assists || 0;
                teams[player.team].matches += player.stats[seasonId].matches || 0;
                teams[player.team].players += 1;
            }
        });

        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        const teamNames = Object.keys(teams);
        const barWidth = (width - 40) / teamNames.length;

        teamNames.forEach((team, index) => {
            const stats = teams[team];
            const x = index * barWidth + 20;
            const maxValue = Math.max(stats.goals, stats.assists, 1);
            const goalsHeight = (stats.goals / maxValue) * (height - 40);
            const assistsHeight = (stats.assists / maxValue) * (height - 40);

            // Draw goals bar
            ctx.fillStyle = '#ff6b35';
            ctx.fillRect(x, height - goalsHeight - 20, barWidth - 5, goalsHeight);

            // Draw assists bar
            ctx.fillStyle = '#2d8f5f';
            ctx.fillRect(x + barWidth - 5, height - assistsHeight - 20, barWidth - 5, assistsHeight);

            // Draw team name
            ctx.fillStyle = '#333';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(team, x + barWidth / 2, height - 5);
        });
    }
    }
    window.PlayerStatistics = PlayerStatistics;
}

// Initialiseer wanneer DOM klaar is
if (!window.playerStats) {
    let playerStats;
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.playerStats) {
            playerStats = new PlayerStatistics();
            window.playerStats = playerStats;
        }
    });
}

