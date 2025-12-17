// ============================================
// RIVAL TEAMS MANAGEMENT
// ============================================
// Gestión de información sobre equipos rivales en la misma liga

class RivalTeamsManager {
    constructor() {
        this.rivals = [];
        this.loadRivals();
    }

    /**
     * Carga la lista de equipos rivales desde la API o datos de respaldo
     */
    async loadRivals() {
        try {
            // Intentar obtener desde la API
            if (window.voetbalAPI) {
                const standings = await window.voetbalAPI.getStandings();
                if (standings && standings.standings) {
                    this.rivals = standings.standings
                        .filter(team => team.team !== 'RFC Lissewege')
                        .map(team => this.formatRivalTeam(team));
                    return;
                }
            }
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
                console.warn('Error al cargar rivales desde API:', error);
            }
        }

        // Usar datos de respaldo
        this.rivals = this.getFallbackRivals();
    }

    /**
     * Formatea la información de un equipo rival
     */
    formatRivalTeam(teamData) {
        return {
            name: teamData.team,
            position: teamData.position,
            points: teamData.points || 0,
            played: teamData.played || 0,
            won: teamData.won || 0,
            drawn: teamData.drawn || 0,
            lost: teamData.lost || 0,
            goalsFor: teamData.goalsFor || 0,
            goalsAgainst: teamData.goalsAgainst || 0,
            goalDifference: (teamData.goalsFor || 0) - (teamData.goalsAgainst || 0),
            logo: this.getTeamLogo(teamData.team),
            nextMatch: null // Se puede poblar con información de próximos partidos
        };
    }

    /**
     * Obtiene el logo de un equipo (o placeholder)
     */
    getTeamLogo(teamName) {
        // Intentar obtener logo desde imágenes locales
        const sanitizedName = teamName.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-');
        
        return `images/logos/teams/${sanitizedName}.png`;
    }

    /**
     * Datos de respaldo de equipos rivales en 4e Provinciale C
     */
    getFallbackRivals() {
        return [
            {
                name: 'KVV Aartrijke',
                position: 1,
                points: 38,
                played: 15,
                won: 12,
                drawn: 2,
                lost: 1,
                goalsFor: 45,
                goalsAgainst: 18,
                goalDifference: 27,
                logo: 'images/logos/teams/kvv-aartrijke.png',
                location: 'Aartrijke',
                distance: '~15 km'
            },
            {
                name: 'FC Zeebrugge',
                position: 2,
                points: 36,
                played: 15,
                won: 11,
                drawn: 3,
                lost: 1,
                goalsFor: 42,
                goalsAgainst: 20,
                goalDifference: 22,
                logo: 'images/logos/teams/fc-zeebrugge.png',
                location: 'Zeebrugge',
                distance: '~10 km'
            },
            {
                name: 'KSV Jabbeke',
                position: 3,
                points: 32,
                played: 15,
                won: 10,
                drawn: 2,
                lost: 3,
                goalsFor: 38,
                goalsAgainst: 22,
                goalDifference: 16,
                logo: 'images/logos/teams/ksv-jabbeke.png',
                location: 'Jabbeke',
                distance: '~8 km'
            },
            {
                name: 'KFC Sint-Joris',
                position: 4,
                points: 30,
                played: 15,
                won: 9,
                drawn: 3,
                lost: 3,
                goalsFor: 35,
                goalsAgainst: 25,
                goalDifference: 10,
                logo: 'images/logos/teams/kfc-sint-joris.png',
                location: 'Sint-Joris',
                distance: '~12 km'
            },
            {
                name: 'KSK Steenbrugge',
                position: 6,
                points: 24,
                played: 15,
                won: 7,
                drawn: 3,
                lost: 5,
                goalsFor: 28,
                goalsAgainst: 30,
                goalDifference: -2,
                logo: 'images/logos/teams/ksk-steenbrugge.png',
                location: 'Steenbrugge',
                distance: '~5 km'
            },
            {
                name: 'KFC Damme',
                position: 7,
                points: 22,
                played: 15,
                won: 6,
                drawn: 4,
                lost: 5,
                goalsFor: 25,
                goalsAgainst: 28,
                goalDifference: -3,
                logo: 'images/logos/teams/kfc-damme.png',
                location: 'Damme',
                distance: '~6 km'
            },
            {
                name: 'VKSO Zerkegem B',
                position: 8,
                points: 18,
                played: 15,
                won: 5,
                drawn: 3,
                lost: 7,
                goalsFor: 22,
                goalsAgainst: 35,
                goalDifference: -13,
                logo: 'images/logos/teams/vkso-zerkegem.png',
                location: 'Zerkegem',
                distance: '~18 km'
            }
        ];
    }

    /**
     * Obtiene los próximos enfrentamientos con rivales
     */
    async getUpcomingRivalMatches() {
        // Esto se puede integrar con la API de partidos
        return [
            {
                date: '2025-01-25',
                time: '15:00',
                home: 'RFC Lissewege',
                away: 'FC Zeebrugge',
                venue: 'home',
                competition: '4e Provinciale C'
            },
            {
                date: '2025-02-01',
                time: '15:00',
                home: 'KVV Aartrijke',
                away: 'RFC Lissewege',
                venue: 'away',
                competition: '4e Provinciale C'
            }
        ];
    }

    /**
     * Obtiene el historial de partidos con un rival específico
     */
    getMatchHistory(rivalName) {
        // Datos de ejemplo - en producción vendría de la API
        return [
            { date: '2024-10-15', home: 'RFC Lissewege', away: rivalName, score: '2-0', result: 'win' },
            { date: '2024-03-20', home: rivalName, away: 'RFC Lissewege', score: '1-3', result: 'win' },
            { date: '2023-11-10', home: 'RFC Lissewege', away: rivalName, score: '1-1', result: 'draw' }
        ];
    }
}

// Inicializar gestor de rivales
const rivalTeamsManager = new RivalTeamsManager();

// Exportar para uso global
window.rivalTeamsManager = rivalTeamsManager;

