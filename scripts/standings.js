// ============================================
// LEAGUE STANDINGS DATA & DISPLAY
// ============================================

const standingsData = [
    { position: 1, team: 'FC Top Team', played: 15, won: 12, drawn: 2, lost: 1, goalsFor: 45, goalsAgainst: 12, points: 38 },
    { position: 2, team: 'Sterke FC', played: 15, won: 11, drawn: 3, lost: 1, goalsFor: 38, goalsAgainst: 15, points: 36 },
    { position: 3, team: 'RFC Lissewege', played: 15, won: 10, drawn: 3, lost: 2, goalsFor: 35, goalsAgainst: 18, points: 33 },
    { position: 4, team: 'Voetbal Club A', played: 15, won: 9, drawn: 4, lost: 2, goalsFor: 32, goalsAgainst: 20, points: 31 },
    { position: 5, team: 'Sporting B', played: 15, won: 8, drawn: 5, lost: 2, goalsFor: 30, goalsAgainst: 22, points: 29 },
    { position: 6, team: 'Team C', played: 15, won: 7, drawn: 4, lost: 4, goalsFor: 28, goalsAgainst: 25, points: 25 },
    { position: 7, team: 'FC D', played: 15, won: 6, drawn: 5, lost: 4, goalsFor: 25, goalsAgainst: 28, points: 23 },
    { position: 8, team: 'Voetbal E', played: 15, won: 5, drawn: 6, lost: 4, goalsFor: 22, goalsAgainst: 30, points: 21 },
    { position: 9, team: 'Team F', played: 15, won: 4, drawn: 5, lost: 6, goalsFor: 20, goalsAgainst: 32, points: 17 },
    { position: 10, team: 'FC G', played: 15, won: 3, drawn: 4, lost: 8, goalsFor: 18, goalsAgainst: 35, points: 13 },
    { position: 11, team: 'Sporting H', played: 15, won: 2, drawn: 3, lost: 10, goalsFor: 15, goalsAgainst: 40, points: 9 },
    { position: 12, team: 'Team I', played: 15, won: 1, drawn: 2, lost: 12, goalsFor: 12, goalsAgainst: 45, points: 5 }
];

function updateStandingsTable() {
    const tbody = document.getElementById('standingsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    standingsData.forEach(team => {
        const row = document.createElement('tr');
        
        // Add special class for our team
        if (team.team === 'RFC Lissewege') {
            row.classList.add('our-team');
        }

        // Add position class for top 3
        if (team.position <= 3) {
            row.classList.add(`position-${team.position}`);
        }

        const goalDifference = team.goalsFor - team.goalsAgainst;
        const goalDiffSign = goalDifference >= 0 ? '+' : '';

        row.innerHTML = `
            <td>${team.position}</td>
            <td>${team.team}</td>
            <td>${team.played}</td>
            <td>${team.won}</td>
            <td>${team.drawn}</td>
            <td>${team.lost}</td>
            <td>${team.goalsFor}</td>
            <td>${team.goalsAgainst}</td>
            <td>${goalDiffSign}${goalDifference}</td>
            <td><strong>${team.points}</strong></td>
        `;

        tbody.appendChild(row);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateStandingsTable();
});

// Export for use in other scripts
window.updateStandingsTable = updateStandingsTable;

