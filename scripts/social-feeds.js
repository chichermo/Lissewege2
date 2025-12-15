// ============================================
// SOCIAL MEDIA FEEDS INTEGRATION
// ============================================
function initSocialFeeds() {
    // Add social feeds section to home or news
    addSocialFeedsSection();
}

function addSocialFeedsSection() {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    // Create social feeds section
    const feedsHTML = `
        <div class="social-feeds-section">
            <h3 class="social-feeds-title">
                <i class="fab fa-facebook"></i>
                Volg Ons op Social Media
            </h3>
            <div class="social-feeds-grid">
                <div class="social-feed-item">
                    <div class="social-feed-placeholder">
                        <i class="fab fa-facebook"></i>
                        <p>Facebook Feed</p>
                        <small>Voeg Facebook Widget toe</small>
                    </div>
                </div>
                <div class="social-feed-item">
                    <div class="social-feed-placeholder">
                        <i class="fab fa-instagram"></i>
                        <p>Instagram Feed</p>
                        <small>Voeg Instagram Widget toe</small>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Insert before footer or at end of home content
    const homeContent = homeSection.querySelector('.home-content-wrapper');
    if (homeContent) {
        homeContent.insertAdjacentHTML('beforeend', feedsHTML);
    }

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .social-feeds-section {
            margin-top: 4rem;
            padding-top: 4rem;
            border-top: 2px solid rgba(13, 77, 46, 0.1);
        }
        .social-feeds-title {
            font-size: 2rem;
            font-weight: 800;
            text-align: center;
            margin-bottom: 3rem;
            color: var(--dark-color);
        }
        .social-feeds-title i {
            color: var(--accent-color);
            margin-right: 1rem;
        }
        .social-feeds-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        .social-feed-item {
            background: var(--white);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            min-height: 400px;
        }
        .social-feed-placeholder {
            height: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--text-light);
            text-align: center;
            padding: 2rem;
        }
        .social-feed-placeholder i {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: var(--primary-color);
        }
        .social-feed-placeholder p {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
    `;
    document.head.appendChild(style);

    // Instructions for adding real feeds
    console.log('To add real social feeds:');
    console.log('1. Facebook: Use Facebook Page Plugin');
    console.log('2. Instagram: Use Instagram Embed API');
    console.log('3. Replace placeholder divs with actual embed code');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSocialFeeds);
} else {
    initSocialFeeds();
}

