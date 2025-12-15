// ============================================
// CLUB TIMELINE
// ============================================
function initTimeline() {
    // Add timeline to about section
    addTimeline();
}

function addTimeline() {
    const aboutSection = document.getElementById('over-ons');
    if (!aboutSection) return;

    const timelineHTML = `
        <div class="timeline-section">
            <div class="section-header">
                <span class="section-tag">Geschiedenis</span>
                <h2 class="section-title">Onze Geschiedenis</h2>
            </div>
            <div class="timeline-container">
                <div class="timeline-item">
                    <div class="timeline-year">1947</div>
                    <div class="timeline-content">
                        <h3>Oprichting</h3>
                        <p>R.F.C. Lissewege wordt opgericht en begint met vriendschappelijke wedstrijden.</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-year">1950</div>
                    <div class="timeline-content">
                        <h3>Eerste Competitie</h3>
                        <p>De club neemt deel aan officiële competities voor het eerst.</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-year">1975</div>
                    <div class="timeline-content">
                        <h3>Eerste Kampioenschap</h3>
                        <p>Het eerste kampioenschap wordt behaald door het eerste team.</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-year">2000</div>
                    <div class="timeline-content">
                        <h3>Jeugdacademie</h3>
                        <p>Start van de jeugdacademie met focus op ontwikkeling van jonge spelers.</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-year">2025</div>
                    <div class="timeline-content">
                        <h3>Nieuw U15 Team</h3>
                        <p>Uitbreiding met een nieuw U15 team voor seizoen 2025-2026.</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    aboutSection.insertAdjacentHTML('beforeend', timelineHTML);

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .timeline-section {
            margin-top: 5rem;
            padding-top: 5rem;
            border-top: 2px solid rgba(13, 77, 46, 0.1);
        }
        .timeline-container {
            position: relative;
            max-width: 800px;
            margin: 3rem auto 0;
            padding-left: 3rem;
        }
        .timeline-container::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: var(--gradient-primary);
            border-radius: 2px;
        }
        .timeline-item {
            position: relative;
            margin-bottom: 3rem;
            padding-left: 3rem;
        }
        .timeline-item::before {
            content: '';
            position: absolute;
            left: -1.5rem;
            top: 0.5rem;
            width: 20px;
            height: 20px;
            background: var(--accent-color);
            border: 4px solid var(--white);
            border-radius: 50%;
            box-shadow: 0 0 0 4px var(--primary-color);
        }
        .timeline-year {
            position: absolute;
            left: -6rem;
            top: 0;
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--primary-color);
            font-family: 'Orbitron', sans-serif;
            white-space: nowrap;
        }
        .timeline-content {
            background: var(--white);
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border-left: 4px solid var(--primary-color);
        }
        .timeline-content h3 {
            font-size: 1.5rem;
            margin-bottom: 0.75rem;
            color: var(--dark-color);
        }
        .timeline-content p {
            color: var(--text-light);
            line-height: 1.7;
            margin: 0;
        }
        @media (max-width: 768px) {
            .timeline-container {
                padding-left: 2rem;
            }
            .timeline-year {
                position: static;
                display: block;
                margin-bottom: 1rem;
            }
            .timeline-item {
                padding-left: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize when about section is shown
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initTimeline, 500);
    });
} else {
    setTimeout(initTimeline, 500);
}

