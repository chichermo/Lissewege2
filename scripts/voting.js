// ============================================
// SQUAD HIGHLIGHTS (API)
// ============================================
async function initSquadHighlights() {
    const homeSection = document.getElementById('home');
    if (!homeSection || !window.realFootballAPI) return;

    const teamId = window.APP_CONFIG?.teamIds?.apiFootball;
    if (!teamId) return;

    const squad = await window.realFootballAPI.getTeamSquad(teamId);
    if (!squad || squad.length === 0) return;

    const highlights = squad.slice(0, 6);
    const cardsHtml = highlights.map(player => {
        const age = player.age ? `${player.age} jaar` : '';
        const number = player.number ? `#${player.number}` : '';
        const photo = player.photo ? `<img src="${player.photo}" alt="${player.name}" loading="lazy">` : '<i class="fas fa-user"></i>';
        return `
            <div class="squad-highlight-card">
                <div class="squad-highlight-photo">${photo}</div>
                <h4>${player.name || 'Speler'}</h4>
                <div class="squad-highlight-meta">
                    <span>${player.position || 'Positie'}</span>
                    <span>${player.nationality || 'N/A'}</span>
                    ${number ? `<span>${number}</span>` : ''}
                    ${age ? `<span>${age}</span>` : ''}
                </div>
                <a href="#spelers" class="btn-new btn-new-outline">
                    <span>Bekijk Spelers</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
    }).join('');

    const sectionHtml = `
        <div class="squad-highlights-section">
            <div class="section-header">
                <span class="section-tag">Selectie</span>
                <h2 class="section-title">Spelers uit de Selectie</h2>
                <p class="section-description">Overzicht van de officiële spelerslijst uit de API.</p>
            </div>
            <div class="squad-highlights-grid">
                ${cardsHtml}
            </div>
        </div>
    `;

    const homeContent = document.querySelector('.home-content-wrapper');
    if (homeContent) {
        homeContent.insertAdjacentHTML('beforeend', sectionHtml);
    }

    if (!document.querySelector('#squadHighlightsStyle')) {
        const style = document.createElement('style');
        style.id = 'squadHighlightsStyle';
        style.textContent = `
            .squad-highlights-section {
                margin-top: 3.5rem;
            }
            .squad-highlights-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 1.5rem;
            }
            .squad-highlight-card {
                background: var(--white);
                border-radius: 16px;
                padding: 1.5rem;
                text-align: center;
                border: 1px solid var(--border-subtle);
                box-shadow: var(--shadow-card);
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            .squad-highlight-photo {
                width: 90px;
                height: 90px;
                border-radius: 50%;
                background: var(--gradient-primary);
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto;
                overflow: hidden;
                color: var(--white);
                font-size: 2rem;
            }
            .squad-highlight-photo img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .squad-highlight-meta {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 0.5rem;
                font-size: 0.85rem;
                color: var(--text-light);
            }
        `;
        document.head.appendChild(style);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSquadHighlights);
} else {
    initSquadHighlights();
}
