// ============================================
// ENHANCED LINEUP BUILDER
// ============================================
// Constructor de alineaciones mejorado con drag-and-drop y exportación

class EnhancedLineupBuilder {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.selectedFormation = '4-4-2';
        this.players = [];
        this.draggedPlayer = null;
        this.dragOffset = { x: 0, y: 0 };
        this.fieldPositions = []; // Initialize as array, not object
        this.init();
    }

    /**
     * Initialiseert de builder
     */
    init() {
        this.canvas = document.getElementById('lineupCanvas');
        if (!this.canvas) {
            console.warn('Canvas niet gevonden');
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.fieldPositions = []; // Initialize as empty array
        this.setupCanvas();
        this.loadFormation(); // Load formation after canvas is set up
        this.setupEventListeners();
        this.drawField();
    }

    /**
     * Configureert het canvas
     */
    setupCanvas() {
        // Responsive canvas sizing
        const container = this.canvas.parentElement;
        const maxWidth = Math.min(800, container.clientWidth - 40);
        const aspectRatio = 3 / 2; // Field aspect ratio
        
        this.canvas.width = maxWidth;
        this.canvas.height = maxWidth / aspectRatio;
        
        // High DPI support
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }

    /**
     * Setup event listeners voor drag and drop
     */
    setupEventListeners() {
        // Formation selector
        const formationSelect = document.getElementById('formationSelect');
        if (formationSelect) {
            formationSelect.addEventListener('change', (e) => {
                this.selectedFormation = e.target.value;
                this.loadFormation();
                this.drawField();
            });
        }

        // Canvas drag and drop
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('mouseleave', () => this.handleMouseUp());

        // Touch support
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', () => this.handleMouseUp());

        // Player list click to add
        document.addEventListener('click', (e) => {
            if (e.target.closest('.player-item')) {
                const playerItem = e.target.closest('.player-item');
                const playerId = playerItem.dataset.playerId;
                const playerName = playerItem.querySelector('.player-name')?.textContent;
                if (playerId && playerName) {
                    this.addPlayerToField({ id: playerId, name: playerName });
                }
            }
        });
    }

    /**
     * Tekent het voetbalveld
     */
    drawField() {
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);

        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);

        // Field background (grass)
        const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#2d5016');
        gradient.addColorStop(0.5, '#3a6b1f');
        gradient.addColorStop(1, '#2d5016');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);

        // Field lines
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.lineWidth = 3;

        // Center line
        this.ctx.beginPath();
        this.ctx.moveTo(width / 2, 0);
        this.ctx.lineTo(width / 2, height);
        this.ctx.stroke();

        // Center circle
        this.ctx.beginPath();
        this.ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.15, 0, Math.PI * 2);
        this.ctx.stroke();

        // Center dot
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(width / 2, height / 2, 4, 0, Math.PI * 2);
        this.ctx.fill();

        // Penalty areas
        const penaltyWidth = width * 0.25;
        const penaltyHeight = height * 0.3;
        const goalWidth = width * 0.1;
        const goalHeight = height * 0.15;

        // Top penalty area
        this.ctx.strokeRect(width / 2 - penaltyWidth / 2, 0, penaltyWidth, penaltyHeight);
        this.ctx.strokeRect(width / 2 - goalWidth / 2, 0, goalWidth, goalHeight);

        // Bottom penalty area
        this.ctx.strokeRect(width / 2 - penaltyWidth / 2, height - penaltyHeight, penaltyWidth, penaltyHeight);
        this.ctx.strokeRect(width / 2 - goalWidth / 2, height - goalHeight, goalWidth, goalHeight);

        // Penalty spots
        this.ctx.beginPath();
        this.ctx.arc(width / 2, penaltyHeight * 0.7, 3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(width / 2, height - penaltyHeight * 0.7, 3, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw formation positions
        this.drawFormationPositions();

        // Draw players
        this.drawPlayers();
    }

    /**
     * Laadt formatie posities
     */
    loadFormation() {
        const formations = this.getFormationPositions();
        this.fieldPositions = formations[this.selectedFormation] || formations['4-4-2'];
    }

    /**
     * Haalt formatie posities op
     */
    getFormationPositions() {
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);

        return {
            '4-4-2': [
                { x: width * 0.5, y: height * 0.95, role: 'GK' },
                { x: width * 0.2, y: height * 0.75, role: 'LB' },
                { x: width * 0.35, y: height * 0.7, role: 'CB' },
                { x: width * 0.65, y: height * 0.7, role: 'CB' },
                { x: width * 0.8, y: height * 0.75, role: 'RB' },
                { x: width * 0.25, y: height * 0.5, role: 'LM' },
                { x: width * 0.4, y: height * 0.45, role: 'CM' },
                { x: width * 0.6, y: height * 0.45, role: 'CM' },
                { x: width * 0.75, y: height * 0.5, role: 'RM' },
                { x: width * 0.35, y: height * 0.25, role: 'ST' },
                { x: width * 0.65, y: height * 0.25, role: 'ST' }
            ],
            '4-3-3': [
                { x: width * 0.5, y: height * 0.95, role: 'GK' },
                { x: width * 0.2, y: height * 0.75, role: 'LB' },
                { x: width * 0.35, y: height * 0.7, role: 'CB' },
                { x: width * 0.65, y: height * 0.7, role: 'CB' },
                { x: width * 0.8, y: height * 0.75, role: 'RB' },
                { x: width * 0.3, y: height * 0.45, role: 'CM' },
                { x: width * 0.5, y: height * 0.4, role: 'CM' },
                { x: width * 0.7, y: height * 0.45, role: 'CM' },
                { x: width * 0.25, y: height * 0.2, role: 'LW' },
                { x: width * 0.5, y: height * 0.15, role: 'ST' },
                { x: width * 0.75, y: height * 0.2, role: 'RW' }
            ],
            '3-5-2': [
                { x: width * 0.5, y: height * 0.95, role: 'GK' },
                { x: width * 0.3, y: height * 0.7, role: 'CB' },
                { x: width * 0.5, y: height * 0.65, role: 'CB' },
                { x: width * 0.7, y: height * 0.7, role: 'CB' },
                { x: width * 0.15, y: height * 0.5, role: 'LWB' },
                { x: width * 0.35, y: height * 0.45, role: 'CM' },
                { x: width * 0.5, y: height * 0.4, role: 'CM' },
                { x: width * 0.65, y: height * 0.45, role: 'CM' },
                { x: width * 0.85, y: height * 0.5, role: 'RWB' },
                { x: width * 0.4, y: height * 0.25, role: 'ST' },
                { x: width * 0.6, y: height * 0.25, role: 'ST' }
            ],
            '4-2-3-1': [
                { x: width * 0.5, y: height * 0.95, role: 'GK' },
                { x: width * 0.2, y: height * 0.75, role: 'LB' },
                { x: width * 0.35, y: height * 0.7, role: 'CB' },
                { x: width * 0.65, y: height * 0.7, role: 'CB' },
                { x: width * 0.8, y: height * 0.75, role: 'RB' },
                { x: width * 0.4, y: height * 0.55, role: 'CDM' },
                { x: width * 0.6, y: height * 0.55, role: 'CDM' },
                { x: width * 0.25, y: height * 0.35, role: 'LW' },
                { x: width * 0.5, y: height * 0.3, role: 'CAM' },
                { x: width * 0.75, y: height * 0.35, role: 'RW' },
                { x: width * 0.5, y: height * 0.15, role: 'ST' }
            ],
            '3-4-3': [
                { x: width * 0.5, y: height * 0.95, role: 'GK' },
                { x: width * 0.3, y: height * 0.7, role: 'CB' },
                { x: width * 0.5, y: height * 0.65, role: 'CB' },
                { x: width * 0.7, y: height * 0.7, role: 'CB' },
                { x: width * 0.2, y: height * 0.5, role: 'LM' },
                { x: width * 0.4, y: height * 0.45, role: 'CM' },
                { x: width * 0.6, y: height * 0.45, role: 'CM' },
                { x: width * 0.8, y: height * 0.5, role: 'RM' },
                { x: width * 0.25, y: height * 0.2, role: 'LW' },
                { x: width * 0.5, y: height * 0.15, role: 'ST' },
                { x: width * 0.75, y: height * 0.2, role: 'RW' }
            ]
        };
    }

    /**
     * Tekent formatie posities
     */
    drawFormationPositions() {
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);

        this.fieldPositions.forEach((pos, index) => {
            // Check if position is filled
            const hasPlayer = this.players.some(p => p.positionIndex === index);

            // Draw position circle
            this.ctx.fillStyle = hasPlayer ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)';
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw border
            this.ctx.strokeStyle = hasPlayer ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Draw role label if empty
            if (!hasPlayer) {
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                this.ctx.font = '10px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(pos.role, pos.x, pos.y + 3);
            }
        });
    }

    /**
     * Tekent spelers op het veld
     */
    drawPlayers() {
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);

        this.players.forEach((player, index) => {
            const x = player.x || (this.fieldPositions[player.positionIndex]?.x || width / 2);
            const y = player.y || (this.fieldPositions[player.positionIndex]?.y || height / 2);

            // Player circle (jersey)
            const radius = 18;
            
            // Jersey color
            this.ctx.fillStyle = player.jerseyColor || '#1e3a8a';
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();

            // Jersey border
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Player number
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText((index + 1).toString(), x, y + 5);

            // Player name below
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '10px Arial';
            this.ctx.fillText(this.truncateName(player.name, 12), x, y + radius + 12);

            // Highlight if dragging
            if (this.draggedPlayer === index) {
                this.ctx.strokeStyle = '#fbbf24';
                this.ctx.lineWidth = 3;
                this.ctx.stroke();
            }
        });
    }

    /**
     * Voegt speler toe aan veld
     */
    addPlayerToField(player, x = null, y = null) {
        // Ensure positions are loaded
        if (!Array.isArray(this.fieldPositions) || this.fieldPositions.length === 0) {
            this.loadFormation();
        }

        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);

        let playerX, playerY, positionIndex = -1;

        // If x and y are provided (from drag/drop), use them
        if (x !== null && y !== null) {
            // Convert screen coordinates to canvas coordinates
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = width / rect.width;
            const scaleY = height / rect.height;
            playerX = x * scaleX;
            playerY = y * scaleY;
            
            // Find nearest position
            const nearest = this.findNearestPosition(playerX, playerY);
            if (nearest && nearest.distance < 50) {
                playerX = nearest.x;
                playerY = nearest.y;
                positionIndex = nearest.index;
            }
        } else {
            // Find first empty position
            for (let i = 0; i < this.fieldPositions.length; i++) {
                if (!this.players.some(p => p.positionIndex === i)) {
                    positionIndex = i;
                    break;
                }
            }

            if (positionIndex === -1) {
                alert('Alle posities zijn bezet! Verwijder eerst een speler door erop te klikken.');
                return;
            }

            const pos = this.fieldPositions[positionIndex];
            if (!pos) {
                console.error('Position not found at index:', positionIndex);
                return;
            }
            playerX = pos.x;
            playerY = pos.y;
        }

        this.players.push({
            ...player,
            positionIndex: positionIndex !== -1 ? positionIndex : this.players.length,
            x: playerX,
            y: playerY,
            jerseyColor: this.getRandomJerseyColor()
        });

        this.drawField();
    }

    /**
     * Genereert willekeurige jersey kleur
     */
    getRandomJerseyColor() {
        const colors = ['#1e3a8a', '#dc2626', '#059669', '#7c3aed', '#ea580c', '#0891b2'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    /**
     * Truncate naam voor display
     */
    truncateName(name, maxLength) {
        return name.length > maxLength ? name.substring(0, maxLength - 3) + '...' : name;
    }

    /**
     * Mouse event handlers
     */
    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = (this.canvas.width / (window.devicePixelRatio || 1)) / rect.width;
        const scaleY = (this.canvas.height / (window.devicePixelRatio || 1)) / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    handleMouseDown(e) {
        const pos = this.getMousePos(e);
        const clickedPlayer = this.getPlayerAt(pos.x, pos.y);
        
        if (clickedPlayer !== null) {
            this.draggedPlayer = clickedPlayer;
            const player = this.players[clickedPlayer];
            this.dragOffset = {
                x: pos.x - player.x,
                y: pos.y - player.y
            };
            this.canvas.style.cursor = 'grabbing';
        }
    }

    handleMouseMove(e) {
        if (this.draggedPlayer !== null) {
            const pos = this.getMousePos(e);
            this.players[this.draggedPlayer].x = pos.x - this.dragOffset.x;
            this.players[this.draggedPlayer].y = pos.y - this.dragOffset.y;
            this.drawField();
        } else {
            const pos = this.getMousePos(e);
            const player = this.getPlayerAt(pos.x, pos.y);
            this.canvas.style.cursor = player !== null ? 'grab' : 'default';
        }
    }

    handleMouseUp() {
        if (this.draggedPlayer !== null) {
            // Snap to nearest position if close
            const player = this.players[this.draggedPlayer];
            const nearestPos = this.findNearestPosition(player.x, player.y);
            
            if (nearestPos && this.getDistance(player.x, player.y, nearestPos.x, nearestPos.y) < 30) {
                player.x = nearestPos.x;
                player.y = nearestPos.y;
                player.positionIndex = nearestPos.index;
            }
            
            this.draggedPlayer = null;
            this.canvas.style.cursor = 'default';
            this.drawField();
        }
    }

    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        this.handleMouseDown(mouseEvent);
    }

    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        this.handleMouseMove(mouseEvent);
    }

    /**
     * Helper functies
     */
    getPlayerAt(x, y) {
        for (let i = this.players.length - 1; i >= 0; i--) {
            const player = this.players[i];
            const distance = this.getDistance(x, y, player.x, player.y);
            if (distance < 20) {
                return i;
            }
        }
        return null;
    }

    findNearestPosition(x, y) {
        let nearest = null;
        let minDistance = Infinity;

        this.fieldPositions.forEach((pos, index) => {
            const distance = this.getDistance(x, y, pos.x, pos.y);
            if (distance < minDistance && !this.players.some(p => p.positionIndex === index && p !== this.players[this.draggedPlayer])) {
                minDistance = distance;
                nearest = { ...pos, index };
            }
        });

        return nearest;
    }

    getDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    /**
     * Verwijdert speler van veld
     */
    removePlayer(index) {
        this.players.splice(index, 1);
        this.drawField();
    }

    /**
     * Exporteert als afbeelding
     */
    exportAsImage() {
        // Create temporary canvas for export (higher quality)
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = 1200;
        exportCanvas.height = 800;
        const exportCtx = exportCanvas.getContext('2d');

        // Scale positions for export
        const scaleX = exportCanvas.width / (this.canvas.width / (window.devicePixelRatio || 1));
        const scaleY = exportCanvas.height / (this.canvas.height / (window.devicePixelRatio || 1));

        // Draw field on export canvas
        const gradient = exportCtx.createLinearGradient(0, 0, 0, exportCanvas.height);
        gradient.addColorStop(0, '#2d5016');
        gradient.addColorStop(0.5, '#3a6b1f');
        gradient.addColorStop(1, '#2d5016');
        exportCtx.fillStyle = gradient;
        exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

        // Draw field lines (same as drawField but scaled)
        exportCtx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        exportCtx.lineWidth = 4;
        exportCtx.beginPath();
        exportCtx.moveTo(exportCanvas.width / 2, 0);
        exportCtx.lineTo(exportCanvas.width / 2, exportCanvas.height);
        exportCtx.stroke();

        exportCtx.beginPath();
        exportCtx.arc(exportCanvas.width / 2, exportCanvas.height / 2, Math.min(exportCanvas.width, exportCanvas.height) * 0.15, 0, Math.PI * 2);
        exportCtx.stroke();

        // Draw players scaled
        this.players.forEach((player, index) => {
            let x, y;
            if (player.x && player.y) {
                x = player.x * scaleX;
                y = player.y * scaleY;
            } else if (Array.isArray(this.fieldPositions) && this.fieldPositions[player.positionIndex]) {
                x = this.fieldPositions[player.positionIndex].x * scaleX;
                y = this.fieldPositions[player.positionIndex].y * scaleY;
            } else {
                x = exportCanvas.width / 2;
                y = exportCanvas.height / 2;
            }
            const radius = 25;

            exportCtx.fillStyle = player.jerseyColor || '#1e3a8a';
            exportCtx.beginPath();
            exportCtx.arc(x, y, radius, 0, Math.PI * 2);
            exportCtx.fill();

            exportCtx.strokeStyle = '#ffffff';
            exportCtx.lineWidth = 3;
            exportCtx.stroke();

            exportCtx.fillStyle = '#ffffff';
            exportCtx.font = 'bold 20px Arial';
            exportCtx.textAlign = 'center';
            exportCtx.fillText((index + 1).toString(), x, y + 7);

            exportCtx.font = '14px Arial';
            exportCtx.fillText(this.truncateName(player.name, 15), x, y + radius + 16);
        });

        // Download
        exportCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `opstelling_${this.selectedFormation}_${Date.now()}.png`;
            a.click();
            URL.revokeObjectURL(url);
        }, 'image/png');
    }

    /**
     * Reset veld
     */
    reset() {
        this.players = [];
        this.drawField();
    }

    /**
     * Slaat opstelling op
     */
    save() {
        const lineup = {
            formation: this.selectedFormation,
            players: this.players.map((p, i) => ({
                id: p.id,
                name: p.name,
                positionIndex: p.positionIndex,
                x: p.x,
                y: p.y,
                jerseyColor: p.jerseyColor,
                number: i + 1
            })),
            created: new Date().toISOString()
        };

        return lineup;
    }

    /**
     * Laadt opstelling
     */
    load(lineup) {
        this.selectedFormation = lineup.formation || '4-4-2';
        this.loadFormation();
        this.players = lineup.players || [];
        this.drawField();
    }
}

// Maak globale instantie
window.enhancedLineupBuilder = null;

