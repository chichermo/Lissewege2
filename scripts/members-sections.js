// ============================================
// MEMBERS SECTIONS MANAGEMENT
// ============================================
// Gestión de diferentes secciones dentro del área de miembros

class MembersSections {
    constructor() {
        this.currentSection = 'dashboard';
        this.userRole = this.getUserRole();
        this.init();
    }

    /**
     * Obtiene el rol del usuario actual
     */
    getUserRole() {
        const session = localStorage.getItem('rfc_lissewege_member_session');
        if (session) {
            try {
                const data = JSON.parse(session);
                return data.user?.role || 'member';
            } catch (e) {
                return 'member';
            }
        }
        return 'member';
    }

    /**
     * Inicializa las secciones
     */
    init() {
        this.initTabs();
        this.initRoleBasedAccess();
        this.loadSection('dashboard');
    }

    /**
     * Inicializa los tabs de navegación
     */
    initTabs() {
        const tabs = document.querySelectorAll('.members-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const section = tab.dataset.section;
                this.loadSection(section);
            });
        });
    }

    /**
     * Controla el acceso basado en roles
     */
    initRoleBasedAccess() {
        const adminSections = document.querySelectorAll('.admin-only');
        const coachSections = document.querySelectorAll('.coach-only');
        const memberSections = document.querySelectorAll('.member-only');

        // Mostrar/ocultar según rol
        if (this.userRole === 'admin' || this.userRole === 'president') {
            adminSections.forEach(el => el.style.display = 'block');
            coachSections.forEach(el => el.style.display = 'block');
            memberSections.forEach(el => el.style.display = 'block');
        } else if (this.userRole === 'coach') {
            adminSections.forEach(el => el.style.display = 'none');
            coachSections.forEach(el => el.style.display = 'block');
            memberSections.forEach(el => el.style.display = 'block');
        } else {
            adminSections.forEach(el => el.style.display = 'none');
            coachSections.forEach(el => el.style.display = 'none');
            memberSections.forEach(el => el.style.display = 'block');
        }
    }

    /**
     * Carga una sección específica
     */
    loadSection(sectionId) {
        // Ocultar todas las secciones
        const sections = document.querySelectorAll('.members-section-content');
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        // Mostrar la sección seleccionada
        const targetSection = document.getElementById(`section-${sectionId}`);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
            this.currentSection = sectionId;

            // Actualizar tabs activos
            document.querySelectorAll('.members-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.section === sectionId) {
                    tab.classList.add('active');
                }
            });

            // Cargar contenido específico de la sección
            this.loadSectionContent(sectionId);
        }
    }

    /**
     * Carga el contenido específico de cada sección
     */
    loadSectionContent(sectionId) {
        switch(sectionId) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'admin':
                if (this.userRole === 'admin' || this.userRole === 'president') {
                    this.loadAdminSection();
                }
                break;
            case 'coach':
                if (this.userRole === 'coach' || this.userRole === 'admin' || this.userRole === 'president') {
                    this.loadCoachSection();
                }
                break;
            case 'players':
                this.loadPlayersSection();
                break;
            case 'documents':
                this.loadDocumentsSection();
                break;
            case 'finances':
                if (this.userRole === 'admin' || this.userRole === 'president') {
                    this.loadFinancesSection();
                }
                break;
        }
    }

    /**
     * Carga el dashboard
     */
    loadDashboard() {
        // Dashboard is al geladen in HTML
        console.log('Dashboard geladen');
    }

    /**
     * Carga la sección de administración
     */
    loadAdminSection() {
        console.log('Admin sectie geladen');
        // Hier kan dynamische content worden geladen indien nodig
    }

    /**
     * Carga la sección de coaches
     */
    loadCoachSection() {
        console.log('Trainer sectie geladen');
        
        // Zorg dat coach sectie zichtbaar is
        const coachSection = document.getElementById('section-coach');
        if (coachSection) {
            coachSection.style.display = 'block';
            coachSection.classList.add('active');
        }
        
        // Initialiseer coach functionaliteiten
        setTimeout(() => {
            if (window.coachManager) {
                // Herinitialiseer coach manager om tabs te activeren
                window.coachManager.initCoachSubtabs();
            } else {
                // Maak nieuwe coach manager aan als deze nog niet bestaat
                window.coachManager = new CoachManager();
            }
        }, 100);
        
        // Initialiseer enhanced lineup builder wanneer coach sectie wordt getoond
        setTimeout(() => {
            const canvas = document.getElementById('lineupCanvas');
            if (canvas && !window.enhancedLineupBuilder) {
                try {
                    window.enhancedLineupBuilder = new EnhancedLineupBuilder();
                    console.log('Enhanced lineup builder geïnitialiseerd');
                } catch (error) {
                    console.warn('Kon enhanced lineup builder niet initialiseren:', error);
                }
            } else if (canvas && window.enhancedLineupBuilder) {
                // Herinitialiseer als al bestaat
                try {
                    window.enhancedLineupBuilder.init();
                } catch (error) {
                    console.warn('Kon enhanced lineup builder niet herinitialiseren:', error);
                }
            }
        }, 300);
    }

    /**
     * Carga la sección de jugadores
     */
    loadPlayersSection() {
        console.log('Spelers sectie geladen');
    }

    /**
     * Carga la sección de documentos
     */
    loadDocumentsSection() {
        console.log('Documenten sectie geladen');
    }

    /**
     * Carga la sección de finanzas
     */
    loadFinancesSection() {
        console.log('Financiën sectie geladen');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('members')) {
        window.membersSections = new MembersSections();
    }
});

