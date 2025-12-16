// ============================================
// LINEUP API MOCK
// ============================================
// Lokale mock API voor opstellingen - werkt zonder externe credentials

class LineupAPIMock {
    constructor() {
        this.baseUrl = 'mock://api.alineaciones.local';
        this.storageKey = 'lineup_api_mock_data';
        this.enabled = true; // Altijd actief, geen credentials nodig
        this.init();
    }

    /**
     * Initialiseert de mock API
     */
    init() {
        console.log('Lineup Mock API geïnitialiseerd - Geen externe credentials nodig');
        this.ensureStorage();
    }

    /**
     * Zorgt dat storage bestaat
     */
    ensureStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify({
                lineups: [],
                teams: [],
                players: [],
                lastSync: null
            }));
        }
    }

    /**
     * Haalt alle opstellingen op
     */
    async getLineups(teamId = null) {
        const data = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        let lineups = data.lineups || [];

        if (teamId) {
            lineups = lineups.filter(l => l.team === teamId);
        }

        // Simuleer API delay
        await this.delay(200);

        return {
            success: true,
            data: lineups,
            count: lineups.length
        };
    }

    /**
     * Haalt een specifieke opstelling op
     */
    async getLineup(lineupId) {
        const data = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        const lineup = (data.lineups || []).find(l => l.id === lineupId);

        await this.delay(150);

        if (lineup) {
            return {
                success: true,
                data: lineup
            };
        } else {
            return {
                success: false,
                error: 'Opstelling niet gevonden'
            };
        }
    }

    /**
     * Maakt een nieuwe opstelling
     */
    async createLineup(lineupData) {
        const data = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        
        const newLineup = {
            id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            ...lineupData,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            version: 1
        };

        data.lineups = data.lineups || [];
        data.lineups.push(newLineup);
        data.lastSync = new Date().toISOString();

        localStorage.setItem(this.storageKey, JSON.stringify(data));

        await this.delay(300);

        return {
            success: true,
            data: newLineup,
            message: 'Opstelling succesvol aangemaakt'
        };
    }

    /**
     * Werkt een opstelling bij
     */
    async updateLineup(lineupId, updates) {
        const data = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        const lineupIndex = (data.lineups || []).findIndex(l => l.id === lineupId);

        if (lineupIndex === -1) {
            return {
                success: false,
                error: 'Opstelling niet gevonden'
            };
        }

        data.lineups[lineupIndex] = {
            ...data.lineups[lineupIndex],
            ...updates,
            updated: new Date().toISOString(),
            version: (data.lineups[lineupIndex].version || 1) + 1
        };

        localStorage.setItem(this.storageKey, JSON.stringify(data));

        await this.delay(250);

        return {
            success: true,
            data: data.lineups[lineupIndex],
            message: 'Opstelling bijgewerkt'
        };
    }

    /**
     * Verwijdert een opstelling
     */
    async deleteLineup(lineupId) {
        const data = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        data.lineups = (data.lineups || []).filter(l => l.id !== lineupId);
        data.lastSync = new Date().toISOString();

        localStorage.setItem(this.storageKey, JSON.stringify(data));

        await this.delay(200);

        return {
            success: true,
            message: 'Opstelling verwijderd'
        };
    }

    /**
     * Deelt een opstelling (genereert share link)
     */
    async shareLineup(lineupId) {
        const result = await this.getLineup(lineupId);
        
        if (!result.success) {
            return result;
        }

        // Genereer een share token
        const shareToken = `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Sla share token op
        const data = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        data.shares = data.shares || {};
        data.shares[shareToken] = {
            lineupId: lineupId,
            created: new Date().toISOString(),
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 dagen
        };
        localStorage.setItem(this.storageKey, JSON.stringify(data));

        await this.delay(150);

        const shareUrl = `${window.location.origin}${window.location.pathname}#lineup/${shareToken}`;

        return {
            success: true,
            data: {
                shareToken,
                shareUrl,
                expires: data.shares[shareToken].expires
            },
            message: 'Deel link gegenereerd'
        };
    }

    /**
     * Exporteert opstelling naar JSON
     */
    async exportLineup(lineupId, format = 'json') {
        const result = await this.getLineup(lineupId);
        
        if (!result.success) {
            return result;
        }

        const lineup = result.data;

        if (format === 'json') {
            const json = JSON.stringify(lineup, null, 2);
            return {
                success: true,
                data: json,
                format: 'json',
                filename: `opstelling_${lineupId}.json`
            };
        } else if (format === 'csv') {
            // Converteer naar CSV formaat
            const csv = this.convertToCSV(lineup);
            return {
                success: true,
                data: csv,
                format: 'csv',
                filename: `opstelling_${lineupId}.csv`
            };
        }

        return {
            success: false,
            error: 'Formaat niet ondersteund'
        };
    }

    /**
     * Importeert opstelling van JSON
     */
    async importLineup(jsonData) {
        try {
            const lineupData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            
            // Valideer basis structuur
            if (!lineupData.formation || !lineupData.players) {
                return {
                    success: false,
                    error: 'Ongeldig opstelling formaat'
                };
            }

            // Maak nieuwe opstelling
            return await this.createLineup(lineupData);
        } catch (error) {
            return {
                success: false,
                error: 'Fout bij importeren: ' + error.message
            };
        }
    }

    /**
     * Converteert opstelling naar CSV
     */
    convertToCSV(lineup) {
        const headers = ['Positie', 'Speler ID', 'Speler Naam', 'Formatie'];
        const rows = [headers.join(',')];

        lineup.players.forEach((player, index) => {
            rows.push([
                index + 1,
                player.id || '',
                player.name || '',
                lineup.formation || ''
            ].join(','));
        });

        return rows.join('\n');
    }

    /**
     * Simuleert API delay
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Haalt statistieken op
     */
    async getStats(teamId = null) {
        const data = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        let lineups = data.lineups || [];

        if (teamId) {
            lineups = lineups.filter(l => l.team === teamId);
        }

        const stats = {
            total: lineups.length,
            byFormation: {},
            recent: lineups
                .sort((a, b) => new Date(b.created) - new Date(a.created))
                .slice(0, 5),
            lastSync: data.lastSync
        };

        lineups.forEach(lineup => {
            const formation = lineup.formation || 'unknown';
            stats.byFormation[formation] = (stats.byFormation[formation] || 0) + 1;
        });

        await this.delay(100);

        return {
            success: true,
            data: stats
        };
    }

    /**
     * Synchroniseert alle data (simulatie)
     */
    async sync() {
        const data = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        
        // Simuleer sync proces
        await this.delay(500);

        data.lastSync = new Date().toISOString();
        localStorage.setItem(this.storageKey, JSON.stringify(data));

        return {
            success: true,
            data: {
                synced: data.lineups?.length || 0,
                timestamp: data.lastSync
            },
            message: 'Synchronisatie voltooid'
        };
    }
}

// Maak globale instantie
window.lineupAPIMock = new LineupAPIMock();

