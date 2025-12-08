// ============================================
// REAL MATCHES DATA - RFC Lissewege
// 4e Provinciale C West-Vlaanderen 2025/2026
// ============================================

// Resultados pasados (actualizado al 7/12/2025)
const PAST_MATCHES = [
    { date: '2025-08-31', homeTeam: 'RFC Lissewege', awayTeam: 'KFC Damme', score: '3-1', venue: 'home' },
    { date: '2025-09-07', homeTeam: 'FC Zeebrugge', awayTeam: 'RFC Lissewege', score: '2-4', venue: 'away' },
    { date: '2025-09-14', homeTeam: 'RFC Lissewege', awayTeam: 'VV Eendracht Brugge', score: '2-2', venue: 'home' },
    { date: '2025-09-20', homeTeam: 'VKSO Zerkegem B', awayTeam: 'RFC Lissewege', score: '3-2', venue: 'away' },
    { date: '2025-09-28', homeTeam: 'RFC Lissewege', awayTeam: 'KSV Bredene B', score: '5-1', venue: 'home' },
    { date: '2025-10-05', homeTeam: 'VVC Beernem B', awayTeam: 'RFC Lissewege', score: '2-1', venue: 'away' },
    { date: '2025-10-11', homeTeam: 'KFC Heist B', awayTeam: 'RFC Lissewege', score: '0-6', venue: 'away' },
    { date: '2025-10-19', homeTeam: 'RFC Lissewege', awayTeam: 'KSK Steenbrugge', score: '2-0', venue: 'home' },
    { date: '2025-11-02', homeTeam: 'VC Vamos Zandvoorde', awayTeam: 'RFC Lissewege', score: '1-6', venue: 'away' },
    { date: '2025-11-09', homeTeam: 'RFC Lissewege', awayTeam: 'K. Excelsior Zedelgem B', score: '5-2', venue: 'home' },
    { date: '2025-11-15', homeTeam: 'KSKD Hertsberge', awayTeam: 'RFC Lissewege', score: '1-1', venue: 'away' },
    { date: '2025-11-30', homeTeam: 'KFC Sint-Joris Sportief', awayTeam: 'RFC Lissewege', score: '3-2', venue: 'away' },
    { date: '2025-12-07', homeTeam: 'RFC Lissewege', awayTeam: 'KVV Aartrijke', score: '2-4', venue: 'home' }
];

// Próximos partidos
const UPCOMING_MATCHES = [
    { date: '2025-12-13', time: '19:00', homeTeam: 'RFC Lissewege', awayTeam: 'FC Zeebrugge', venue: 'home' },
    { date: '2026-01-18', time: '15:00', homeTeam: 'RFC Lissewege', awayTeam: 'VKSO Zerkegem B', venue: 'home' },
    { date: '2026-01-25', time: '14:30', homeTeam: 'KSK Steenbrugge', awayTeam: 'RFC Lissewege', venue: 'away' },
    { date: '2026-02-01', time: '15:00', homeTeam: 'RFC Lissewege', awayTeam: 'KFC Heist B', venue: 'home' },
    { date: '2026-02-07', time: '19:30', homeTeam: 'KSV Bredene B', awayTeam: 'RFC Lissewege', venue: 'away' },
    { date: '2026-02-15', time: '15:00', homeTeam: 'RFC Lissewege', awayTeam: 'VVC Beernem B', venue: 'home' },
    { date: '2026-02-22', time: '15:00', homeTeam: 'KVV Aartrijke', awayTeam: 'RFC Lissewege', venue: 'away' },
    { date: '2026-03-01', time: '15:00', homeTeam: 'RFC Lissewege', awayTeam: 'KFC Damme', venue: 'home' }
];

// Información de equipos para logos
const TEAM_INFO = {
    'RFC Lissewege': { logo: '/images/logos/100b.jpeg', address: 'Pol Dhondtstraat 70, 8380 Lissewege' },
    'KVV Aartrijke': { logo: null, address: 'KVV Aartrijke Stadion' },
    'KFC Damme': { logo: null, address: 'KFC Damme Stadion' },
    'VV Eendracht Brugge': { logo: null, address: 'VV Eendracht Brugge Stadion' },
    'KSK Steenbrugge': { logo: null, address: 'KSK Steenbrugge Stadion' },
    'KFC Sint-Joris Sportief': { logo: null, address: 'KFC Sint-Joris Sportief Stadion' },
    'K. Excelsior Zedelgem B': { logo: null, address: 'Excelsior Zedelgem Stadion' },
    'KSKD Hertsberge': { logo: null, address: 'KSKD Hertsberge Stadion' },
    'VVC Beernem B': { logo: null, address: 'VVC Beernem Stadion' },
    'VKSO Zerkegem B': { logo: null, address: 'VKSO Zerkegem Stadion' },
    'KFC Heist B': { logo: null, address: 'KFC Heist Stadion' },
    'FC Zeebrugge': { logo: null, address: 'FC Zeebrugge Stadion' },
    'KSV Bredene B': { logo: null, address: 'KSV Bredene Stadion' },
    'VC Vamos Zandvoorde': { logo: null, address: 'VC Vamos Zandvoorde Stadion' }
};

// Export
window.PAST_MATCHES = PAST_MATCHES;
window.UPCOMING_MATCHES = UPCOMING_MATCHES;
window.TEAM_INFO = TEAM_INFO;

