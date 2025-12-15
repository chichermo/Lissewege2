// ============================================
// ENHANCED CALENDAR FUNCTIONALITY
// ============================================
function initCalendarEnhanced() {
    // Add calendar view toggle
    addCalendarViewToggle();
    
    // Add export functionality
    addCalendarExport();
}

function addCalendarViewToggle() {
    const calendarSection = document.getElementById('kalender');
    if (!calendarSection) return;

    const sectionHeader = calendarSection.querySelector('.section-header');
    if (!sectionHeader) return;

    const viewToggle = document.createElement('div');
    viewToggle.className = 'calendar-view-toggle';
    viewToggle.innerHTML = `
        <button class="view-btn active" data-view="grid">
            <i class="fas fa-th"></i>
            <span>Grid</span>
        </button>
        <button class="view-btn" data-view="list">
            <i class="fas fa-list"></i>
            <span>Lijst</span>
        </button>
        <button class="view-btn" data-view="month">
            <i class="fas fa-calendar"></i>
            <span>Maand</span>
        </button>
    `;

    sectionHeader.insertAdjacentElement('afterend', viewToggle);

    // Toggle functionality
    viewToggle.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            viewToggle.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.dataset.view;
            switchCalendarView(view);
        });
    });

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .calendar-view-toggle {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .view-btn {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: var(--white);
            border: 2px solid rgba(13, 77, 46, 0.2);
            border-radius: 8px;
            color: var(--text-color);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .view-btn:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }
        .view-btn.active {
            background: var(--gradient-primary);
            border-color: var(--primary-color);
            color: var(--white);
        }
        .calendar-list-view {
            display: none;
        }
        .calendar-list-view.active {
            display: block;
        }
        .calendar-list-view .calendar-item {
            display: flex;
            align-items: center;
            gap: 2rem;
            padding: 1.5rem;
            background: var(--white);
            border-radius: 12px;
            margin-bottom: 1rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }
    `;
    document.head.appendChild(style);
}

function switchCalendarView(view) {
    const gridView = document.querySelector('.calendar-grid-modern, .calendar-grid');
    const listView = document.querySelector('.calendar-list-view');
    
    if (view === 'list') {
        if (!listView) {
            createListView();
        } else {
            listView.classList.add('active');
        }
        if (gridView) gridView.style.display = 'none';
    } else if (view === 'grid') {
        if (gridView) gridView.style.display = 'grid';
        if (listView) listView.classList.remove('active');
    }
    // Month view would require a calendar library
}

function createListView() {
    const calendarSection = document.getElementById('kalender');
    if (!calendarSection) return;

    const gridView = calendarSection.querySelector('.calendar-grid-modern, .calendar-grid');
    if (!gridView) return;

    const listView = document.createElement('div');
    listView.className = 'calendar-list-view active';
    
    // Convert grid items to list items
    const items = gridView.querySelectorAll('.match-card, .calendar-card');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        clone.className = 'calendar-item';
        listView.appendChild(clone);
    });

    gridView.insertAdjacentElement('afterend', listView);
}

function addCalendarExport() {
    const calendarSection = document.getElementById('kalender');
    if (!calendarSection) return;

    const sectionHeader = calendarSection.querySelector('.section-header');
    if (!sectionHeader) return;

    const exportBtn = document.createElement('button');
    exportBtn.className = 'btn-new btn-new-outline calendar-export-btn';
    exportBtn.innerHTML = '<i class="fas fa-download"></i> <span>Exporteer naar Calendar</span>';
    
    sectionHeader.insertAdjacentElement('afterend', exportBtn);

    exportBtn.addEventListener('click', () => {
        exportToCalendar();
    });
}

function exportToCalendar() {
    // Get upcoming matches
    const matches = document.querySelectorAll('.match-card, .calendar-card');
    let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//RFC Lissewege//Calendar//NL\n';
    
    matches.forEach((match, index) => {
        const title = match.querySelector('h3')?.textContent || 'Wedstrijd';
        const date = match.querySelector('.match-date, .date-day')?.textContent || '';
        const time = match.querySelector('.match-time')?.textContent || '';
        
        icsContent += `BEGIN:VEVENT\n`;
        icsContent += `SUMMARY:${title}\n`;
        icsContent += `DTSTART:20250101T120000\n`; // Placeholder
        icsContent += `DTEND:20250101T140000\n`;
        icsContent += `END:VEVENT\n`;
    });
    
    icsContent += 'END:VCALENDAR';
    
    // Download file
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rfc-lissewege-calendar.ics';
    a.click();
    URL.revokeObjectURL(url);
}

// Initialize when calendar section is shown
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initCalendarEnhanced, 500);
    });
} else {
    setTimeout(initCalendarEnhanced, 500);
}

