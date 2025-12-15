// ============================================
// ENHANCED NEWS SYSTEM
// ============================================
function initNewsEnhanced() {
    addNewsCategories();
    addSocialShare();
    addNewsPagination();
}

function addNewsCategories() {
    const newsSection = document.getElementById('nieuws');
    if (!newsSection) return;

    const sectionHeader = newsSection.querySelector('.section-header');
    if (!sectionHeader) return;

    const categoriesHTML = `
        <div class="news-categories">
            <button class="news-category-btn active" data-category="all">
                <span>Alles</span>
            </button>
            <button class="news-category-btn" data-category="team">
                <span>Team</span>
            </button>
            <button class="news-category-btn" data-category="matches">
                <span>Wedstrijden</span>
            </button>
            <button class="news-category-btn" data-category="events">
                <span>Evenementen</span>
            </button>
            <button class="news-category-btn" data-category="general">
                <span>Algemeen</span>
            </button>
        </div>
    `;

    sectionHeader.insertAdjacentHTML('afterend', categoriesHTML);

    // Add data attributes to news cards
    const newsCards = newsSection.querySelectorAll('.news-card');
    newsCards.forEach((card, index) => {
        const categories = ['team', 'matches', 'events', 'general'];
        card.setAttribute('data-category', categories[index % categories.length]);
    });

    // Filter functionality
    document.querySelectorAll('.news-category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.news-category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            filterNews(category);
        });
    });

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .news-categories {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
        }
        .news-category-btn {
            padding: 0.75rem 1.5rem;
            background: var(--white);
            border: 2px solid rgba(13, 77, 46, 0.2);
            border-radius: 9999px;
            color: var(--text-color);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .news-category-btn:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }
        .news-category-btn.active {
            background: var(--gradient-primary);
            border-color: var(--primary-color);
            color: var(--white);
        }
        .news-card {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .news-card.hidden {
            opacity: 0;
            transform: scale(0.9);
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

function filterNews(category) {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function addSocialShare() {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'news-share-btn';
        shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
        shareBtn.setAttribute('aria-label', 'Deel nieuws');
        
        const newsContent = card.querySelector('.news-content');
        if (newsContent) {
            newsContent.appendChild(shareBtn);
        }

        shareBtn.addEventListener('click', () => {
            const title = card.querySelector('h3')?.textContent || '';
            const url = window.location.href;
            shareNews(title, url);
        });
    });

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .news-share-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            color: var(--primary-color);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        .news-share-btn:hover {
            background: var(--primary-color);
            color: var(--white);
            transform: scale(1.1);
        }
        .news-content {
            position: relative;
        }
    `;
    document.head.appendChild(style);
}

function shareNews(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url);
        alert('Link gekopieerd naar klembord!');
    }
}

function addNewsPagination() {
    const newsSection = document.getElementById('nieuws');
    if (!newsSection) return;

    const newsMasonry = newsSection.querySelector('.news-masonry');
    if (!newsMasonry) return;

    // For now, just add pagination structure
    // Full implementation would require backend or more complex logic
    const pagination = document.createElement('div');
    pagination.className = 'news-pagination';
    pagination.innerHTML = `
        <button class="pagination-btn" disabled>
            <i class="fas fa-chevron-left"></i>
        </button>
        <span class="pagination-info">Pagina 1 van 1</span>
        <button class="pagination-btn" disabled>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    newsMasonry.insertAdjacentElement('afterend', pagination);
}

// Initialize when news section is shown
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initNewsEnhanced, 500);
    });
} else {
    setTimeout(initNewsEnhanced, 500);
}

