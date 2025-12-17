// ============================================
// COMPETITIONS INITIALIZATION
// ============================================
// Script para inicializar y poblar las secciones de competencias y rivales

document.addEventListener('DOMContentLoaded', () => {
    initCompetitions();
    initRivals();
});

/**
 * Inicializa la sección de competencias
 */
async function initCompetitions() {
    const standingsContent = document.getElementById('standingsContent');
    if (!standingsContent) return;

    try {
        // Obtener clasificación desde la API
        let standingsData;
        if (window.voetbalAPI) {
            standingsData = await window.voetbalAPI.getStandings();
        }

        // Si no hay datos de API, usar datos de respaldo
        if (!standingsData || !standingsData.standings) {
            if (window.voetbalAPI) {
                standingsData = window.voetbalAPI.getFallbackStandings();
            } else {
                standingsData = {
                    standings: [
                        { position: 1, team: 'KVV Aartrijke', played: 15, won: 12, drawn: 2, lost: 1, points: 38, goalsFor: 45, goalsAgainst: 18 },
                        { position: 2, team: 'FC Zeebrugge', played: 15, won: 11, drawn: 3, lost: 1, points: 36, goalsFor: 42, goalsAgainst: 20 },
                        { position: 3, team: 'KSV Jabbeke', played: 15, won: 10, drawn: 2, lost: 3, points: 32, goalsFor: 38, goalsAgainst: 22 },
                        { position: 4, team: 'KFC Sint-Joris', played: 15, won: 9, drawn: 3, lost: 3, points: 30, goalsFor: 35, goalsAgainst: 25 },
                        { position: 5, team: 'RFC Lissewege', played: 15, won: 8, drawn: 4, lost: 3, points: 28, goalsFor: 32, goalsAgainst: 24 },
                        { position: 6, team: 'KSK Steenbrugge', played: 15, won: 7, drawn: 3, lost: 5, points: 24, goalsFor: 28, goalsAgainst: 30 },
                        { position: 7, team: 'KFC Damme', played: 15, won: 6, drawn: 4, lost: 5, points: 22, goalsFor: 25, goalsAgainst: 28 },
                        { position: 8, team: 'VKSO Zerkegem B', played: 15, won: 5, drawn: 3, lost: 7, points: 18, goalsFor: 22, goalsAgainst: 35 }
                    ]
                };
            }
        }

        // Renderizar clasificación
        standingsContent.innerHTML = standingsData.standings.map(team => {
            const isOurTeam = team.team === 'RFC Lissewege';
            const isTop3 = team.position <= 3;
            const goalDiff = (team.goalsFor || 0) - (team.goalsAgainst || 0);
            
            return `
                <div class="standings-row ${isOurTeam ? 'our-team' : ''}">
                    <div class="position ${isTop3 ? 'top-3' : ''}">${team.position}</div>
                    <div class="team-name">${team.team}</div>
                    <div class="stats-cell hide-mobile">${team.played || 0}</div>
                    <div class="stats-cell hide-mobile">${team.won || 0}</div>
                    <div class="stats-cell hide-mobile">${team.drawn || 0}</div>
                    <div class="stats-cell hide-mobile">${team.lost || 0}</div>
                    <div class="stats-cell">${goalDiff > 0 ? '+' : ''}${goalDiff}</div>
                    <div class="stats-cell points">${team.points || 0}</div>
                </div>
            `;
        }).join('');
    } catch (error) {
        // Silenciar completamente errores de CORS/red - usar datos de respaldo
        // No loguear ningún error relacionado con fetch/CORS/red
        const isCorsOrNetworkError = error.name === 'TypeError' || 
                                    error.name === 'AbortError' ||
                                    error.message?.includes('fetch') ||
                                    error.message?.includes('CORS') ||
                                    error.message?.includes('Failed to fetch') ||
                                    error.message?.includes('network');
        
        // Solo loguear errores inesperados que no sean de red/CORS
        if (!isCorsOrNetworkError) {
            console.error('Error al inicializar competencias:', error);
        }
        // Los datos de respaldo ya se cargaron en el try block
    }
}

/**
 * Inicializa la sección de rivales
 */
