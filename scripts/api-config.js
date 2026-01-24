// ============================================
// API CONFIGURATION FILE
// ============================================
// IMPORTANTE: Agrega tus API keys aquí para activar las APIs reales
// IMPORTANT: Add your API keys here to enable real APIs

const API_KEYS = {
    // API-Football (RapidAPI)
    // Obtén tu key en: https://rapidapi.com/api-sports/api/api-football
    apiFootball: {
        key: '', // Tu X-RapidAPI-Key aquí
        host: 'api-football-v1.p.rapidapi.com'
    },
    
    // Football-Data.org
    // Obtén tu token en: https://www.football-data.org/register
    footballData: {
        token: '' // Tu X-Auth-Token aquí
    }
};

const APP_CONFIG = {
    team: {
        name: 'RFC Lissewege'
    },
    teamIds: {
        footballData: '', // ID de equipo si usas Football-Data.org
        apiFootball: 19643 // ID de equipo si usas API-Football
    },
    leagueIds: {
        apiFootball: 161 // ID de liga en API-Football (Provincial - West-Vlaanderen)
    },
    seasons: {
        apiFootball: 2024 // Temporada (2024 = 2024/2025)
    },
    refreshIntervals: {
        matches: 10 * 60 * 1000,
        standings: 15 * 60 * 1000,
        squad: 60 * 60 * 1000
    }
};

// Guardar keys para aplicarlas cuando la API real esté disponible
window.API_KEYS = API_KEYS;
window.APP_CONFIG = APP_CONFIG;
window.API_CONFIG_OVERRIDE = API_KEYS;

// Actualizar configuración si ya está cargada
if (typeof window.API_CONFIG !== 'undefined') {
    if (API_KEYS.apiFootball.key) {
        window.API_CONFIG.apiFootball.key = API_KEYS.apiFootball.key;
        window.API_CONFIG.apiFootball.headers['X-RapidAPI-Key'] = API_KEYS.apiFootball.key;
        window.API_CONFIG.apiFootball.headers['X-RapidAPI-Host'] = API_KEYS.apiFootball.host;
    }
    
    if (API_KEYS.footballData.token) {
        window.API_CONFIG.footballData.key = API_KEYS.footballData.token;
        window.API_CONFIG.footballData.headers['X-Auth-Token'] = API_KEYS.footballData.token;
    }
}

// Export
window.API_KEYS = API_KEYS;

