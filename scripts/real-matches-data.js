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
    { date: '2025-12-07', homeTeam: 'RFC Lissewege', awayTeam: 'KVV Aartrijke', score: '2-4', venue: 'home' },
    { date: '2025-12-13', homeTeam: 'RFC Lissewege', awayTeam: 'FC Zeebrugge', score: '2-0', venue: 'home' }
];

// Próximos partidos
const UPCOMING_MATCHES = [
    { date: '2026-01-18', time: '15:00', homeTeam: 'RFC Lissewege', awayTeam: 'VKSO Zerkegem B', venue: 'home' },
    { date: '2026-01-25', time: '14:30', homeTeam: 'KSK Steenbrugge', awayTeam: 'RFC Lissewege', venue: 'away' },
    { date: '2026-02-01', time: '15:00', homeTeam: 'RFC Lissewege', awayTeam: 'KFC Heist B', venue: 'home' },
    { date: '2026-02-07', time: '19:30', homeTeam: 'KSV Bredene B', awayTeam: 'RFC Lissewege', venue: 'away' },
    { date: '2026-03-01', time: '15:00', homeTeam: 'RFC Lissewege', awayTeam: 'KFC Sint-Joris Sportief', venue: 'home' },
    { date: '2026-03-07', time: '19:30', homeTeam: 'K. Excelsior Zedelgem B', awayTeam: 'RFC Lissewege', venue: 'away' },
    { date: '2026-03-14', time: '15:00', homeTeam: 'RFC Lissewege', awayTeam: 'VC Vamos Zandvoorde', venue: 'home' },
    { date: '2026-03-22', time: '15:00', homeTeam: 'KFC Damme', awayTeam: 'RFC Lissewege', venue: 'away' },
    { date: '2026-03-29', time: '15:00', homeTeam: 'RFC Lissewege', awayTeam: 'VVC Beernem B', venue: 'home' },
    { date: '2026-04-12', time: '15:00', homeTeam: 'VV Eendracht Brugge', awayTeam: 'RFC Lissewege', venue: 'away' },
    { date: '2026-04-19', time: '15:00', homeTeam: 'RFC Lissewege', awayTeam: 'KSKD Hertsberge', venue: 'home' },
    { date: '2026-04-26', time: '15:00', homeTeam: 'KVV Aartrijke', awayTeam: 'RFC Lissewege', venue: 'away' }
];

// Información de equipos para logos
const TEAM_INFO = {
    'RFC Lissewege': { logo: 'images/logos/teams/rfc-lissewege.webp', address: 'Pol Dhondtstraat 70, 8380 Lissewege' },
    'KVV Aartrijke': { logo: 'images/logos/teams/kvv-aartrijke.webp', address: 'KVV Aartrijke Stadion' },
    'KFC Damme': { logo: 'images/logos/teams/kfc-damme.webp', address: 'KFC Damme Stadion' },
    'VV Eendracht Brugge': { logo: 'images/logos/teams/vv-eendracht-brugge.webp', address: 'VV Eendracht Brugge Stadion' },
    'KSK Steenbrugge': { logo: 'images/logos/teams/ksk-steenbrugge.webp', address: 'KSK Steenbrugge Stadion' },
    'KFC Sint-Joris Sportief': { logo: 'images/logos/teams/kfc-sint-joris-sportief.webp', address: 'KFC Sint-Joris Sportief Stadion' },
    'K. Excelsior Zedelgem B': { logo: 'images/logos/teams/k-excelsior-zedelgem-b.webp', address: 'Excelsior Zedelgem Stadion' },
    'KSKD Hertsberge': { logo: 'images/logos/teams/kskd-hertsberge.webp', address: 'KSKD Hertsberge Stadion' },
    'VVC Beernem B': { logo: 'images/logos/teams/vvc-beernem-b.webp', address: 'VVC Beernem Stadion' },
    'VKSO Zerkegem B': { logo: 'images/logos/teams/vkso-zerkegem-b.webp', address: 'VKSO Zerkegem Stadion' },
    'KFC Heist B': { logo: 'images/logos/teams/kfc-heist-b.webp', address: 'KFC Heist Stadion' },
    'FC Zeebrugge': { logo: 'images/logos/teams/fc-zeebrugge.webp', address: 'FC Zeebrugge Stadion' },
    'KSV Bredene B': { logo: 'images/logos/teams/ksv-bredene-b.webp', address: 'KSV Bredene Stadion' },
    'VC Vamos Zandvoorde': { logo: 'images/logos/teams/vc-vamos-zandvoorde.webp', address: 'VC Vamos Zandvoorde Stadion' }
};

// Export
window.PAST_MATCHES = PAST_MATCHES;
window.UPCOMING_MATCHES = UPCOMING_MATCHES;
window.TEAM_INFO = TEAM_INFO;

