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

// Actualizar configuración en football-api-real.js
if (typeof API_CONFIG !== 'undefined') {
    if (API_KEYS.apiFootball.key) {
        API_CONFIG.apiFootball.key = API_KEYS.apiFootball.key;
        API_CONFIG.apiFootball.headers['X-RapidAPI-Key'] = API_KEYS.apiFootball.key;
        API_CONFIG.apiFootball.headers['X-RapidAPI-Host'] = API_KEYS.apiFootball.host;
    }
    
    if (API_KEYS.footballData.token) {
        API_CONFIG.footballData.key = API_KEYS.footballData.token;
        API_CONFIG.footballData.headers['X-Auth-Token'] = API_KEYS.footballData.token;
    }
}

// Export
window.API_KEYS = API_KEYS;

