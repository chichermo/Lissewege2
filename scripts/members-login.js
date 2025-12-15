// ============================================
// MEMBERS LOGIN SYSTEM (Free Access for Now)
// ============================================
// Sistema de login para miembros del club
// Por ahora, el acceso es libre sin autenticación real

class MembersLogin {
    constructor() {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        // Verificar si hay sesión guardada
        const savedSession = localStorage.getItem('rfc_lissewege_member_session');
        if (savedSession) {
            try {
                const session = JSON.parse(savedSession);
                if (session.isLoggedIn && session.user) {
                    this.isLoggedIn = true;
                    this.currentUser = session.user;
                    this.updateUI();
                }
            } catch (e) {
                console.warn('Error al cargar sesión:', e);
            }
        }

        // Inicializar eventos
        this.initLoginForm();
        this.initLogoutButton();
    }

    /**
     * Inicializa el formulario de login
     */
    initLoginForm() {
        const loginForm = document.getElementById('membersLoginForm');
        if (!loginForm) return;

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Botón de acceso libre
        const freeAccessBtn = document.getElementById('freeAccessBtn');
        if (freeAccessBtn) {
            freeAccessBtn.addEventListener('click', () => {
                this.handleFreeAccess();
            });
        }
    }

    /**
     * Inicializa el botón de logout
     */
    initLogoutButton() {
        const logoutBtn = document.getElementById('membersLogoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }
    }

    /**
     * Maneja el login (por ahora acceso libre)
     */
    handleLogin() {
        const emailInput = document.getElementById('memberEmail');
        const nameInput = document.getElementById('memberName');
        
        const email = emailInput?.value || '';
        const name = nameInput?.value || 'Miembro';

        // Por ahora, cualquier entrada permite acceso
        this.login({
            name: name || 'Miembro RFC Lissewege',
            email: email || 'miembro@rfclissewege.be',
            role: 'member',
            memberSince: new Date().toISOString()
        });
    }

    /**
     * Maneja el acceso libre sin formulario
     */
    handleFreeAccess() {
        this.login({
            name: 'Miembro RFC Lissewege',
            email: 'miembro@rfclissewege.be',
            role: 'member',
            memberSince: new Date().toISOString()
        });
    }

    /**
     * Realiza el login
     */
    login(userData) {
        this.isLoggedIn = true;
        this.currentUser = userData;

        // Guardar sesión
        localStorage.setItem('rfc_lissewege_member_session', JSON.stringify({
            isLoggedIn: true,
            user: userData,
            loginTime: new Date().toISOString()
        }));

        // Actualizar UI
        this.updateUI();

        // Cerrar modal de login si existe
        const loginModal = document.getElementById('membersLoginModal');
        if (loginModal) {
            loginModal.classList.remove('active');
        }

        // Mostrar mensaje de bienvenida
        this.showWelcomeMessage();
    }

    /**
     * Maneja el logout
     */
    handleLogout() {
        this.isLoggedIn = false;
        this.currentUser = null;

        // Eliminar sesión
        localStorage.removeItem('rfc_lissewege_member_session');

        // Actualizar UI
        this.updateUI();

        // Mostrar mensaje
        this.showMessage('Sesión cerrada correctamente', 'info');
    }

    /**
     * Actualiza la UI según el estado de login
     */
    updateUI() {
        const membersSection = document.getElementById('members');
        if (!membersSection) return;

        // Mostrar/ocultar contenido según login
        const loginRequired = membersSection.querySelectorAll('.login-required');
        const loggedInContent = membersSection.querySelectorAll('.logged-in-content');
        const loginPrompt = membersSection.querySelector('.login-prompt');

        if (this.isLoggedIn) {
            // Usuario logueado
            loginRequired.forEach(el => el.style.display = 'none');
            loggedInContent.forEach(el => el.style.display = 'block');
            if (loginPrompt) loginPrompt.style.display = 'none';

            // Actualizar información del usuario
            const userNameEl = membersSection.querySelector('.member-name');
            if (userNameEl && this.currentUser) {
                userNameEl.textContent = this.currentUser.name;
            }
        } else {
            // Usuario no logueado
            loginRequired.forEach(el => el.style.display = 'block');
            loggedInContent.forEach(el => el.style.display = 'none');
            if (loginPrompt) loginPrompt.style.display = 'block';
        }
    }

    /**
     * Muestra mensaje de bienvenida
     */
    showWelcomeMessage() {
        const message = `¡Bienvenido, ${this.currentUser.name}!`;
        this.showMessage(message, 'success');
    }

    /**
     * Muestra un mensaje
     */
    showMessage(text, type = 'info') {
        // Crear elemento de mensaje si no existe
        let messageEl = document.getElementById('membersMessage');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'membersMessage';
            messageEl.className = 'members-message';
            document.body.appendChild(messageEl);
        }

        messageEl.textContent = text;
        messageEl.className = `members-message ${type}`;
        messageEl.style.display = 'block';

        // Ocultar después de 3 segundos
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }

    /**
     * Abre el modal de login
     */
    openLoginModal() {
        const loginModal = document.getElementById('membersLoginModal');
        if (loginModal) {
            loginModal.classList.add('active');
        }
    }

    /**
     * Cierra el modal de login
     */
    closeLoginModal() {
        const loginModal = document.getElementById('membersLoginModal');
        if (loginModal) {
            loginModal.classList.remove('active');
        }
    }
}

// Inicializar sistema de login
const membersLogin = new MembersLogin();

// Exportar para uso global
window.membersLogin = membersLogin;