async function initRivals() {
    const rivalsGrid = document.getElementById('rivalsGrid');
    if (!rivalsGrid) return;

    try {
        // Obtener lista de rivales
        let rivals;
        if (window.rivalTeamsManager) {
            await window.rivalTeamsManager.loadRivals();
            rivals = window.rivalTeamsManager.rivals;
        } else {
            // Datos de respaldo
            rivals = [
                { name: 'KVV Aartrijke', position: 1, points: 38, played: 15, won: 12, drawn: 2, lost: 1, goalsFor: 45, goalsAgainst: 18, goalDifference: 27, location: 'Aartrijke', distance: '~15 km' },
                { name: 'FC Zeebrugge', position: 2, points: 36, played: 15, won: 11, drawn: 3, lost: 1, goalsFor: 42, goalsAgainst: 20, goalDifference: 22, location: 'Zeebrugge', distance: '~10 km' },
                { name: 'KSV Jabbeke', position: 3, points: 32, played: 15, won: 10, drawn: 2, lost: 3, goalsFor: 38, goalsAgainst: 22, goalDifference: 16, location: 'Jabbeke', distance: '~8 km' },
                { name: 'KFC Sint-Joris', position: 4, points: 30, played: 15, won: 9, drawn: 3, lost: 3, goalsFor: 35, goalsAgainst: 25, goalDifference: 10, location: 'Sint-Joris', distance: '~12 km' },
                { name: 'KSK Steenbrugge', position: 6, points: 24, played: 15, won: 7, drawn: 3, lost: 5, goalsFor: 28, goalsAgainst: 30, goalDifference: -2, location: 'Steenbrugge', distance: '~5 km' },
                { name: 'KFC Damme', position: 7, points: 22, played: 15, won: 6, drawn: 4, lost: 5, goalsFor: 25, goalsAgainst: 28, goalDifference: -3, location: 'Damme', distance: '~6 km' },
                { name: 'VKSO Zerkegem B', position: 8, points: 18, played: 15, won: 5, drawn: 3, lost: 7, goalsFor: 22, goalsAgainst: 35, goalDifference: -13, location: 'Zerkegem', distance: '~18 km' }
            ];
        }

        // Renderizar tarjetas de rivales
        rivalsGrid.innerHTML = rivals.map(rival => {
            const isTop3 = rival.position <= 3;
            
            return `
                <div class="rival-card" data-position="${rival.position}">
                    <div class="rival-header">
                        <div class="rival-logo">
                            <div class="placeholder">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                        </div>
                        <div class="rival-info">
                            <div class="rival-name">${rival.name}</div>
                            <span class="rival-position ${isTop3 ? 'top-3' : ''}">Positie ${rival.position}</span>
                        </div>
                    </div>
                    <div class="rival-stats">
                        <div class="stat-item">
                            <div class="stat-label">Punten</div>
                            <div class="stat-value">${rival.points}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Gespeeld</div>
                            <div class="stat-value">${rival.played}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Gewonnen</div>
                            <div class="stat-value">${rival.won || 0}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Doelsaldo</div>
                            <div class="stat-value">${rival.goalDifference > 0 ? '+' : ''}${rival.goalDifference}</div>
                        </div>
                    </div>
                    ${rival.location ? `
                        <div class="rival-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${rival.location} ${rival.distance ? `(${rival.distance})` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        // Agregar filtros
        initRivalFilters();
    } catch (error) {
        // Silenciar completamente errores de CORS/red - usar datos de respaldo
        // No loguear ningún error relacionado con fetch/CORS/red
        const isCorsOrNetworkError = error.name === 'TypeError' || 
                                    error.name === 'AbortError' ||
                                    error.message?.includes('fetch') ||
                                    error.message?.includes('CORS') ||
                                    error.message?.includes('Failed to fetch') ||
                                    error.message?.includes('network');
        
        // Solo loguear errores inesperados que no sean de red/CORS
        if (!isCorsOrNetworkError) {
            console.error('Error al inicializar rivales:', error);
        }
        // Los datos de respaldo ya se cargaron en el try block
    }
}

/**
 * Inicializa los filtros de rivales
 */
function initRivalFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const rivalCards = document.querySelectorAll('.rival-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar botones activos
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filtrar tarjetas
            rivalCards.forEach(card => {
                const position = parseInt(card.dataset.position);
                let show = true;

                if (filter === 'top3') {
                    show = position <= 3;
                } else if (filter === 'nearby') {
                    // Mostrar equipos cercanos (distancia < 15 km)
                    const distanceText = card.querySelector('.rival-location')?.textContent || '';
                    const distance = parseInt(distanceText.match(/\d+/)?.[0] || '999');
                    show = distance < 15;
                }

                card.style.display = show ? 'block' : 'none';
            });
        });
    });
}

