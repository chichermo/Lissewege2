// ============================================
// FACILITY RESERVATIONS SYSTEM
// ============================================
// Systeem voor reserveringen van faciliteiten

if (typeof FacilityReservations === 'undefined') {
    if (typeof FacilityReservations === 'undefined') {
    class FacilityReservations {
    constructor() {
        this.reservations = [];
        this.facilities = [
            { id: 'main-field', name: 'Hoofdveld', type: 'field', capacity: 22 },
            { id: 'training-field', name: 'Trainingsveld', type: 'field', capacity: 22 },
            { id: 'locker-room-1', name: 'Kleedkamer 1', type: 'locker-room', capacity: 15 },
            { id: 'locker-room-2', name: 'Kleedkamer 2', type: 'locker-room', capacity: 15 },
            { id: 'meeting-room', name: 'Vergaderzaal', type: 'room', capacity: 20 },
            { id: 'bar', name: 'Clubhuis Bar', type: 'room', capacity: 50 }
        ];
        this.init();
    }

    init() {
        this.loadReservations();
        this.setupEventListeners();
        this.renderCalendar();
    }

    /**
     * Laadt reserveringen
     */
    loadReservations() {
        const saved = localStorage.getItem('facility_reservations');
        if (saved) {
            this.reservations = JSON.parse(saved);
        } else {
            this.loadDemoReservations();
        }
    }

    /**
     * Laadt demo reserveringen
     */
    loadDemoReservations() {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);

        this.reservations = [
            {
                id: 1,
                facilityId: 'main-field',
                userId: 1,
                userName: 'Jan De Vries',
                date: today.toISOString().split('T')[0],
                startTime: '14:00',
                endTime: '16:00',
                purpose: 'Wedstrijd A-Kern',
                status: 'approved',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                facilityId: 'training-field',
                userId: 2,
                userName: 'Pieter Janssens',
                date: nextWeek.toISOString().split('T')[0],
                startTime: '18:00',
                endTime: '20:00',
                purpose: 'Training U15',
                status: 'pending',
                createdAt: new Date().toISOString()
            }
        ];
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // New reservation form
        const reservationForm = document.getElementById('newReservationForm');
        if (reservationForm) {
            reservationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.createReservation();
            });
        }

        // Calendar navigation
        const prevMonthBtn = document.getElementById('reservationsPrevMonth');
        const nextMonthBtn = document.getElementById('reservationsNextMonth');
        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', () => this.changeMonth(-1));
        }
        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', () => this.changeMonth(1));
        }

        // Facility filter
        const facilityFilter = document.getElementById('reservationsFacilityFilter');
        if (facilityFilter) {
            facilityFilter.addEventListener('change', (e) => {
                this.filterByFacility(e.target.value);
            });
        }
    }

    /**
     * Rendert kalender
     */
    renderCalendar(month = null, year = null) {
        const container = document.getElementById('reservationsCalendar');
        if (!container) return;

        const now = new Date();
        const currentMonth = month !== null ? month : now.getMonth();
        const currentYear = year !== null ? year : now.getFullYear();

        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const monthNames = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
            'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];

        let html = `
            <div class="calendar-header">
                <button id="reservationsPrevMonth" class="calendar-nav-btn">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <h3>${monthNames[currentMonth]} ${currentYear}</h3>
                <button id="reservationsNextMonth" class="calendar-nav-btn">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="calendar-grid">
                <div class="calendar-weekday">Ma</div>
                <div class="calendar-weekday">Di</div>
                <div class="calendar-weekday">Wo</div>
                <div class="calendar-weekday">Do</div>
                <div class="calendar-weekday">Vr</div>
                <div class="calendar-weekday">Za</div>
                <div class="calendar-weekday">Zo</div>
        `;

        // Empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            html += '<div class="calendar-day empty"></div>';
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayReservations = this.getReservationsForDate(dateStr);
            const isToday = dateStr === now.toISOString().split('T')[0];
            const isPast = new Date(dateStr) < new Date(now.toISOString().split('T')[0]);

            html += `
                <div class="calendar-day ${isToday ? 'today' : ''} ${isPast ? 'past' : ''}" data-date="${dateStr}">
                    <div class="day-number">${day}</div>
                    <div class="day-reservations">
                        ${dayReservations.slice(0, 2).map(r => `
                            <div class="reservation-dot ${r.status}" title="${r.purpose}"></div>
                        `).join('')}
                        ${dayReservations.length > 2 ? `<div class="more-reservations">+${dayReservations.length - 2}</div>` : ''}
                    </div>
                </div>
            `;
        }

        html += '</div>';
        container.innerHTML = html;

        // Add click listeners
        container.querySelectorAll('.calendar-day:not(.empty)').forEach(day => {
            day.addEventListener('click', () => {
                const date = day.dataset.date;
                this.showDateReservations(date);
            });
        });

        // Store current month/year
        this.currentMonth = currentMonth;
        this.currentYear = currentYear;
    }

    /**
     * Haalt reserveringen voor een datum op
     */
    getReservationsForDate(dateStr) {
        return this.reservations.filter(r => r.date === dateStr);
    }

    /**
     * Verandert maand
     */
    changeMonth(direction) {
        let newMonth = this.currentMonth + direction;
        let newYear = this.currentYear;

        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }

        this.renderCalendar(newMonth, newYear);
    }

    /**
     * Toont reserveringen voor een datum
     */
    showDateReservations(dateStr) {
        const reservations = this.getReservationsForDate(dateStr);
        const modal = document.getElementById('dateReservationsModal');
        
        if (!modal) {
            this.createDateModal();
        }

        const dateModal = document.getElementById('dateReservationsModal');
        const modalContent = dateModal.querySelector('.modal-content');
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h3>Reserveringen voor ${new Date(dateStr).toLocaleDateString('nl-BE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                <button class="modal-close" onclick="this.closest('.modal').style.display='none'">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="reservations-list-modal">
                ${reservations.length === 0 ? '<p>Geen reserveringen voor deze datum.</p>' : ''}
                ${reservations.map(r => {
                    const facility = this.facilities.find(f => f.id === r.facilityId);
                    return `
                        <div class="reservation-item-modal">
                            <div class="reservation-info">
                                <h4>${facility ? facility.name : r.facilityId}</h4>
                                <p><i class="fas fa-clock"></i> ${r.startTime} - ${r.endTime}</p>
                                <p><i class="fas fa-user"></i> ${r.userName}</p>
                                <p><i class="fas fa-info-circle"></i> ${r.purpose}</p>
                            </div>
                            <div class="reservation-status">
                                <span class="status-badge ${r.status}">${this.getStatusLabel(r.status)}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="modal-footer">
                <button class="btn-primary" onclick="facilityReservations.showNewReservationForm('${dateStr}')">
                    <i class="fas fa-plus"></i> Nieuwe Reservering
                </button>
            </div>
        `;

        dateModal.style.display = 'flex';
    }

    /**
     * Maakt nieuwe reservering
     */
    createReservation() {
        const form = document.getElementById('newReservationForm');
        const facilityId = form.querySelector('#reservationFacility').value;
        const date = form.querySelector('#reservationDate').value;
        const startTime = form.querySelector('#reservationStartTime').value;
        const endTime = form.querySelector('#reservationEndTime').value;
        const purpose = form.querySelector('#reservationPurpose').value;

        // Check conflicts
        const conflicts = this.checkConflicts(facilityId, date, startTime, endTime);
        if (conflicts.length > 0) {
            alert('Er is een conflict met een bestaande reservering!');
            return;
        }

        // Get current user (from members system)
        const currentUser = JSON.parse(localStorage.getItem('current_user')) || {
            id: 1,
            name: 'Huidige Gebruiker'
        };

        const reservation = {
            id: Date.now(),
            facilityId,
            userId: currentUser.id,
            userName: currentUser.name,
            date,
            startTime,
            endTime,
            purpose,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        this.reservations.push(reservation);
        this.saveReservations();
        this.renderCalendar(this.currentMonth, this.currentYear);
        this.updateReservationsList();

        // Reset form
        form.reset();
        alert('Reservering succesvol aangemaakt! Wacht op goedkeuring van een beheerder.');

        // Close modal if open
        const modal = document.getElementById('newReservationModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    /**
     * Controleert conflicten
     */
    checkConflicts(facilityId, date, startTime, endTime) {
        return this.reservations.filter(r => {
            if (r.facilityId !== facilityId || r.date !== date || r.status === 'rejected') {
                return false;
            }

            const rStart = this.timeToMinutes(r.startTime);
            const rEnd = this.timeToMinutes(r.endTime);
            const newStart = this.timeToMinutes(startTime);
            const newEnd = this.timeToMinutes(endTime);

            return (newStart < rEnd && newEnd > rStart);
        });
    }

    /**
     * Converteert tijd naar minuten
     */
    timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    /**
     * Toont nieuwe reservering formulier
     */
    showNewReservationForm(date = null) {
        const modal = document.getElementById('newReservationModal');
        if (!modal) {
            this.createNewReservationModal();
        }

        const newModal = document.getElementById('newReservationModal');
        const dateInput = newModal.querySelector('#reservationDate');
        if (date && dateInput) {
            dateInput.value = date;
        }

        newModal.style.display = 'flex';
    }

    /**
     * Maakt nieuwe reservering modal aan
     */
    createNewReservationModal() {
        const modal = document.createElement('div');
        modal.id = 'newReservationModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Nieuwe Reservering</h3>
                    <button class="modal-close" onclick="this.closest('.modal').style.display='none'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="newReservationForm" class="reservation-form">
                    <div class="form-group">
                        <label>Faciliteit</label>
                        <select id="reservationFacility" class="form-select" required>
                            ${this.facilities.map(f => `<option value="${f.id}">${f.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Datum</label>
                        <input type="date" id="reservationDate" class="form-input" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Start Tijd</label>
                            <input type="time" id="reservationStartTime" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label>Eind Tijd</label>
                            <input type="time" id="reservationEndTime" class="form-input" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Doel</label>
                        <textarea id="reservationPurpose" class="form-textarea" rows="3" required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal').style.display='none'">Annuleren</button>
                        <button type="submit" class="btn-primary">Reserveren</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        // Setup form listener
        const form = document.getElementById('newReservationForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.createReservation();
            });
        }
    }

    /**
     * Maakt datum modal aan
     */
    createDateModal() {
        const modal = document.createElement('div');
        modal.id = 'dateReservationsModal';
        modal.className = 'modal';
        modal.innerHTML = '<div class="modal-content"></div>';
        document.body.appendChild(modal);
    }

    /**
     * Update reserveringen lijst
     */
    updateReservationsList() {
        const container = document.getElementById('myReservationsList');
        if (!container) return;

        const currentUser = JSON.parse(localStorage.getItem('current_user')) || { id: 1 };
        const userReservations = this.reservations
            .filter(r => r.userId === currentUser.id)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10);

        container.innerHTML = userReservations.length === 0 
            ? '<p>Je hebt nog geen reserveringen.</p>'
            : userReservations.map(r => {
                const facility = this.facilities.find(f => f.id === r.facilityId);
                return `
                    <div class="reservation-list-item">
                        <div class="reservation-list-info">
                            <h4>${facility ? facility.name : r.facilityId}</h4>
                            <p>${new Date(r.date).toLocaleDateString('nl-BE')} • ${r.startTime} - ${r.endTime}</p>
                            <p>${r.purpose}</p>
                        </div>
                        <div class="reservation-list-status">
                            <span class="status-badge ${r.status}">${this.getStatusLabel(r.status)}</span>
                        </div>
                    </div>
                `;
            }).join('');
    }

    /**
     * Haalt status label op
     */
    getStatusLabel(status) {
        const labels = {
            'pending': 'In Afwachting',
            'approved': 'Goedgekeurd',
            'rejected': 'Afgewezen'
        };
        return labels[status] || status;
    }

    /**
     * Filtert op faciliteit
     */
    filterByFacility(facilityId) {
        // Update calendar view based on facility filter
        this.renderCalendar(this.currentMonth, this.currentYear);
    }

    /**
     * Slaat reserveringen op
     */
    saveReservations() {
        localStorage.setItem('facility_reservations', JSON.stringify(this.reservations));
    }
    }
    window.FacilityReservations = FacilityReservations;
}

// Initialiseer wanneer DOM klaar is
if (!window.facilityReservations) {
    let facilityReservations;
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.facilityReservations) {
            facilityReservations = new FacilityReservations();
            window.facilityReservations = facilityReservations;
        }
    });
}

