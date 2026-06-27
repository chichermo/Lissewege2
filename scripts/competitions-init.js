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
        if (!standingsData || !standingsData.standings || standingsData.standings.length === 0) {
            standingsContent.innerHTML = `
                <div class="standings-empty">
                    <i class="fas fa-hourglass-half"></i>
                    <p>Seizoen 2026/2027 — nog geen officiële stand</p>
                    <p>RFC Lissewege speelt in de 4e Provinciale C. Punten en posities verschijnen hier zodra de competitie is gestart.</p>
                </div>
            `;
            return;
        }

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
                { name: 'KVV Aartrijke', location: 'Aartrijke', distance: '~15 km' },
                { name: 'FC Zeebrugge', location: 'Zeebrugge', distance: '~10 km' },
                { name: 'KSV Jabbeke', location: 'Jabbeke', distance: '~8 km' },
                { name: 'KFC Sint-Joris Sportief', location: 'Sint-Joris', distance: '~12 km' },
                { name: 'KSK Steenbrugge', location: 'Steenbrugge', distance: '~5 km' },
                { name: 'KFC Damme', location: 'Damme', distance: '~6 km' },
                { name: 'VKSO Zerkegem B', location: 'Zerkegem', distance: '~18 km' },
                { name: 'VV Eendracht Brugge', location: 'Brugge', distance: '~12 km' }
            ];
        }

        // Renderizar tarjetas de rivales
        rivalsGrid.innerHTML = rivals.map(rival => {
            const isTop3 = rival.position && rival.position <= 3;
            const logo = window.getTeamLogo
                ? window.getTeamLogo(rival.name)
                : (window.generatePlaceholderLogo ? window.generatePlaceholderLogo(rival.name) : '');
            const safeName = rival.name.replace(/'/g, "\\'");
            const positionLabel = rival.position ? `Positie ${rival.position}` : '4e Prov C';
            const points = rival.points != null ? rival.points : '—';
            const played = rival.played != null ? rival.played : '—';
            const won = rival.won != null ? rival.won : '—';
            const goalDiff = rival.goalDifference != null
                ? `${rival.goalDifference > 0 ? '+' : ''}${rival.goalDifference}`
                : '—';
            
            return `
                <div class="rival-card" data-position="${rival.position || 0}">
                    <div class="rival-header">
                        <div class="rival-logo">
                            <img src="${logo}" alt="${rival.name}" width="44" height="44" loading="lazy" decoding="async" onerror="if(window.generatePlaceholderLogo){this.src=window.generatePlaceholderLogo('${safeName}');this.onerror=null;}">
                        </div>
                        <div class="rival-info">
                            <div class="rival-name">${rival.name}</div>
                            <span class="rival-position ${isTop3 ? 'top-3' : ''}">${positionLabel}</span>
                        </div>
                    </div>
                    <div class="rival-stats">
                        <div class="stat-item">
                            <div class="stat-label">Punten</div>
                            <div class="stat-value">${points}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Gespeeld</div>
                            <div class="stat-value">${played}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Gewonnen</div>
                            <div class="stat-value">${won}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Doelsaldo</div>
                            <div class="stat-value">${goalDiff}</div>
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

