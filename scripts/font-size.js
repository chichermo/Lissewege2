// ============================================
// ADJUSTABLE FONT SIZE
// ============================================
function initFontSize() {
    // Create font size controls
    createFontSizeControls();
    
    // Apply saved preference
    applyFontSize();
}

function createFontSizeControls() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const sidebarFooter = sidebar.querySelector('.sidebar-footer');
    if (!sidebarFooter) return;

    const fontSizeControls = document.createElement('div');
    fontSizeControls.className = 'font-size-controls';
    fontSizeControls.innerHTML = `
        <label for="fontSizeSlider">Tekstgrootte</label>
        <div class="font-size-buttons">
            <button class="font-size-btn" data-size="small" aria-label="Kleine tekst">
                <i class="fas fa-font"></i>
            </button>
            <button class="font-size-btn active" data-size="medium" aria-label="Normale tekst">
                <i class="fas fa-font"></i>
            </button>
            <button class="font-size-btn" data-size="large" aria-label="Grote tekst">
                <i class="fas fa-font"></i>
            </button>
        </div>
    `;

    sidebarFooter.insertBefore(fontSizeControls, sidebarFooter.firstChild);

    // Add event listeners
    fontSizeControls.querySelectorAll('.font-size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            fontSizeControls.querySelectorAll('.font-size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const size = btn.dataset.size;
            setFontSize(size);
        });
    });

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .font-size-controls {
            margin-bottom: 1rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
        }
        .font-size-controls label {
            display: block;
            color: var(--white);
            font-size: 0.85rem;
            margin-bottom: 0.75rem;
            font-weight: 600;
        }
        .font-size-buttons {
            display: flex;
            gap: 0.5rem;
        }
        .font-size-btn {
            flex: 1;
            padding: 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            color: var(--white);
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.75rem;
        }
        .font-size-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        .font-size-btn.active {
            background: var(--accent-color);
            border-color: var(--accent-color);
        }
        .font-size-small {
            font-size: 0.9rem;
        }
        .font-size-large {
            font-size: 1.1rem;
        }
    `;
    document.head.appendChild(style);
}

function setFontSize(size) {
    const sizes = {
        small: '0.9rem',
        medium: '1rem',
        large: '1.1rem'
    };

    document.documentElement.style.fontSize = sizes[size] || sizes.medium;
    localStorage.setItem('fontSize', size);
}

function applyFontSize() {
    const savedSize = localStorage.getItem('fontSize') || 'medium';
    setFontSize(savedSize);
    
    // Update active button
    setTimeout(() => {
        const activeBtn = document.querySelector(`.font-size-btn[data-size="${savedSize}"]`);
        if (activeBtn) {
            document.querySelectorAll('.font-size-btn').forEach(b => b.classList.remove('active'));
            activeBtn.classList.add('active');
        }
    }, 100);
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFontSize);
} else {
    initFontSize();
}

