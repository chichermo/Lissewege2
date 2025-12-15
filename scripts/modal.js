document.addEventListener('DOMContentLoaded', () => {
    // Inject Modal HTML if not present (or assume it's added via HTML)
    // For this implementation, we will assume the HTML is added.

    const modalOverlay = document.getElementById('matchModal');
    const closeModalBtn = document.querySelector('.modal-close');
    const matchLinks = document.querySelectorAll('.match-link, .match-card');

    // Skeleton Elements
    const sTeamHome = document.getElementById('m-team-home');
    const sTeamAway = document.getElementById('m-team-away');
    const sScore = document.getElementById('m-score');

    if (!modalOverlay) return;

    // Open Modal Function
    const openModal = (matchData) => {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling

        // RESET TO SKELETON STATE
        sTeamHome.innerHTML = '<div class="skeleton skeleton-text" style="width: 120px;"></div><div class="skeleton skeleton-avatar" style="width: 80px; height: 80px; margin: 0 auto;"></div>';
        sTeamAway.innerHTML = '<div class="skeleton skeleton-avatar" style="width: 80px; height: 80px; margin: 0 auto;"></div><div class="skeleton skeleton-text" style="width: 120px; margin-top: 10px;"></div>';
        sScore.innerHTML = '<div class="skeleton skeleton-title" style="width: 100px; margin: 0 auto;"></div>';
        sScore.classList.remove('modal-score'); // Remove score styling for skeleton

        // SIMULATE DATA FETCHING
        setTimeout(() => {
            // Update Content
            sTeamHome.innerHTML = `
                <div class="team-logo-placeholder" style="width: 80px; height: 80px; margin: 0 auto 1rem; font-size: 2.5rem;">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h3 style="margin: 0; font-size: 1.2rem;">RFC Lissewege</h3>
            `;

            sTeamAway.innerHTML = `
                <div class="team-logo-placeholder" style="width: 80px; height: 80px; margin: 0 auto 1rem; font-size: 2.5rem; background: #666;">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h3 style="margin: 0; font-size: 1.2rem;">Tegenstander</h3>
            `;

            sScore.innerText = '3 - 1';
            sScore.classList.add('modal-score');

        }, 1500); // 1.5s delay for realistic feel
    };

    // Close Modal Function
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Event Listeners
    matchLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // If it's a link to #kalender, we might want to prevent default if we want to show modal instead
            // For now, let's just make the "Featured Match" link open it, or specific buttons
            if (link.closest('.next-match-widget') || link.classList.contains('match-card')) {
                e.preventDefault();
                openModal();
            }
        });
    });

    closeModalBtn.addEventListener('click', closeModal);

    // Close on outside click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});
