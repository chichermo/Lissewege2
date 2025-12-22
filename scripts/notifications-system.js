// ============================================
// NOTIFICATIONS SYSTEM
// ============================================
// Systeem voor push notificaties en meldingen

if (typeof NotificationsSystem === 'undefined') {
    if (typeof NotificationsSystem === 'undefined') {
    class NotificationsSystem {
    constructor() {
        this.notifications = [];
        this.preferences = {
            matchReminders: true,
            trainingReminders: true,
            results: true,
            announcements: true,
            payments: false,
            general: true
        };
        this.permission = null;
        this.init();
    }

    init() {
        this.loadPreferences();
        this.loadNotifications();
        this.setupEventListeners();
        this.requestPermission();
        this.setupServiceWorker();
    }

    /**
     * Vraagt toestemming voor notificaties
     */
    async requestPermission() {
        if (!('Notification' in window)) {
            console.warn('Deze browser ondersteunt geen notificaties');
            return;
        }

        if (Notification.permission === 'default') {
            this.permission = await Notification.requestPermission();
        } else {
            this.permission = Notification.permission;
        }

        this.updatePermissionUI();
    }

    /**
     * Setup service worker voor push notificaties
     */
    async setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker geregistreerd voor notificaties');
            } catch (error) {
                console.warn('Service Worker registratie mislukt:', error);
            }
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Enable/disable notifications toggle
        const enableToggle = document.getElementById('notificationsEnable');
        if (enableToggle) {
            enableToggle.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.requestPermission();
                } else {
                    this.disableNotifications();
                }
            });
        }

        // Preference toggles
        document.querySelectorAll('.notification-preference').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const key = e.target.dataset.preference;
                this.preferences[key] = e.target.checked;
                this.savePreferences();
            });
        });

        // Test notification button
        const testBtn = document.getElementById('testNotificationBtn');
        if (testBtn) {
            testBtn.addEventListener('click', () => {
                this.sendTestNotification();
            });
        }
    }

    /**
     * Laadt voorkeuren
     */
    loadPreferences() {
        const saved = localStorage.getItem('notification_preferences');
        if (saved) {
            this.preferences = { ...this.preferences, ...JSON.parse(saved) };
        }
    }

    /**
     * Laadt notificaties
     */
    loadNotifications() {
        const saved = localStorage.getItem('notifications_history');
        if (saved) {
            this.notifications = JSON.parse(saved);
        }
        this.renderNotifications();
    }

    /**
     * Slaat voorkeuren op
     */
    savePreferences() {
        localStorage.setItem('notification_preferences', JSON.stringify(this.preferences));
    }

    /**
     * Update permission UI
     */
    updatePermissionUI() {
        const enableToggle = document.getElementById('notificationsEnable');
        const permissionStatus = document.getElementById('notificationPermissionStatus');
        
        if (enableToggle) {
            enableToggle.checked = this.permission === 'granted';
        }

        if (permissionStatus) {
            const statusText = {
                'granted': 'Toegestaan',
                'denied': 'Geweigerd',
                'default': 'Niet gevraagd'
            };
            permissionStatus.textContent = statusText[this.permission] || 'Onbekend';
            permissionStatus.className = `permission-status ${this.permission}`;
        }
    }

    /**
     * Verzendt notificatie
     */
    sendNotification(title, options = {}) {
        if (this.permission !== 'granted') {
            console.warn('Notificaties niet toegestaan');
            return;
        }

        const notification = new Notification(title, {
            icon: '/images/logos/100b.jpeg',
            badge: '/images/logos/100b.jpeg',
            ...options
        });

        // Save to history
        this.notifications.unshift({
            id: Date.now(),
            title,
            ...options,
            timestamp: new Date().toISOString(),
            read: false
        });

        // Keep only last 50
        if (this.notifications.length > 50) {
            this.notifications = this.notifications.slice(0, 50);
        }

        this.saveNotifications();
        this.renderNotifications();

        // Auto close after 5 seconds
        setTimeout(() => {
            notification.close();
        }, 5000);

        return notification;
    }

    /**
     * Verzendt test notificatie
     */
    sendTestNotification() {
        this.sendNotification('Test Notificatie', {
            body: 'Dit is een test notificatie van RFC Lissewege',
            tag: 'test'
        });
    }

    /**
     * Verzendt match herinnering
     */
    sendMatchReminder(match) {
        if (!this.preferences.matchReminders) return;

        const matchDate = new Date(match.date);
        const now = new Date();
        const hoursUntilMatch = (matchDate - now) / (1000 * 60 * 60);

        // Send reminder 24 hours before
        if (hoursUntilMatch > 23 && hoursUntilMatch < 25) {
            this.sendNotification('Wedstrijd Herinnering', {
                body: `Je hebt morgen een wedstrijd tegen ${match.opponent} om ${match.time}`,
                tag: `match-${match.id}`,
                data: { type: 'match', matchId: match.id }
            });
        }
    }

    /**
     * Verzendt training herinnering
     */
    sendTrainingReminder(training) {
        if (!this.preferences.trainingReminders) return;

        this.sendNotification('Training Herinnering', {
            body: `Training vanavond om ${training.time} op ${training.location}`,
            tag: `training-${training.id}`,
            data: { type: 'training', trainingId: training.id }
        });
    }

    /**
     * Verzendt resultaat notificatie
     */
    sendResultNotification(match) {
        if (!this.preferences.results) return;

        this.sendNotification('Wedstrijd Resultaat', {
            body: `RFC Lissewege ${match.result} ${match.opponent}`,
            tag: `result-${match.id}`,
            data: { type: 'result', matchId: match.id }
        });
    }

    /**
     * Verzendt aankondiging notificatie
     */
    sendAnnouncementNotification(announcement) {
        if (!this.preferences.announcements) return;

        this.sendNotification('Nieuwe Aankondiging', {
            body: announcement.title,
            tag: `announcement-${announcement.id}`,
            data: { type: 'announcement', announcementId: announcement.id }
        });
    }

    /**
     * Rendert notificaties
     */
    renderNotifications() {
        const container = document.getElementById('notificationsList');
        if (!container) return;

        container.innerHTML = this.notifications.length === 0
            ? '<p class="no-notifications">Geen notificaties</p>'
            : this.notifications.map(notif => `
                <div class="notification-item ${notif.read ? 'read' : 'unread'}" data-notification-id="${notif.id}">
                    <div class="notification-icon">
                        <i class="fas fa-bell"></i>
                    </div>
                    <div class="notification-content">
                        <h4>${notif.title}</h4>
                        <p>${notif.body || ''}</p>
                        <span class="notification-time">${this.formatTime(notif.timestamp)}</span>
                    </div>
                    ${!notif.read ? '<div class="notification-unread-dot"></div>' : ''}
                </div>
            `).join('');

        // Add click listeners
        container.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.notificationId);
                this.markAsRead(id);
            });
        });
    }

    /**
     * Markeert als gelezen
     */
    markAsRead(id) {
        const notif = this.notifications.find(n => n.id === id);
        if (notif) {
            notif.read = true;
            this.saveNotifications();
            this.renderNotifications();
        }
    }

    /**
     * Markeert alle als gelezen
     */
    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.saveNotifications();
        this.renderNotifications();
    }

    /**
     * Verwijdert notificatie
     */
    deleteNotification(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.saveNotifications();
        this.renderNotifications();
    }

    /**
     * Verwijdert alle notificaties
     */
    clearAllNotifications() {
        this.notifications = [];
        this.saveNotifications();
        this.renderNotifications();
    }

    /**
     * Formateert tijd
     */
    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Zojuist';
        if (diffMins < 60) return `${diffMins} minuten geleden`;
        if (diffHours < 24) return `${diffHours} uur geleden`;
        if (diffDays < 7) return `${diffDays} dagen geleden`;
        return date.toLocaleDateString('nl-BE');
    }

    /**
     * Schakelt notificaties uit
     */
    disableNotifications() {
        this.permission = 'denied';
        this.updatePermissionUI();
    }

    /**
     * Slaat notificaties op
     */
    saveNotifications() {
        localStorage.setItem('notifications_history', JSON.stringify(this.notifications));
    }

    /**
     * Setup automatische herinneringen
     */
    setupAutomaticReminders() {
        // Check for upcoming matches every hour
        setInterval(() => {
            this.checkUpcomingMatches();
        }, 3600000); // 1 hour

        // Check for trainings daily at 8 AM
        const now = new Date();
        const tomorrow8AM = new Date(now);
        tomorrow8AM.setDate(now.getDate() + 1);
        tomorrow8AM.setHours(8, 0, 0, 0);
        const msUntil8AM = tomorrow8AM - now;

        setTimeout(() => {
            this.checkUpcomingTrainings();
            setInterval(() => {
                this.checkUpcomingTrainings();
            }, 86400000); // Daily
        }, msUntil8AM);
    }

    /**
     * Controleert aankomende wedstrijden
     */
    checkUpcomingMatches() {
        // This would fetch from calendar/matches system
        // For now, demo implementation
        const matches = JSON.parse(localStorage.getItem('upcoming_matches') || '[]');
        matches.forEach(match => {
            this.sendMatchReminder(match);
        });
    }

    /**
     * Controleert aankomende trainingen
     */
    checkUpcomingTrainings() {
        // This would fetch from calendar system
        // For now, demo implementation
    }
    }
    window.NotificationsSystem = NotificationsSystem;
}

// Initialiseer wanneer DOM klaar is
if (!window.notificationsSystem) {
    let notificationsSystem;
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.notificationsSystem) {
            notificationsSystem = new NotificationsSystem();
            window.notificationsSystem = notificationsSystem;
            
            // Setup automatic reminders after a delay
            setTimeout(() => {
                notificationsSystem.setupAutomaticReminders();
            }, 5000);
        }
    });
}

