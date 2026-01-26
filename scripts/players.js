// ============================================
// PLAYERS MANAGEMENT - LOAD AND DISPLAY
// ============================================

// Función para crear una tarjeta de jugador
function createPlayerCard(player) {
    const fullName = window.getFullName ? window.getFullName(player) : `${player.firstName} ${player.lastName}`;
    const photo = window.getPlayerPhoto ? window.getPlayerPhoto(player) : null;
    const positionColor = window.getPositionColor ? window.getPositionColor(player.position) : '#6b7280';
    const positionIcon = window.getPositionIcon ? window.getPositionIcon(player.position) : 'fas fa-user';
    
    const playerCard = document.createElement('div');
    playerCard.className = 'player-card';
    playerCard.setAttribute('data-player-id', player.id);
    
    // Si es capitán o vice-capitán, agregar clase especial
    if (player.isCaptain) {
        playerCard.classList.add('player-captain');
    } else if (player.isViceCaptain) {
        playerCard.classList.add('player-vice-captain');
    }
    
    let photoHTML = '';
    if (photo) {
        photoHTML = `<img src="${photo}" alt="${fullName}" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-user\\'></i>';">`;
    } else {
        photoHTML = '<i class="fas fa-user"></i>';
    }
    
    let jerseyNumberHTML = '';
    if (player.jerseyNumber !== null && player.jerseyNumber !== undefined) {
        jerseyNumberHTML = `<div class="player-jersey-number">${player.jerseyNumber}</div>`;
    }
    
    let ageHTML = '';
    if (player.age !== null && player.age !== undefined) {
        ageHTML = `<span class="player-age">${player.age} jaar</span>`;
    } else if (player.birthYear) {
        const currentYear = new Date().getFullYear();
        const age = currentYear - player.birthYear;
        ageHTML = `<span class="player-age">${age} jaar</span>`;
    }
    
    let heightHTML = '';
    if (player.height) {
        heightHTML = `<span class="player-height">${player.height} cm</span>`;
    }
    
    let captainBadge = '';
    if (player.isCaptain) {
        captainBadge = '<div class="player-captain-badge"><i class="fas fa-star"></i> Kapitein</div>';
    } else if (player.isViceCaptain) {
        captainBadge = '<div class="player-vice-captain-badge"><i class="fas fa-star-half-alt"></i> Vice-Kapitein</div>';
    }
    
    playerCard.innerHTML = `
        <div class="player-photo" style="border-color: ${positionColor};">
            ${photoHTML}
            ${jerseyNumberHTML}
        </div>
        <div class="player-info">
            <h4 class="player-name">${fullName}</h4>
            <div class="player-position" style="background-color: ${positionColor}20; color: ${positionColor};">
                <i class="${positionIcon}"></i>
                <span>${player.positionFull || player.position}</span>
            </div>
            <div class="player-details">
                ${ageHTML}
                ${heightHTML ? ` • ${heightHTML}` : ''}
            </div>
            ${captainBadge}
        </div>
    `;
    
    return playerCard;
}

// Función para cargar jugadores de un equipo específico
function loadTeamPlayers(teamId) {
    const teamContainer = document.getElementById(`team-${teamId}`);
    if (!teamContainer) {
        console.warn(`Team container not found: team-${teamId}`);
        return;
    }
    
    const playersGrid = teamContainer.querySelector('.players-grid');
    if (!playersGrid) {
        console.warn(`Players grid not found in team-${teamId}`);
        return;
    }
    
    // Obtener datos de jugadores
    const playersData = window.PLAYERS_DATA;
    if (!playersData) {
        console.warn('PLAYERS_DATA not found');
        return;
    }
    
    // Obtener jugadores del equipo
    let players = [];
    if (teamId === 'eersteElftallen') {
        players = playersData.eersteElftallen || [];
    } else {
        players = playersData[teamId] || [];
    }
    
    // Limpiar grid (si no hay jugadores, mostrar estado vacío)
    if (players.length === 0) {
        const placeholders = playersGrid.querySelectorAll('.player-card');
        placeholders.forEach(placeholder => placeholder.remove());
        if (!playersGrid.querySelector('.players-empty')) {
            const emptyState = document.createElement('div');
            emptyState.className = 'players-empty';
            emptyState.textContent = 'Nog geen spelerslijst beschikbaar.';
            playersGrid.appendChild(emptyState);
        }
        return;
    }
    
    // Limpiar todos los placeholders
    const placeholders = playersGrid.querySelectorAll('.player-card.placeholder');
    placeholders.forEach(placeholder => placeholder.remove());
    
    // Ordenar jugadores por número de camiseta (si existe), luego por apellido
    players.sort((a, b) => {
        if (a.jerseyNumber !== null && b.jerseyNumber !== null) {
            return a.jerseyNumber - b.jerseyNumber;
        }
        if (a.jerseyNumber !== null) return -1;
        if (b.jerseyNumber !== null) return 1;
        return (a.lastName || '').localeCompare(b.lastName || '');
    });
    
    // Crear y agregar tarjetas de jugadores
    players.forEach(player => {
        const playerCard = createPlayerCard(player);
        playersGrid.appendChild(playerCard);
    });
    
    console.log(`Loaded ${players.length} players for team ${teamId}`);
}

// Función para inicializar todos los equipos
function initPlayers() {
    // Esperar a que los datos estén cargados
    if (!window.PLAYERS_DATA) {
        console.warn('PLAYERS_DATA not loaded yet, retrying...');
        setTimeout(initPlayers, 100);
        return;
    }
    
    // Cargar jugadores para cada equipo
    const teams = ['u7', 'u8', 'u9', 'u10', 'u13', 'u15', 'eersteElftallen'];
    teams.forEach(teamId => {
        loadTeamPlayers(teamId);
    });
    
    console.log('Players initialized');
}

// Función para recargar jugadores cuando se cambia de equipo
function reloadPlayersForActiveTeam() {
    const activeTeamBtn = document.querySelector('.team-select-btn.active');
    if (activeTeamBtn) {
        const teamId = activeTeamBtn.getAttribute('data-team');
        loadTeamPlayers(teamId);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un poco para que otros scripts se carguen
    setTimeout(() => {
        initPlayers();
    }, 500);
    
    // Recargar jugadores cuando se cambia de equipo
    const teamSelectBtns = document.querySelectorAll('.team-select-btn');
    teamSelectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(() => {
                const teamId = btn.getAttribute('data-team');
                loadTeamPlayers(teamId);
            }, 100);
        });
    });
});

// También inicializar cuando se navega a la página de jugadores (SPA)
const playersPage = document.getElementById('spelers');
if (playersPage) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const isActive = playersPage.classList.contains('active');
                if (isActive && playersPage.style.display !== 'none') {
                    // Página de jugadores es ahora visible, recargar datos
                    setTimeout(() => {
                        reloadPlayersForActiveTeam();
                    }, 300);
                }
            }
        });
    });
    
    observer.observe(playersPage, {
        attributes: true,
        attributeFilter: ['class', 'style']
    });
}

// Escuchar cambios de hash (SPA navigation)
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash === 'spelers') {
        setTimeout(() => {
            reloadPlayersForActiveTeam();
        }, 300);
    }
});

// Exportar funciones
window.loadTeamPlayers = loadTeamPlayers;
window.initPlayers = initPlayers;
window.createPlayerCard = createPlayerCard;

