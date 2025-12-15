// ============================================
// COACH MANAGEMENT SYSTEM
// ============================================
// Sistema de gestión para coaches: comunicaciones, convocados, formaciones

class CoachManager {
    constructor() {
        this.selectedTeam = null;
        this.lineupAPI = {
            baseUrl: 'https://api.alineaciones.es',
            enabled: false // Activar cuando se tenga acceso a la API
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
     * Inicializa el selector de equipos
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
     * Carga datos del equipo seleccionado
     */
    loadTeamData(teamId) {
        // Cargar jugadores del equipo
        this.loadTeamPlayers(teamId);
        // Cargar comunicaciones
        this.loadTeamCommunications(teamId);
        // Cargar formaciones guardadas
        this.loadSavedLineups(teamId);
    }

    /**
     * Carga los jugadores del equipo
     */
    loadTeamPlayers(teamId) {
        // Aquí se integraría con la base de datos de jugadores
        const players = this.getTeamPlayers(teamId);
        this.renderPlayersList(players);
        
        // También renderizar en la sección de jugadores del coach
        const coachPlayersList = document.querySelector('#coach-players .players-management-list');
        if (coachPlayersList) {
            this.renderPlayersList(players, coachPlayersList);
        }
    }

    /**
     * Obtiene los jugadores de un equipo (datos de ejemplo)
     */
    getTeamPlayers(teamId) {
        // En producción, esto vendría de una API o base de datos
        return [
            { id: 1, name: 'Jugador 1', position: 'Portero', age: 12, parentContact: 'parent1@email.com' },
            { id: 2, name: 'Jugador 2', position: 'Defensa', age: 13, parentContact: 'parent2@email.com' },
            { id: 3, name: 'Jugador 3', position: 'Mediocampista', age: 12, parentContact: 'parent3@email.com' },
            { id: 4, name: 'Jugador 4', position: 'Delantero', age: 13, parentContact: 'parent4@email.com' }
        ];
    }

    /**
     * Renderiza la lista de jugadores
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
                    <span class="player-age">${player.age} años</span>
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
     * Inicializa el sistema de anuncios
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
     * Crea un nuevo anuncio
     */
    createAnnouncement() {
        const title = document.getElementById('announcementTitle')?.value;
        const content = document.getElementById('announcementContent')?.value;
        const target = document.getElementById('announcementTarget')?.value;
        const urgent = document.getElementById('announcementUrgent')?.checked;

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
        
        // Limpiar formulario
        document.getElementById('announcementForm')?.reset();
    }

    /**
     * Guarda un anuncio
     */
    saveAnnouncement(announcement) {
        // En producción, esto se guardaría en una base de datos
        const announcements = JSON.parse(localStorage.getItem('coach_announcements') || '[]');
        announcements.push(announcement);
        localStorage.setItem('coach_announcements', JSON.stringify(announcements));
    }

    /**
     * Muestra un anuncio en la lista
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
     * Inicializa la lista de convocados
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
     * Crea una lista de convocados
     */
    createSquadList() {
        const matchDate = document.getElementById('squadMatchDate')?.value;
        const matchTime = document.getElementById('squadMatchTime')?.value;
        const opponent = document.getElementById('squadOpponent')?.value;
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
     * Guarda una lista de convocados
     */
    saveSquadList(squad) {
        const squads = JSON.parse(localStorage.getItem('coach_squads') || '[]');
        squads.push(squad);
        localStorage.setItem('coach_squads', JSON.stringify(squads));
    }

    /**
     * Muestra una lista de convocados
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
     * Inicializa la conexión con la API de formaciones
     */
    async initLineupAPI() {
        if (!this.lineupAPI.enabled) {
            const enable = confirm('Wil je verbinden met de alineaciones.es API?\n\nOpmerking: Je hebt API-referenties nodig.');
            if (enable) {
                // Aquí se pedirían las credenciales
                const apiKey = prompt('Voer je API Key van alineaciones.es in (leeg laten voor demo modus):');
                if (apiKey) {
                    this.lineupAPI.enabled = true;
                    this.lineupAPI.key = apiKey;
                }
            }
        }

        if (!this.lineupAPI.enabled) {
            console.log('Lineup API niet ingeschakeld. Demo modus gebruiken.');
            this.initDemoLineupBuilder();
            return;
        }

        try {
            // Aquí se haría la conexión con la API real
            // Ejemplo: const response = await fetch(`${this.lineupAPI.baseUrl}/teams/${teamId}`, {
            //     headers: { 'Authorization': `Bearer ${this.lineupAPI.key}` }
            // });
            console.log('Lineup API geïnitialiseerd');
        } catch (error) {
            console.warn('Fout bij verbinden met Lineup API:', error);
            this.initDemoLineupBuilder();
        }
    }

    /**
     * Inicializa el constructor de formaciones en modo demo
     */
    initDemoLineupBuilder() {
        const canvas = document.getElementById('lineupCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Dibujar campo de fútbol
        ctx.fillStyle = '#2d5016';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Líneas del campo
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        
        // Línea central
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        
        // Círculo central
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
        ctx.stroke();
        
        // Áreas
        ctx.strokeRect(20, canvas.height / 2 - 60, 100, 120);
        ctx.strokeRect(canvas.width - 120, canvas.height / 2 - 60, 100, 120);
        
        // Mostrar mensaje
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Opstelling Bouwer (Demo Modus)', canvas.width / 2, 30);
        ctx.fillText('Sleep spelers vanuit de lijst', canvas.width / 2, canvas.height - 20);
    }

    /**
     * Guarda la formación actual
     */
    saveLineup() {
        const formation = document.getElementById('formationSelect')?.value;
        if (!formation) {
            alert('Selecteer eerst een opstelling');
            return;
        }

        const selectedPlayers = Array.from(document.querySelectorAll('.player-item.selected'))
            .map(el => ({
                id: el.dataset.playerId,
                name: el.querySelector('.player-name')?.textContent
            }));

        if (selectedPlayers.length < 11) {
            alert('Selecteer ten minste 11 spelers voor de opstelling');
            return;
        }

        this.createLineup(formation, selectedPlayers);
        alert('Opstelling succesvol opgeslagen');
    }

    /**
     * Crea una formación
     */
    createLineup(formation, players) {
        const lineup = {
            id: Date.now(),
            formation,
            players,
            team: this.selectedTeam,
            created: new Date().toISOString()
        };

        // Guardar formación
        const lineups = JSON.parse(localStorage.getItem('coach_lineups') || '[]');
        lineups.push(lineup);
        localStorage.setItem('coach_lineups', JSON.stringify(lineups));

        // Si la API está habilitada, sincronizar
        if (this.lineupAPI.enabled) {
            this.syncLineupToAPI(lineup);
        }
    }

    /**
     * Sincroniza formación con API externa
     */
    async syncLineupToAPI(lineup) {
        try {
            // Ejemplo de integración con alineaciones.es
            // const response = await fetch(`${this.lineupAPI.baseUrl}/lineups`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(lineup)
            // });
            console.log('Formación sincronizada con API');
        } catch (error) {
            console.warn('Error al sincronizar formación:', error);
        }
    }

    /**
     * Inicializa el sistema de comunicación
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
     * Envía un mensaje
     */
    sendMessage() {
        const recipient = document.getElementById('messageRecipient')?.value;
        const subject = document.getElementById('messageSubject')?.value;
        const content = document.getElementById('messageContent')?.value;

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

        // En producción, esto se enviaría a través de un sistema de mensajería
        console.log('Bericht verzonden:', message);
        alert('Bericht succesvol verzonden');
        document.getElementById('messageForm')?.reset();
    }

    /**
     * Selecciona un jugador para la lista de convocados
     */
    selectPlayer(playerId) {
        const playerEl = document.querySelector(`[data-player-id="${playerId}"]`);
        if (playerEl) {
            playerEl.classList.toggle('selected');
        }
    }

    /**
     * Envía mensaje a un jugador
     */
    messagePlayer(playerId) {
        // Abrir modal de mensaje
        document.getElementById('messageRecipient')?.value = `player-${playerId}`;
        document.getElementById('messageModal')?.classList.add('active');
    }

    /**
     * Envía mensaje a un apoderado
     */
    messageParent(parentContact) {
        document.getElementById('messageRecipient')?.value = parentContact;
        document.getElementById('messageModal')?.classList.add('active');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.coachManager = new CoachManager();
});

