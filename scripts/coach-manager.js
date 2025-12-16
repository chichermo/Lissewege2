// ============================================
// COACH MANAGEMENT SYSTEM
// ============================================
// Systeem voor trainers: communicatie, selecties, opstellingen

class CoachManager {
    constructor() {
        this.selectedTeam = null;
        this.lineupAPI = {
            baseUrl: 'https://api.alineaciones.es',
            enabled: false // Activeren wanneer API toegang beschikbaar is
        };
        this.init();
    }

    init() {
        this.initTeamSelector();
        this.initAnnouncements();
        this.initSquadList();
        this.initLineupBuilder();
        this.initCommunication();
    }

    /**
     * Initialiseert de team selector
     */
    initTeamSelector() {
        const teamSelector = document.getElementById('coachTeamSelector');
        if (teamSelector) {
            teamSelector.addEventListener('change', (e) => {
                this.selectedTeam = e.target.value;
                this.loadTeamData(this.selectedTeam);
            });
        }
    }

    /**
     * Laadt gegevens van het geselecteerde team
     */
    loadTeamData(teamId) {
        // Laad spelers van het team
        this.loadTeamPlayers(teamId);
        // Laad communicaties (indien geïmplementeerd)
        // this.loadTeamCommunications(teamId);
        // Laad opgeslagen opstellingen (indien geïmplementeerd)
        // this.loadSavedLineups(teamId);
    }

    /**
     * Laadt de spelers van het team
     */
    loadTeamPlayers(teamId) {
        // Hier zou integratie zijn met de spelers database
        const players = this.getTeamPlayers(teamId);
        this.renderPlayersList(players);
        
        // Ook renderen in de spelers sectie van de trainer
        const coachPlayersList = document.querySelector('#coach-players .players-management-list');
        if (coachPlayersList) {
            this.renderPlayersList(players, coachPlayersList);
        }
    }

    /**
     * Haalt spelers van een team op (voorbeeldgegevens)
     */
    getTeamPlayers(teamId) {
        // In productie zou dit van een API of database komen
        return [
            { id: 1, name: 'Speler 1', position: 'Doelman', age: 12, parentContact: 'ouder1@email.com' },
            { id: 2, name: 'Speler 2', position: 'Verdediger', age: 13, parentContact: 'ouder2@email.com' },
            { id: 3, name: 'Speler 3', position: 'Middenvelder', age: 12, parentContact: 'ouder3@email.com' },
            { id: 4, name: 'Speler 4', position: 'Aanvaller', age: 13, parentContact: 'ouder4@email.com' }
        ];
    }

    /**
     * Rendert de spelerslijst
     */
    renderPlayersList(players, container = null) {
        if (!container) {
            container = document.getElementById('teamPlayersList');
        }
        if (!container) return;

        container.innerHTML = players.map(player => `
            <div class="player-item" data-player-id="${player.id}">
                <div class="player-info">
                    <span class="player-name">${player.name}</span>
                    <span class="player-position">${player.position}</span>
                    <span class="player-age">${player.age} jaar</span>
                </div>
                <div class="player-actions">
                                    <button class="btn-icon" onclick="coachManager.selectPlayer(${player.id})" title="Selecteren">
                                        <i class="fas fa-check"></i>
                                    </button>
                                    <button class="btn-icon" onclick="coachManager.messagePlayer(${player.id})" title="Bericht">
                                        <i class="fas fa-envelope"></i>
                                    </button>
                                    ${player.age < 18 ? `
                                        <button class="btn-icon" onclick="coachManager.messageParent('${player.parentContact}')" title="Contact Ouder/Voogd">
                                            <i class="fas fa-user-friends"></i>
                                        </button>
                                    ` : ''}
                                </div>
            </div>
        `).join('');
    }

