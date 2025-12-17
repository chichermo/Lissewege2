// ============================================
// REAL FOOTBALL API INTEGRATION - BELGIUM LEAGUES
// ============================================

// Multiple API sources for redundancy
const API_CONFIG = {
    // API-Football (RapidAPI) - Free tier: 100 requests/day
    apiFootball: {
        baseUrl: 'https://api-football-v1.p.rapidapi.com/v3',
        key: '', // User needs to add their API key
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    },
    // Football-Data.org - Free tier: 10 requests/minute
    footballData: {
        baseUrl: 'https://api.football-data.org/v4',
        key: '', // User needs to add their API key
        headers: {
            'X-Auth-Token': ''
        }
    },
    // Logo services
    logos: {
        clearbit: 'https://logo.clearbit.com/',
        logoDev: 'https://logo.dev/',
        // Alternative: Use team logos from football-data.org or manual upload
        teamLogos: {}
    }
};

// Belgium League IDs (may vary by API)
const BELGIUM_LEAGUES = {
    // API-Football league IDs
    apiFootball: {
        proLeague: 144, // Belgian Pro League
        firstDivision: 145, // First Division A
        youth: null // Youth leagues may need specific IDs
    },
    // Football-Data.org league IDs
    footballData: {
        proLeague: 'BL1', // Belgian Pro League
        firstDivision: 'BL2' // First Division B
    }
};

class RealFootballAPI {
    constructor() {
        this.cache = {
            standings: null,
            matches: null,
            teams: null,
            lastUpdate: null
        };
        this.cacheDuration = 5 * 60 * 1000; // 5 minutes cache
    }

    // Get team logo from multiple sources
    async getTeamLogo(teamName, teamId = null) {
        // Try multiple logo sources
        const logoSources = [
            // From football-data.org if teamId available
            teamId ? `https://crests.football-data.org/${teamId}.png` : null,
            // From clearbit (domain-based)
            `https://logo.clearbit.com/${this.getTeamDomain(teamName)}.com`,
            // From local storage if available
            `images/logos/teams/${this.sanitizeTeamName(teamName)}.png`,
            `images/logos/teams/${this.sanitizeTeamName(teamName)}.jpg`
        ].filter(Boolean);

        for (const source of logoSources) {
            try {
                const response = await fetch(source, { method: 'HEAD' });
                if (response.ok) {
                    return source;
                }
            } catch (e) {
                continue;
            }
        }

        // Fallback to default logo
        return 'images/logos/100b.jpeg';
    }

    sanitizeTeamName(name) {
        return name.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    getTeamDomain(teamName) {
        // Convert team name to potential domain
        return this.sanitizeTeamName(teamName);
    }

    // Try API-Football first, fallback to Football-Data.org
    async fetchWithFallback(url, options = {}) {
        // Try API-Football if configured
        if (API_CONFIG.apiFootball.key) {
            try {
                const response = await fetch(`${API_CONFIG.apiFootball.baseUrl}${url}`, {
                    ...options,
                    headers: {
                        ...API_CONFIG.apiFootball.headers,
                        ...options.headers
                    }
                });
                if (response.ok) {
                    return await response.json();
                }
            } catch (error) {
                // Silently continue to next API - don't log expected failures
            }
        }

        // Fallback to Football-Data.org
        if (API_CONFIG.footballData.key) {
            try {
                const response = await fetch(`${API_CONFIG.footballData.baseUrl}${url}`, {
                    ...options,
                    headers: {
                        ...API_CONFIG.footballData.headers,
                        ...options.headers
                    }
                });
                if (response.ok) {
                    return await response.json();
                }
            } catch (error) {
                // Silently continue - fallback data will be used
            }
        }

        // Silently return null instead of throwing - fallback data will be used
        return null;
    }

    // Get league standings from real API
    async getLeagueStandings(leagueId = null) {
        // Check cache
        if (this.cache.standings && Date.now() - this.cache.lastUpdate < this.cacheDuration) {
            return this.cache.standings;
        }

        try {
            // Try to get standings from API
            // Note: This requires API keys to be configured
            const data = await this.fetchWithFallback(`/competitions/${leagueId || BELGIUM_LEAGUES.footballData.proLeague}/standings`);

            if (data && data.standings && data.standings[0]) {
                const standings = data.standings[0].table.map((team, index) => ({
                    position: team.position,
                    team: team.team.name,
                    teamId: team.team.id,
                    played: team.playedGames,
                    won: team.won,
                    drawn: team.draw,
                    lost: team.lost,
                    goalsFor: team.goalsFor,
                    goalsAgainst: team.goalsAgainst,
                    goalDifference: team.goalDifference,
                    points: team.points
                }));

                this.cache.standings = standings;
                this.cache.lastUpdate = Date.now();
                return standings;
            }
        } catch (error) {
            // Silently use fallback - API unavailable is expected when no keys configured
        }

        // Fallback: Return null to indicate API unavailable
        return null;
    }

    // Get upcoming matches from real API
    async getUpcomingMatches(teamId = null, count = 10) {
        try {
            let url = '';
            if (teamId) {
                url = `/teams/${teamId}/matches?status=SCHEDULED&limit=${count}`;
            } else {
                url = `/competitions/${BELGIUM_LEAGUES.footballData.proLeague}/matches?status=SCHEDULED&limit=${count}`;
            }

            const data = await this.fetchWithFallback(url);

            if (data && data.matches) {
                return data.matches.map(match => ({
                    id: match.id,
                    date: match.utcDate.split('T')[0],
                    time: new Date(match.utcDate).toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' }),
                    homeTeam: match.homeTeam.name,
                    homeTeamId: match.homeTeam.id,
                    awayTeam: match.awayTeam.name,
                    awayTeamId: match.awayTeam.id,
                    competition: match.competition.name,
                    venue: match.homeTeam.id === teamId ? 'home' : 'away'
                }));
            }
        } catch (error) {
            // Silently use fallback - API unavailable is expected when no keys configured
        }

        return null;
    }

    // Get team information
    async getTeamInfo(teamId) {
        try {
            const data = await this.fetchWithFallback(`/teams/${teamId}`);
            if (data) {
                return {
                    id: data.id,
                    name: data.name,
                    shortName: data.shortName,
                    logo: data.crest || await this.getTeamLogo(data.name, data.id),
                    address: data.address,
                    website: data.website,
                    founded: data.founded,
                    venue: data.venue
                };
            }
        } catch (error) {
            console.warn('Could not fetch team info:', error);
        }

        return null;
    }
}

// Initialize API
const realFootballAPI = new RealFootballAPI();

// Export for configuration
window.API_CONFIG = API_CONFIG;
window.realFootballAPI = realFootballAPI;

