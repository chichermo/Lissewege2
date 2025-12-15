// ============================================
// BLOG/NEWS SYSTEM
// ============================================
function initBlog() {
    // Add blog functionality to news section
    addBlogFeatures();
}

function addBlogFeatures() {
    const newsSection = document.getElementById('nieuws');
    if (!newsSection) return;

    // Add archive and pagination
    addBlogArchive();
    addBlogPagination();
}

function addBlogArchive() {
    const newsSection = document.getElementById('nieuws');
    if (!newsSection) return;

    const archiveHTML = `
        <div class="blog-archive">
            <h3>Archief</h3>
            <div class="archive-list">
                <a href="#" class="archive-item">
                    <span class="archive-month">Januari 2025</span>
                    <span class="archive-count">3 artikelen</span>
                </a>
                <a href="#" class="archive-item">
                    <span class="archive-month">December 2024</span>
                    <span class="archive-count">5 artikelen</span>
                </a>
                <a href="#" class="archive-item">
                    <span class="archive-month">November 2024</span>
                    <span class="archive-count">4 artikelen</span>
                </a>
            </div>
        </div>
    `;

    const sectionHeader = newsSection.querySelector('.section-header');
    if (sectionHeader) {
        sectionHeader.insertAdjacentHTML('afterend', archiveHTML);
    }

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .blog-archive {
            background: var(--light-color);
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 3rem;
        }
        .blog-archive h3 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: var(--dark-color);
        }
        .archive-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .archive-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: var(--white);
            border-radius: 8px;
            text-decoration: none;
            color: var(--text-color);
            transition: all 0.3s ease;
        }
        .archive-item:hover {
            transform: translateX(5px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .archive-month {
            font-weight: 600;
        }
        .archive-count {
            color: var(--text-light);
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(style);
}

function addBlogPagination() {
    const newsMasonry = document.querySelector('.news-masonry');
    if (!newsMasonry) return;

    const pagination = document.createElement('div');
    pagination.className = 'blog-pagination';
    pagination.innerHTML = `
        <button class="pagination-btn" disabled>
            <i class="fas fa-chevron-left"></i>
            <span>Vorige</span>
        </button>
        <div class="pagination-numbers">
            <button class="pagination-number active">1</button>
            <button class="pagination-number">2</button>
            <button class="pagination-number">3</button>
        </div>
        <button class="pagination-btn">
            <span>Volgende</span>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    newsMasonry.insertAdjacentElement('afterend', pagination);

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .blog-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            margin-top: 3rem;
        }
        .pagination-btn {
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
        .pagination-btn:hover:not(:disabled) {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }
        .pagination-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .pagination-numbers {
            display: flex;
            gap: 0.5rem;
        }
        .pagination-number {
            width: 40px;
            height: 40px;
            background: var(--white);
            border: 2px solid rgba(13, 77, 46, 0.2);
            border-radius: 8px;
            color: var(--text-color);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .pagination-number:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }
        .pagination-number.active {
            background: var(--gradient-primary);
            border-color: var(--primary-color);
            color: var(--white);
        }
    `;
    document.head.appendChild(style);
}

// Initialize when news section is shown
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initBlog, 500);
    });
} else {
    setTimeout(initBlog, 500);
}

