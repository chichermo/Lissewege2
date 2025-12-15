// ============================================
// ADMIN MANAGER
// ============================================
// Administratief beheer voor voorzitter en directie

class AdminManager {
    constructor() {
        this.init();
    }

    init() {
        this.initQuickActions();
    }

    /**
     * Initialiseert de snelle acties
     */
    initQuickActions() {
        // Lid toevoegen
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.closest('.quick-action-btn');
                if (action) {
                    const icon = action.querySelector('i');
                    if (icon && icon.classList.contains('fa-user-plus')) {
                        this.openAddMemberModal();
                    } else if (icon && icon.classList.contains('fa-file-upload')) {
                        this.openUploadDocumentModal();
                    } else if (icon && icon.classList.contains('fa-bullhorn')) {
                        this.openGeneralAnnouncementModal();
                    } else if (icon && icon.classList.contains('fa-chart-bar')) {
                        this.openReportsModal();
                    }
                }
            });
        });
    }

    /**
     * Opent modal om lid toe te voegen
     */
    openAddMemberModal() {
        alert('Functionaliteit: Nieuw lid toevoegen aan de club');
        // Hier zou de echte modal worden geïmplementeerd
    }

    /**
     * Opent modal om document te uploaden
     */
    openUploadDocumentModal() {
        alert('Functionaliteit: Nieuw document uploaden');
        // Hier zou de echte modal worden geïmplementeerd
    }

    /**
     * Opent modal voor algemene aankondiging
     */
    openGeneralAnnouncementModal() {
        alert('Functionaliteit: Algemene aankondiging maken voor alle leden');
        // Hier zou de echte modal worden geïmplementeerd
    }

    /**
     * Opent rapporten modal
     */
    openReportsModal() {
        alert('Functionaliteit: Rapporten en statistieken van de club bekijken');
        // Hier zou de echte modal worden geïmplementeerd
    }

    /**
     * Opent documenten sectie
     */
    openDocuments() {
        if (window.membersSections) {
            window.membersSections.loadSection('documents');
        }
    }

    /**
     * Opent administratie sectie
     */
    openAdministration() {
        alert('Functionaliteit: Administratiepaneel van de club');
        // Hier zou het volledige paneel worden geïmplementeerd
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.adminManager = new AdminManager();
});

