// ============================================
// PLAYERS API INTEGRATION
// ============================================
async function updateApiSquad() {
    const squadGrid = document.getElementById('apiSquadGrid');
    const squadStatus = document.getElementById('squadApiStatus');
    const squadNote = document.getElementById('apiSquadNote');
    if (!squadGrid) return;

    squadGrid.innerHTML = '';

    const teamId = window.APP_CONFIG?.teamIds?.footballData;
    if (!teamId) {
        if (squadStatus) squadStatus.textContent = 'Configureer team-ID om spelers te tonen';
        if (squadNote) {
            squadNote.textContent = 'Deze sectie gebruikt Football-Data.org. Voeg een team-ID toe in `scripts/api-config.js`.';
        }
        return;
    }

    let squad = null;
    if (window.realFootballAPI) {
        squad = await window.realFootballAPI.getTeamSquad(teamId);
    }

    if (!squad || squad.length === 0) {
        if (squadStatus) squadStatus.textContent = 'Geen spelersdata beschikbaar';
        if (squadNote) squadNote.textContent = 'Controleer je API-sleutels en team-ID.';
        return;
    }

    if (squadStatus) squadStatus.textContent = `Aantal spelers: ${squad.length}`;
    if (squadNote) squadNote.textContent = 'Data afkomstig van de voetbal API.';

    squad.slice(0, 30).forEach(player => {
        const card = document.createElement('div');
        card.className = 'api-squad-card';
        card.innerHTML = `
            <div class="api-squad-name">${player.name || 'Speler'}</div>
            <div class="api-squad-meta">
                <span>${player.position || 'Positie'}</span>
                <span>${player.nationality || 'N/A'}</span>
            </div>
        `;
        squadGrid.appendChild(card);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateApiSquad);
} else {
    updateApiSquad();
}

window.updateApiSquad = updateApiSquad;