    /**
     * Initialiseert het aankondigingssysteem
     */
    initAnnouncements() {
        const form = document.getElementById('announcementForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.createAnnouncement();
            });
        }
    }

    /**
     * Maakt een nieuwe aankondiging
     */
    createAnnouncement() {
        const titleEl = document.getElementById('announcementTitle');
        const contentEl = document.getElementById('announcementContent');
        const targetEl = document.getElementById('announcementTarget');
        const urgentEl = document.getElementById('announcementUrgent');
        
        const title = titleEl?.value;
        const content = contentEl?.value;
        const target = targetEl?.value || 'all';
        const urgent = urgentEl?.checked || false;

        if (!title || !content) {
            alert('Vul alle velden in');
            return;
        }

        const announcement = {
            id: Date.now(),
            title,
            content,
            target,
            urgent,
            date: new Date().toISOString(),
            team: this.selectedTeam
        };

        this.saveAnnouncement(announcement);
        this.displayAnnouncement(announcement);
        
        // Formulier legen
        const form = document.getElementById('announcementForm');
        if (form) {
            form.reset();
        }
    }

    /**
     * Slaat een aankondiging op
     */
    saveAnnouncement(announcement) {
        // In productie zou dit in een database worden opgeslagen
        const announcements = JSON.parse(localStorage.getItem('coach_announcements') || '[]');
        announcements.push(announcement);
        localStorage.setItem('coach_announcements', JSON.stringify(announcements));
    }

    /**
     * Toont een aankondiging in de lijst
     */
    displayAnnouncement(announcement) {
        const container = document.getElementById('announcementsList');
        if (!container) return;

        const announcementEl = document.createElement('div');
        announcementEl.className = `announcement-item ${announcement.urgent ? 'urgent' : ''}`;
        announcementEl.innerHTML = `
            <div class="announcement-header">
                <h4>${announcement.title}</h4>
                <span class="announcement-date">${new Date(announcement.date).toLocaleDateString('nl-BE')}</span>
            </div>
            <div class="announcement-content">${announcement.content}</div>
            <div class="announcement-target">Voor: ${announcement.target === 'all' ? 'Alle spelers' : announcement.target === 'team' ? 'Geselecteerd team' : announcement.target === 'parents' ? 'Ouders/Voogden' : 'Spelers'}</div>
            <div class="announcement-actions">
                <button onclick="coachManager.editAnnouncement(${announcement.id})">Bewerken</button>
                <button onclick="coachManager.deleteAnnouncement(${announcement.id})">Verwijderen</button>
            </div>
        `;
        container.insertBefore(announcementEl, container.firstChild);
    }

    /**
     * Initialiseert de selectie lijst
     */
    initSquadList() {
        const form = document.getElementById('squadForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.createSquadList();
            });
        }
    }

    /**
     * Maakt een selectie lijst
     */
    createSquadList() {
        const matchDateEl = document.getElementById('squadMatchDate');
        const matchTimeEl = document.getElementById('squadMatchTime');
        const opponentEl = document.getElementById('squadOpponent');
        
        const matchDate = matchDateEl?.value;
        const matchTime = matchTimeEl?.value;
        const opponent = opponentEl?.value;
        const selectedPlayers = Array.from(document.querySelectorAll('.player-item.selected'))
            .map(el => el.dataset.playerId);

        if (!matchDate || !matchTime || selectedPlayers.length === 0) {
            alert('Vul alle velden in en selecteer ten minste één speler');
            return;
        }

        const squad = {
            id: Date.now(),
            matchDate,
            matchTime,
            opponent,
            players: selectedPlayers,
            team: this.selectedTeam,
            created: new Date().toISOString()
        };

        this.saveSquadList(squad);
        this.displaySquadList(squad);
    }

    /**
     * Slaat een selectie lijst op
     */
    saveSquadList(squad) {
        const squads = JSON.parse(localStorage.getItem('coach_squads') || '[]');
        squads.push(squad);
        localStorage.setItem('coach_squads', JSON.stringify(squads));
    }

    /**
     * Toont een selectie lijst
     */
    displaySquadList(squad) {
        const container = document.getElementById('squadsList');
        if (!container) return;

        const squadEl = document.createElement('div');
        squadEl.className = 'squad-item';
        squadEl.innerHTML = `
            <div class="squad-header">
                <h4>${squad.opponent}</h4>
                <span>${new Date(squad.matchDate).toLocaleDateString('nl-BE')} ${squad.matchTime}</span>
            </div>
            <div class="squad-players-count">${squad.players.length} spelers geselecteerd</div>
            <div class="squad-actions">
                <button onclick="coachManager.viewSquad(${squad.id})">Bekijken</button>
                <button onclick="coachManager.shareSquad(${squad.id})">Delen</button>
            </div>
        `;
        container.insertBefore(squadEl, container.firstChild);
    }

    /**
     * Inicializa el constructor de formaciones
     */
    initLineupBuilder() {
        // Integración con API de alineaciones.es
        this.initLineupAPI();
    }

    /**
     * Initialiseert de verbinding met de opstelling API
     */
    async initLineupAPI() {
        // Controleer of er al een API key is opgeslagen
        const savedApiKey = localStorage.getItem('alineaciones_api_key');
        const apiEnabled = localStorage.getItem('alineaciones_api_enabled') === 'true';

        if (savedApiKey && apiEnabled) {
            this.lineupAPI.enabled = true;
            this.lineupAPI.key = savedApiKey;
            console.log('Lineup API geïnitialiseerd met opgeslagen referenties');
            return;
        }

        // Als er geen API key is, gebruik demo modus automatisch
        if (!this.lineupAPI.enabled) {
            console.log('Lineup API niet geconfigureerd. Demo modus gebruiken.');
            this.initDemoLineupBuilder();
            
            // Optioneel: vraag eenmalig of gebruiker API wil configureren
            // Dit gebeurt alleen als er nog geen voorkeur is opgeslagen
            const hasAskedBefore = localStorage.getItem('alineaciones_api_asked');
            if (!hasAskedBefore) {
                const enable = confirm('Wil je de alineaciones.es API configureren?\n\nJe kunt dit later ook doen via de instellingen.\n\nKlik "Annuleren" om demo modus te gebruiken.');
                localStorage.setItem('alineaciones_api_asked', 'true');
                
                if (enable) {
                    this.configureAPI();
                }
            }
            return;
        }

        try {
            // Hier zou de verbinding met de echte API worden gemaakt
            // Voorbeeld: const response = await fetch(`${this.lineupAPI.baseUrl}/teams/${teamId}`, {
            //     headers: { 'Authorization': `Bearer ${this.lineupAPI.key}` }
            // });
            console.log('Lineup API geïnitialiseerd');
        } catch (error) {
            console.warn('Fout bij verbinden met Lineup API:', error);
            this.initDemoLineupBuilder();
        }
    }

    /**
     * Configureert de API referenties
     */
    configureAPI() {
        const apiKey = prompt('Voer je API Key van alineaciones.es in:\n\n(Laat leeg om demo modus te blijven gebruiken)');
        
        if (apiKey && apiKey.trim() !== '') {
            this.lineupAPI.enabled = true;
            this.lineupAPI.key = apiKey.trim();
            localStorage.setItem('alineaciones_api_key', apiKey.trim());
            localStorage.setItem('alineaciones_api_enabled', 'true');
            alert('API succesvol geconfigureerd!');
            console.log('API referenties opgeslagen');
        } else {
            localStorage.setItem('alineaciones_api_enabled', 'false');
            console.log('Demo modus blijft actief');
        }
    }

    /**
     * Initialiseert de opstelling bouwer in demo modus
     */
    initDemoLineupBuilder() {
        const canvas = document.getElementById('lineupCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Teken voetbalveld
        ctx.fillStyle = '#2d5016';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Veldlijnen
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        
        // Centrale lijn
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        
        // Centrale cirkel
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
        ctx.stroke();
        
        // Gebieden
        ctx.strokeRect(20, canvas.height / 2 - 60, 100, 120);
        ctx.strokeRect(canvas.width - 120, canvas.height / 2 - 60, 100, 120);
        
        // Toon bericht
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Opstelling Bouwer (Demo Modus)', canvas.width / 2, 30);
        ctx.fillText('Sleep spelers vanuit de lijst', canvas.width / 2, canvas.height - 20);
    }

    /**
     * Slaat de huidige opstelling op
     */
    saveLineup() {
        const formationEl = document.getElementById('formationSelect');
        const formation = formationEl?.value;
        if (!formation) {
            alert('Selecteer eerst een opstelling');
            return;
        }

        const selectedPlayers = Array.from(document.querySelectorAll('.player-item.selected'))
            .map(el => {
                const nameEl = el.querySelector('.player-name');
                return {
                    id: el.dataset.playerId,
                    name: nameEl?.textContent || ''
                };
            });

        if (selectedPlayers.length < 11) {
            alert('Selecteer ten minste 11 spelers voor de opstelling');
            return;
        }

        this.createLineup(formation, selectedPlayers);
        alert('Opstelling succesvol opgeslagen');
    }

    /**
     * Maakt een opstelling
     */
    createLineup(formation, players) {
        const lineup = {
            id: Date.now(),
            formation,
            players,
            team: this.selectedTeam,
            created: new Date().toISOString()
        };

        // Sla opstelling op
        const lineups = JSON.parse(localStorage.getItem('coach_lineups') || '[]');
        lineups.push(lineup);
        localStorage.setItem('coach_lineups', JSON.stringify(lineups));

        // Als API is ingeschakeld, synchroniseren
        if (this.lineupAPI.enabled) {
            this.syncLineupToAPI(lineup);
        }
    }

    /**
     * Synchroniseert opstelling met externe API
     */
    async syncLineupToAPI(lineup) {
        try {
            // Voorbeeld van integratie met alineaciones.es
            // const response = await fetch(`${this.lineupAPI.baseUrl}/lineups`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(lineup)
            // });
            console.log('Opstelling gesynchroniseerd met API');
        } catch (error) {
            console.warn('Fout bij synchroniseren opstelling:', error);
        }
    }

    /**
     * Initialiseert het communicatiesysteem
     */
    initCommunication() {
        const messageForm = document.getElementById('messageForm');
        if (messageForm) {
            messageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }
    }

    /**
     * Verstuurt een bericht
     */
    sendMessage() {
        const recipientEl = document.getElementById('messageRecipient');
        const subjectEl = document.getElementById('messageSubject');
        const contentEl = document.getElementById('messageContent');
        
        const recipient = recipientEl?.value;
        const subject = subjectEl?.value;
        const content = contentEl?.value;

        if (!recipient || !subject || !content) {
            alert('Vul alle velden in');
            return;
        }

        const message = {
            id: Date.now(),
            recipient,
            subject,
            content,
            sent: new Date().toISOString(),
            read: false
        };

        // In productie zou dit via een berichtensysteem worden verzonden
        console.log('Bericht verzonden:', message);
        alert('Bericht succesvol verzonden');
        const form = document.getElementById('messageForm');
        if (form) {
            form.reset();
        }
    }

    /**
     * Selecteert een speler voor de selectie lijst
     */
    selectPlayer(playerId) {
        const playerEl = document.querySelector(`[data-player-id="${playerId}"]`);
        if (playerEl) {
            playerEl.classList.toggle('selected');
        }
    }

    /**
     * Verstuurt bericht naar een speler
     */
    messagePlayer(playerId) {
        // Open bericht modal
        const recipientEl = document.getElementById('messageRecipient');
        if (recipientEl) {
            recipientEl.value = `player-${playerId}`;
        }
        const modalEl = document.getElementById('messageModal');
        if (modalEl) {
            modalEl.classList.add('active');
        }
    }

    /**
     * Verstuurt bericht naar een ouder/voogd
     */
    messageParent(parentContact) {
        const recipientEl = document.getElementById('messageRecipient');
        if (recipientEl) {
            recipientEl.value = parentContact;
        }
        const modalEl = document.getElementById('messageModal');
        if (modalEl) {
            modalEl.classList.add('active');
        }
    }
}

// Initialiseer wanneer DOM klaar is
document.addEventListener('DOMContentLoaded', () => {
    window.coachManager = new CoachManager();
});

