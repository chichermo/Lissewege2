// ============================================
// ADMIN MANAGER
// ============================================
// Gestión administrativa para presidente y directiva

class AdminManager {
    constructor() {
        this.init();
    }

    init() {
        this.initQuickActions();
    }

    /**
     * Inicializa las acciones rápidas
     */
    initQuickActions() {
        // Agregar miembro
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.closest('.quick-action-btn');
                if (action) {
                    const icon = action.querySelector('i');
                    if (icon?.classList.contains('fa-user-plus')) {
                        this.openAddMemberModal();
                    } else if (icon?.classList.contains('fa-file-upload')) {
                        this.openUploadDocumentModal();
                    } else if (icon?.classList.contains('fa-bullhorn')) {
                        this.openGeneralAnnouncementModal();
                    } else if (icon?.classList.contains('fa-chart-bar')) {
                        this.openReportsModal();
                    }
                }
            });
        });
    }

    /**
     * Abre modal para agregar miembro
     */
    openAddMemberModal() {
        alert('Functionaliteit: Nieuw lid toevoegen aan de club');
        // Aquí se implementaría el modal real
    }

    /**
     * Abre modal para subir documento
     */
    openUploadDocumentModal() {
        alert('Functionaliteit: Nieuw document uploaden');
        // Aquí se implementaría el modal real
    }

    /**
     * Abre modal para anuncio general
     */
    openGeneralAnnouncementModal() {
        alert('Functionaliteit: Algemene aankondiging maken voor alle leden');
        // Aquí se implementaría el modal real
    }

    /**
     * Abre modal de reportes
     */
    openReportsModal() {
        alert('Functionaliteit: Rapporten en statistieken van de club bekijken');
        // Aquí se implementaría el modal real
    }

    /**
     * Abre sección de documentos
     */
    openDocuments() {
        if (window.membersSections) {
            window.membersSections.loadSection('documents');
        }
    }

    /**
     * Abre sección de administración
     */
    openAdministration() {
        alert('Functionaliteit: Administratiepaneel van de club');
        // Aquí se implementaría el panel completo
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.adminManager = new AdminManager();
});

