// ============================================
// YOUTUBE/VIMEO INTEGRATION
// ============================================
function initVideoIntegration() {
    // Add video section to home or gallery
    addVideoSection();
}

function addVideoSection() {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    // Create video section
    const videoHTML = `
        <div class="video-section">
            <div class="section-header">
                <span class="section-tag">Video's</span>
                <h2 class="section-title">Bekijk Onze Video's</h2>
            </div>
            <div class="videos-grid">
                <div class="video-item">
                    <div class="video-placeholder" data-video-id="YOUR_VIDEO_ID" data-platform="youtube">
                        <div class="video-thumbnail">
                            <i class="fab fa-youtube"></i>
                        </div>
                        <div class="video-play-btn">
                            <i class="fas fa-play"></i>
                        </div>
                        <h4>Wedstrijd Highlights</h4>
                    </div>
                </div>
                <div class="video-item">
                    <div class="video-placeholder" data-video-id="YOUR_VIDEO_ID" data-platform="youtube">
                        <div class="video-thumbnail">
                            <i class="fab fa-youtube"></i>
                        </div>
                        <div class="video-play-btn">
                            <i class="fas fa-play"></i>
                        </div>
                        <h4>Training Sessie</h4>
                    </div>
                </div>
            </div>
        </div>
    `;

    const homeContent = document.querySelector('.home-content-wrapper');
    if (homeContent) {
        homeContent.insertAdjacentHTML('beforeend', videoHTML);
    }

    // Add click handlers
    document.querySelectorAll('.video-placeholder').forEach(video => {
        video.addEventListener('click', () => {
            const videoId = video.dataset.videoId;
            const platform = video.dataset.platform;
            openVideoModal(videoId, platform);
        });
    });

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .video-section {
            margin-top: 4rem;
            padding-top: 4rem;
        }
        .videos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        .video-item {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }
        .video-item:hover {
            transform: translateY(-4px);
        }
        .video-placeholder {
            position: relative;
            padding-top: 56.25%;
            background: var(--gradient-primary);
        }
        .video-thumbnail {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--white);
            font-size: 4rem;
        }
        .video-play-btn {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-color);
            font-size: 2rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        .video-item h4 {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
            color: var(--white);
            padding: 1.5rem;
            margin: 0;
            font-size: 1.25rem;
        }
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        .video-modal-content {
            position: relative;
            width: 90%;
            max-width: 900px;
        }
        .video-modal-close {
            position: absolute;
            top: -50px;
            right: 0;
            color: var(--white);
            font-size: 2rem;
            cursor: pointer;
            background: none;
            border: none;
        }
        .video-modal iframe {
            width: 100%;
            height: 500px;
            border: none;
            border-radius: 12px;
        }
    `;
    document.head.appendChild(style);
}

function openVideoModal(videoId, platform) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    
    let embedUrl = '';
    if (platform === 'youtube') {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (platform === 'vimeo') {
        embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }

    modal.innerHTML = `
        <div class="video-modal-content">
            <button class="video-modal-close">&times;</button>
            <iframe src="${embedUrl}" allowfullscreen></iframe>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.video-modal-close').addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoIntegration);
} else {
    initVideoIntegration();
}

