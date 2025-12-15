// ============================================
// ADVANCED STATISTICS WITH CHARTS
// ============================================
function initStatistics() {
    // Add statistics dashboard
    addStatisticsDashboard();
}

function addStatisticsDashboard() {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    const statsHTML = `
        <div class="statistics-dashboard">
            <div class="section-header">
                <span class="section-tag">Statistieken</span>
                <h2 class="section-title">Team Statistieken</h2>
            </div>
            <div class="stats-grid">
                <div class="stat-chart-card">
                    <h3>Goals per Team</h3>
                    <div class="chart-container">
                        <canvas id="goalsChart" width="400" height="200"></canvas>
                    </div>
                </div>
                <div class="stat-chart-card">
                    <h3>Wedstrijden Gewonnen</h3>
                    <div class="chart-container">
                        <canvas id="winsChart" width="400" height="200"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;

    const homeContent = document.querySelector('.home-content-wrapper');
    if (homeContent) {
        homeContent.insertAdjacentHTML('beforeend', statsHTML);
    }

    // Draw simple charts using canvas
    drawCharts();

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .statistics-dashboard {
            margin-top: 4rem;
            padding-top: 4rem;
            border-top: 2px solid rgba(13, 77, 46, 0.1);
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        .stat-chart-card {
            background: var(--white);
            padding: 2.5rem;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(13, 77, 46, 0.08);
        }
        .stat-chart-card h3 {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            color: var(--dark-color);
        }
        .chart-container {
            position: relative;
            height: 250px;
        }
        .chart-container canvas {
            max-width: 100%;
            height: auto;
        }
    `;
    document.head.appendChild(style);
}

function drawCharts() {
    // Simple bar chart for goals
    const goalsCanvas = document.getElementById('goalsChart');
    if (goalsCanvas) {
        const ctx = goalsCanvas.getContext('2d');
        const data = [12, 10, 8, 7, 6];
        const labels = ['U13', 'U10', 'U9', 'U8', 'U7'];
        const maxValue = Math.max(...data);
        
        const barWidth = goalsCanvas.width / data.length - 20;
        const barHeight = goalsCanvas.height - 40;
        
        ctx.fillStyle = '#0d4d2e';
        data.forEach((value, index) => {
            const x = index * (barWidth + 20) + 10;
            const height = (value / maxValue) * barHeight;
            const y = goalsCanvas.height - height - 20;
            
            ctx.fillRect(x, y, barWidth, height);
            
            // Label
            ctx.fillStyle = '#1a1a1a';
            ctx.font = '12px Poppins';
            ctx.fillText(labels[index], x, goalsCanvas.height - 5);
            ctx.fillText(value.toString(), x + barWidth/2 - 5, y - 5);
            ctx.fillStyle = '#0d4d2e';
        });
    }

    // Simple pie chart for wins
    const winsCanvas = document.getElementById('winsChart');
    if (winsCanvas) {
        const ctx = winsCanvas.getContext('2d');
        const data = [15, 12, 8, 5];
        const colors = ['#0d4d2e', '#1a7a4a', '#2d8f5f', '#ff6b35'];
        const total = data.reduce((a, b) => a + b, 0);
        
        let currentAngle = -Math.PI / 2;
        data.forEach((value, index) => {
            const sliceAngle = (value / total) * 2 * Math.PI;
            
            ctx.beginPath();
            ctx.moveTo(winsCanvas.width / 2, winsCanvas.height / 2);
            ctx.arc(winsCanvas.width / 2, winsCanvas.height / 2, 80, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = colors[index];
            ctx.fill();
            
            currentAngle += sliceAngle;
        });
    }
}

// Initialize when home section is shown
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initStatistics, 500);
    });
} else {
    setTimeout(initStatistics, 500);
}

