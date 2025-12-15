// ============================================
// GALLERY FILTERS
// ============================================
function initGalleryFilters() {
    const gallerySection = document.getElementById('galerij');
    if (!gallerySection) return;

    const galleryGrid = gallerySection.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    // Create filter buttons
    const filtersHTML = `
        <div class="gallery-filters">
            <button class="gallery-filter-btn active" data-filter="all">
                <i class="fas fa-th"></i>
                <span>Alles</span>
            </button>
            <button class="gallery-filter-btn" data-filter="teams">
                <i class="fas fa-users"></i>
                <span>Teams</span>
            </button>
            <button class="gallery-filter-btn" data-filter="events">
                <i class="fas fa-calendar"></i>
                <span>Evenementen</span>
            </button>
            <button class="gallery-filter-btn" data-filter="training">
                <i class="fas fa-futbol"></i>
                <span>Training</span>
            </button>
        </div>
    `;

    const sectionHeader = gallerySection.querySelector('.section-header');
    if (sectionHeader) {
        sectionHeader.insertAdjacentHTML('afterend', filtersHTML);
    }

    // Add data attributes to gallery items
    const galleryItems = galleryGrid.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        // Auto-categorize based on content
        const imgAlt = item.querySelector('img')?.alt.toLowerCase() || '';
        const caption = item.querySelector('.gallery-overlay p')?.textContent.toLowerCase() || '';
        
        let category = 'events';
        if (imgAlt.includes('team') || imgAlt.includes('u7') || imgAlt.includes('u8') || 
            imgAlt.includes('u9') || imgAlt.includes('u10') || imgAlt.includes('u13')) {
            category = 'teams';
        } else if (imgAlt.includes('training') || caption.includes('training')) {
            category = 'training';
        }
        
        item.setAttribute('data-category', category);
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            const filter = btn.dataset.filter;
            filterGalleryItems(filter);
        });
    });
}

function filterGalleryItems(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 50);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Add CSS for filters (only if not already added)
if (!document.getElementById('gallery-filters-style')) {
    const galleryFiltersStyle = document.createElement('style');
    galleryFiltersStyle.id = 'gallery-filters-style';
    galleryFiltersStyle.textContent = `
        .gallery-filters {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
        }
        .gallery-filter-btn {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: var(--white);
            border: 2px solid rgba(13, 77, 46, 0.2);
            border-radius: 9999px;
            color: var(--text-color);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .gallery-filter-btn:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }
        .gallery-filter-btn.active {
            background: var(--gradient-primary);
            border-color: var(--primary-color);
            color: var(--white);
        }
        .gallery-item {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(galleryFiltersStyle);
}

// Initialize when gallery section is shown
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initGalleryFilters, 500);
    });
} else {
    setTimeout(initGalleryFilters, 500);
}

