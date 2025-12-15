// ============================================
// USER SYSTEM & LOGIN
// ============================================
function initUserSystem() {
    // Create login modal
    createLoginModal();
    
    // Check if user is logged in
    checkAuthStatus();
}

function createLoginModal() {
    const loginModal = document.createElement('div');
    loginModal.id = 'loginModal';
    loginModal.className = 'login-modal';
    loginModal.innerHTML = `
        <div class="login-content">
            <button class="login-close" id="loginClose">
                <i class="fas fa-times"></i>
            </button>
            <h2>Inloggen</h2>
            <form id="loginForm" class="login-form">
                <div class="form-group">
                    <label for="loginEmail">E-mail</label>
                    <input type="email" id="loginEmail" required>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Wachtwoord</label>
                    <input type="password" id="loginPassword" required>
                </div>
                <button type="submit" class="btn-new btn-new-block btn-new-accent">
                    <span>Inloggen</span>
                    <i class="fas fa-sign-in-alt"></i>
                </button>
                <p class="login-footer">
                    Geen account? <a href="#" id="registerLink">Registreer hier</a>
                </p>
            </form>
        </div>
    `;

    document.body.appendChild(loginModal);

    // Add login button to sidebar
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        const loginBtn = document.createElement('button');
        loginBtn.className = 'sidebar-login-btn';
        loginBtn.innerHTML = '<i class="fas fa-user"></i> <span>Inloggen</span>';
        loginBtn.addEventListener('click', () => {
            loginModal.style.display = 'flex';
        });

        const sidebarNav = sidebar.querySelector('.sidebar-nav');
        if (sidebarNav) {
            sidebarNav.insertAdjacentElement('afterend', loginBtn);
        }
    }

    // Close modal
    document.getElementById('loginClose').addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Login form handler
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // In production, this would authenticate with a backend
        // For now, just store in localStorage
        if (email && password) {
            localStorage.setItem('user', JSON.stringify({ email, loggedIn: true }));
            loginModal.style.display = 'none';
            updateUserUI();
            alert('Succesvol ingelogd!');
        }
    });

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .login-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        .login-content {
            background: var(--white);
            padding: 3rem;
            border-radius: 16px;
            max-width: 400px;
            width: 90%;
            position: relative;
        }
        .login-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-color);
        }
        .login-form {
            margin-top: 2rem;
        }
        .login-footer {
            text-align: center;
            margin-top: 1.5rem;
            color: var(--text-light);
        }
        .login-footer a {
            color: var(--primary-color);
            font-weight: 600;
        }
        .sidebar-login-btn {
            width: calc(100% - 3rem);
            margin: 1rem 1.5rem;
            padding: 1rem;
            background: var(--accent-color);
            color: var(--white);
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            justify-content: center;
        }
        .user-profile {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 1.5rem;
            color: var(--white);
        }
        .user-avatar {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;
    document.head.appendChild(style);
}

function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.loggedIn) {
        updateUserUI();
    }
}

function updateUserUI() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const loginBtn = sidebar.querySelector('.sidebar-login-btn');
    if (loginBtn && user && user.loggedIn) {
        loginBtn.innerHTML = `
            <div class="user-profile">
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <span>${user.email}</span>
            </div>
        `;
        loginBtn.onclick = () => {
            localStorage.removeItem('user');
            location.reload();
        };
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUserSystem);
} else {
    initUserSystem();
}

