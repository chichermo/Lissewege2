// ============================================
// BASIC ADMIN PANEL
// ============================================
function initAdminPanel() {
    // Create admin panel (hidden by default)
    createAdminPanel();
}

function createAdminPanel() {
    // Admin panel button (hidden, accessible via URL parameter ?admin=true)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') !== 'true') return;

    const adminPanel = document.createElement('div');
    adminPanel.id = 'adminPanel';
    adminPanel.className = 'admin-panel';
    adminPanel.innerHTML = `
        <div class="admin-header">
            <h3><i class="fas fa-cog"></i> Admin Panel</h3>
            <button class="admin-close" id="adminClose">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="admin-content">
            <div class="admin-section">
                <h4>Nieuws Beheer</h4>
                <button class="admin-btn" onclick="addNewsItem()">
                    <i class="fas fa-plus"></i> Voeg Nieuws Toe
                </button>
                <button class="admin-btn" onclick="editNewsItem()">
                    <i class="fas fa-edit"></i> Bewerk Nieuws
                </button>
            </div>
            <div class="admin-section">
                <h4>Spelers Beheer</h4>
                <button class="admin-btn" onclick="addPlayer()">
                    <i class="fas fa-user-plus"></i> Voeg Speler Toe
                </button>
                <button class="admin-btn" onclick="editPlayer()">
                    <i class="fas fa-user-edit"></i> Bewerk Speler
                </button>
            </div>
            <div class="admin-section">
                <h4>Wedstrijden</h4>
                <button class="admin-btn" onclick="addMatch()">
                    <i class="fas fa-calendar-plus"></i> Voeg Wedstrijd Toe
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(adminPanel);

    document.getElementById('adminClose').addEventListener('click', () => {
        adminPanel.style.display = 'none';
    });

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .admin-panel {
            position: fixed;
            top: 0;
            right: -400px;
            width: 400px;
            height: 100vh;
            background: var(--white);
            box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
            z-index: 10001;
            transition: right 0.3s ease;
            overflow-y: auto;
        }
        .admin-panel.active {
            right: 0;
        }
        .admin-header {
            background: var(--gradient-primary);
            color: var(--white);
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .admin-close {
            background: none;
            border: none;
            color: var(--white);
            font-size: 1.5rem;
            cursor: pointer;
        }
        .admin-content {
            padding: 2rem;
        }
        .admin-section {
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid rgba(13, 77, 46, 0.1);
        }
        .admin-section h4 {
            margin-bottom: 1rem;
            color: var(--dark-color);
        }
        .admin-btn {
            width: 100%;
            padding: 0.75rem;
            margin-bottom: 0.5rem;
            background: var(--light-color);
            border: 2px solid rgba(13, 77, 46, 0.2);
            border-radius: 8px;
            color: var(--text-color);
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
        }
        .admin-btn:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);

    // Show panel
    setTimeout(() => {
        adminPanel.classList.add('active');
    }, 100);
}

// Admin functions (placeholders)
window.addNewsItem = function() {
    alert('Functie: Voeg nieuws item toe\n(In productie zou dit een formulier openen)');
};

window.editNewsItem = function() {
    alert('Functie: Bewerk nieuws item\n(In productie zou dit een editor openen)');
};

window.addPlayer = function() {
    alert('Functie: Voeg speler toe\n(In productie zou dit een formulier openen)');
};

window.editPlayer = function() {
    alert('Functie: Bewerk speler\n(In productie zou dit een editor openen)');
};

window.addMatch = function() {
    alert('Functie: Voeg wedstrijd toe\n(In productie zou dit een formulier openen)');
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminPanel);
} else {
    initAdminPanel();
}

