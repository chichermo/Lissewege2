// ============================================
// PLAYERS API INTEGRATION
// ============================================
async function updateApiSquad() {
    const squadGrid = document.getElementById('apiSquadGrid');
    const squadStatus = document.getElementById('squadApiStatus');
    const squadNote = document.getElementById('apiSquadNote');
    if (!squadGrid) return;

    squadGrid.innerHTML = '';

    const teamId = window.APP_CONFIG?.teamIds?.apiFootball || window.APP_CONFIG?.teamIds?.footballData;
    if (!teamId) {
        if (squadStatus) squadStatus.textContent = 'Configureer team-ID om spelers te tonen';
        if (squadNote) {
            squadNote.textContent = 'Deze sectie gebruikt API-Football of Football-Data.org. Voeg een team-ID toe in `scripts/api-config.js`.';
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
    if (squadNote) squadNote.textContent = 'Data afkomstig van API-Football.';

    squad.slice(0, 40).forEach(player => {
        const age = player.age ? `${player.age} jaar` : '';
        const number = player.number ? `#${player.number}` : '';
        const photo = player.photo ? `<img src="${player.photo}" alt="${player.name}" loading="lazy">` : '';
        const card = document.createElement('div');
        card.className = 'api-squad-card';
        card.innerHTML = `
            <div class="api-squad-name">${player.name || 'Speler'}</div>
            ${photo}
            <div class="api-squad-meta">
                <span>${player.position || 'Positie'}</span>
                <span>${player.nationality || 'N/A'}</span>
                ${number ? `<span>${number}</span>` : ''}
                ${age ? `<span>${age}</span>` : ''}
            </div>
        `;
        squadGrid.appendChild(card);
    });

    renderApiSquadInPlayersTab(squad);
}

function renderApiSquadInPlayersTab(squad) {
    const teamContainer = document.getElementById('team-eersteElftallen');
    if (!teamContainer || !Array.isArray(squad)) return;

    const playersGrid = teamContainer.querySelector('.players-grid');
    if (!playersGrid) return;

    playersGrid.innerHTML = '';

    const mapPosition = (position) => {
        const normalized = (position || '').toLowerCase();
        if (normalized.includes('goal')) return { code: 'GK', label: 'Doelman' };
        if (normalized.includes('defend')) return { code: 'DF', label: 'Verdediger' };
        if (normalized.includes('midfield')) return { code: 'MF', label: 'Middenvelder' };
        if (normalized.includes('attack') || normalized.includes('forward')) return { code: 'FW', label: 'Aanvaller' };
        return { code: 'STAF', label: position || 'Speler' };
    };

    squad.slice(0, 40).forEach(player => {
        const name = player.name || 'Speler';
        const [firstName, ...rest] = name.split(' ');
        const lastName = rest.join(' ');
        const positionInfo = mapPosition(player.position);

        const mappedPlayer = {
            id: `api-${player.id || name}`,
            firstName,
            lastName,
            fullName: name,
            photo: player.photo || null,
            jerseyNumber: player.number || null,
            position: positionInfo.code,
            positionFull: positionInfo.label,
            age: player.age || null,
            team: 'eersteElftallen'
        };

        if (window.createPlayerCard) {
            const card = window.createPlayerCard(mappedPlayer);
            playersGrid.appendChild(card);
        }
    });

    if (!playersGrid.children.length) {
        const emptyState = document.createElement('div');
        emptyState.className = 'players-empty';
        emptyState.textContent = 'Nog geen spelerslijst beschikbaar.';
        playersGrid.appendChild(emptyState);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateApiSquad);
} else {
    updateApiSquad();
}

window.updateApiSquad = updateApiSquad;
