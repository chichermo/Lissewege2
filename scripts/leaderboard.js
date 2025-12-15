// ============================================
// LEADERBOARD & STATISTICS
// ============================================
function initLeaderboard() {
    // Add leaderboard to players section
    addLeaderboard();
}

function addLeaderboard() {
    const playersSection = document.getElementById('spelers');
    if (!playersSection) return;

    const leaderboardHTML = `
        <div class="leaderboard-section">
            <div class="section-header">
                <span class="section-tag">Statistieken</span>
                <h2 class="section-title">Top Spelers</h2>
            </div>
            <div class="leaderboard-tabs">
                <button class="leaderboard-tab active" data-tab="goals">
                    <i class="fas fa-futbol"></i>
                    <span>Goleadores</span>
                </button>
                <button class="leaderboard-tab" data-tab="assists">
                    <i class="fas fa-hand-holding"></i>
                    <span>Assists</span>
                </button>
                <button class="leaderboard-tab" data-tab="matches">
                    <i class="fas fa-calendar-check"></i>
                    <span>Wedstrijden</span>
                </button>
            </div>
            <div class="leaderboard-content">
                <div class="leaderboard-table" id="goalsTable">
                    <div class="leaderboard-header">
                        <span>Pos</span>
                        <span>Speler</span>
                        <span>Team</span>
                        <span>Goals</span>
                    </div>
                    <div class="leaderboard-body" id="goalsBody">
                        <!-- Will be populated by JavaScript -->
                    </div>
                </div>
                <div class="leaderboard-table" id="assistsTable" style="display: none;">
                    <div class="leaderboard-header">
                        <span>Pos</span>
                        <span>Speler</span>
                        <span>Team</span>
                        <span>Assists</span>
                    </div>
                    <div class="leaderboard-body" id="assistsBody">
                        <!-- Will be populated by JavaScript -->
                    </div>
                </div>
                <div class="leaderboard-table" id="matchesTable" style="display: none;">
                    <div class="leaderboard-header">
                        <span>Pos</span>
                        <span>Speler</span>
                        <span>Team</span>
                        <span>Wedstrijden</span>
                    </div>
                    <div class="leaderboard-body" id="matchesBody">
                        <!-- Will be populated by JavaScript -->
                    </div>
                </div>
            </div>
        </div>
    `;

    const sectionHeader = playersSection.querySelector('.section-header');
    if (sectionHeader) {
        sectionHeader.insertAdjacentHTML('afterend', leaderboardHTML);
    }

    // Initialize tabs
    document.querySelectorAll('.leaderboard-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.leaderboard-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabType = tab.dataset.tab;
            document.querySelectorAll('.leaderboard-table').forEach(table => {
                table.style.display = 'none';
            });
            document.getElementById(`${tabType}Table`).style.display = 'block';
        });
    });

    // Populate leaderboard (sample data)
    populateLeaderboard();

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .leaderboard-section {
            margin-top: 4rem;
            padding-top: 4rem;
            border-top: 2px solid rgba(13, 77, 46, 0.1);
        }
        .leaderboard-tabs {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
        }
        .leaderboard-tab {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: var(--white);
            border: 2px solid rgba(13, 77, 46, 0.2);
            border-radius: 9999px;
            color: var(--text-color);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .leaderboard-tab:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }
        .leaderboard-tab.active {
            background: var(--gradient-primary);
            border-color: var(--primary-color);
            color: var(--white);
        }
        .leaderboard-table {
            background: var(--white);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        .leaderboard-header {
            display: grid;
            grid-template-columns: 60px 1fr 120px 100px;
            gap: 1rem;
            padding: 1.5rem;
            background: var(--gradient-primary);
            color: var(--white);
            font-weight: 700;
        }
        .leaderboard-body {
            display: flex;
            flex-direction: column;
        }
        .leaderboard-row {
            display: grid;
            grid-template-columns: 60px 1fr 120px 100px;
            gap: 1rem;
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid rgba(13, 77, 46, 0.08);
            transition: background 0.2s ease;
        }
        .leaderboard-row:hover {
            background: var(--light-color);
        }
        .leaderboard-row:last-child {
            border-bottom: none;
        }
        .leaderboard-position {
            font-weight: 800;
            color: var(--primary-color);
            font-size: 1.25rem;
        }
        .leaderboard-position.top {
            color: var(--accent-color);
        }
        .leaderboard-player {
            font-weight: 600;
            color: var(--dark-color);
        }
        .leaderboard-team {
            color: var(--text-light);
            font-size: 0.9rem;
        }
        .leaderboard-stat {
            font-weight: 700;
            color: var(--primary-color);
            font-size: 1.1rem;
        }
    `;
    document.head.appendChild(style);
}

function populateLeaderboard() {
    // Sample data - in production, this would come from an API
    const goalsData = [
        { name: 'Speler A', team: 'U13', goals: 12 },
        { name: 'Speler B', team: 'U10', goals: 10 },
        { name: 'Speler C', team: 'U13', goals: 8 },
        { name: 'Speler D', team: 'U9', goals: 7 },
        { name: 'Speler E', team: 'U10', goals: 6 }
    ];

    const assistsData = [
        { name: 'Speler F', team: 'U13', assists: 15 },
        { name: 'Speler G', team: 'U10', assists: 12 },
        { name: 'Speler H', team: 'U13', assists: 10 },
        { name: 'Speler I', team: 'U9', assists: 8 },
        { name: 'Speler J', team: 'U10', assists: 7 }
    ];

    const matchesData = [
        { name: 'Speler K', team: 'U13', matches: 18 },
        { name: 'Speler L', team: 'U10', matches: 17 },
        { name: 'Speler M', team: 'U13', matches: 16 },
        { name: 'Speler N', team: 'U9', matches: 15 },
        { name: 'Speler O', team: 'U10', matches: 14 }
    ];

    function renderTable(data, containerId, statKey, statLabel) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = data.map((item, index) => `
            <div class="leaderboard-row">
                <span class="leaderboard-position ${index < 3 ? 'top' : ''}">${index + 1}</span>
                <span class="leaderboard-player">${item.name}</span>
                <span class="leaderboard-team">${item.team}</span>
                <span class="leaderboard-stat">${item[statKey]} ${statLabel}</span>
            </div>
        `).join('');
    }

    renderTable(goalsData, 'goalsBody', 'goals', '');
    renderTable(assistsData, 'assistsBody', 'assists', '');
    renderTable(matchesData, 'matchesBody', 'matches', '');
}

// Initialize when players section is shown
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initLeaderboard, 500);
    });
} else {
    setTimeout(initLeaderboard, 500);
}

