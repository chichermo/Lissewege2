// ============================================
// VOTING SYSTEM
// ============================================
function initVoting() {
    // Add voting section to home or players section
    addVotingSection();
}

function addVotingSection() {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    const votingHTML = `
        <div class="voting-section">
            <div class="section-header">
                <span class="section-tag">Stemmen</span>
                <h2 class="section-title">Speler van de Maand</h2>
                <p class="section-description">Stem op je favoriete speler!</p>
            </div>
            <div class="voting-candidates">
                <div class="voting-candidate">
                    <div class="candidate-image">
                        <i class="fas fa-user"></i>
                    </div>
                    <h4>Speler 1</h4>
                    <div class="candidate-stats">
                        <span>5 goals</span>
                        <span>3 assists</span>
                    </div>
                    <button class="btn-new btn-new-outline vote-btn" data-candidate="1">
                        <span>Stem</span>
                        <i class="fas fa-vote-yea"></i>
                    </button>
                    <div class="vote-count">0 stemmen</div>
                </div>
                <div class="voting-candidate">
                    <div class="candidate-image">
                        <i class="fas fa-user"></i>
                    </div>
                    <h4>Speler 2</h4>
                    <div class="candidate-stats">
                        <span>3 goals</span>
                        <span>5 assists</span>
                    </div>
                    <button class="btn-new btn-new-outline vote-btn" data-candidate="2">
                        <span>Stem</span>
                        <i class="fas fa-vote-yea"></i>
                    </button>
                    <div class="vote-count">0 stemmen</div>
                </div>
                <div class="voting-candidate">
                    <div class="candidate-image">
                        <i class="fas fa-user"></i>
                    </div>
                    <h4>Speler 3</h4>
                    <div class="candidate-stats">
                        <span>4 goals</span>
                        <span>2 assists</span>
                    </div>
                    <button class="btn-new btn-new-outline vote-btn" data-candidate="3">
                        <span>Stem</span>
                        <i class="fas fa-vote-yea"></i>
                    </button>
                    <div class="vote-count">0 stemmen</div>
                </div>
            </div>
            <div class="voting-results" id="votingResults" style="display: none;">
                <h3>Resultaten</h3>
                <div class="results-chart" id="resultsChart"></div>
            </div>
        </div>
    `;

    const homeContent = document.querySelector('.home-content-wrapper');
    if (homeContent) {
        homeContent.insertAdjacentHTML('beforeend', votingHTML);
    }

    // Initialize voting
    initVoteButtons();

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .voting-section {
            margin-top: 4rem;
            padding-top: 4rem;
            border-top: 2px solid rgba(13, 77, 46, 0.1);
        }
        .voting-candidates {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        .voting-candidate {
            background: var(--white);
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(13, 77, 46, 0.08);
            transition: all 0.3s ease;
        }
        .voting-candidate:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 32px rgba(13, 77, 46, 0.15);
        }
        .candidate-image {
            width: 100px;
            height: 100px;
            background: var(--gradient-primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: var(--white);
            font-size: 2.5rem;
        }
        .voting-candidate h4 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--dark-color);
        }
        .candidate-stats {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            color: var(--text-light);
            font-size: 0.9rem;
        }
        .vote-count {
            margin-top: 1rem;
            font-weight: 600;
            color: var(--primary-color);
        }
        .voting-results {
            margin-top: 3rem;
            padding: 2rem;
            background: var(--light-color);
            border-radius: 16px;
        }
        .results-chart {
            margin-top: 2rem;
        }
    `;
    document.head.appendChild(style);
}

function initVoteButtons() {
    const voteButtons = document.querySelectorAll('.vote-btn');
    const voteCounts = {};

    // Load votes from localStorage
    const savedVotes = JSON.parse(localStorage.getItem('votes') || '{}');
    Object.assign(voteCounts, savedVotes);

    // Update vote counts display
    function updateVoteCounts() {
        document.querySelectorAll('.voting-candidate').forEach(candidate => {
            const btn = candidate.querySelector('.vote-btn');
            const candidateId = btn.dataset.candidate;
            const count = voteCounts[candidateId] || 0;
            const countEl = candidate.querySelector('.vote-count');
            if (countEl) {
                countEl.textContent = `${count} stemmen`;
            }
        });
    }

    voteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const candidateId = btn.dataset.candidate;
            
            // Check if user already voted
            const lastVote = localStorage.getItem('lastVote');
            if (lastVote === candidateId) {
                alert('Je hebt al gestemd voor deze speler!');
                return;
            }

            // Add vote
            voteCounts[candidateId] = (voteCounts[candidateId] || 0) + 1;
            localStorage.setItem('votes', JSON.stringify(voteCounts));
            localStorage.setItem('lastVote', candidateId);

            updateVoteCounts();
            showVotingResults();
            
            btn.classList.add('active');
            btn.innerHTML = '<span>Gestemd!</span> <i class="fas fa-check"></i>';
            btn.disabled = true;
        });
    });

    updateVoteCounts();
}

function showVotingResults() {
    const resultsSection = document.getElementById('votingResults');
    if (!resultsSection) return;

    resultsSection.style.display = 'block';
    
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');
    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
    
    if (totalVotes === 0) return;

    const chart = document.getElementById('resultsChart');
    if (!chart) return;

    chart.innerHTML = Object.entries(votes).map(([id, count]) => {
        const percentage = (count / totalVotes) * 100;
        return `
            <div class="result-bar">
                <div class="result-label">Speler ${id}</div>
                <div class="result-bar-container">
                    <div class="result-bar-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="result-value">${count} (${percentage.toFixed(1)}%)</div>
            </div>
        `;
    }).join('');

    // Add CSS for results
    if (!document.querySelector('#votingResultsStyle')) {
        const style = document.createElement('style');
        style.id = 'votingResultsStyle';
        style.textContent = `
            .result-bar {
                margin-bottom: 1.5rem;
            }
            .result-label {
                font-weight: 600;
                margin-bottom: 0.5rem;
            }
            .result-bar-container {
                height: 30px;
                background: rgba(13, 77, 46, 0.1);
                border-radius: 9999px;
                overflow: hidden;
                margin-bottom: 0.5rem;
            }
            .result-bar-fill {
                height: 100%;
                background: var(--gradient-primary);
                transition: width 0.5s ease;
            }
            .result-value {
                font-size: 0.9rem;
                color: var(--text-light);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when home section is shown
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initVoting, 500);
    });
} else {
    setTimeout(initVoting, 500);
}

