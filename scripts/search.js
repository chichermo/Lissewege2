// ============================================
// SITE SEARCH FUNCTIONALITY
// ============================================
const searchData = [];

function initSearch() {
    // Collect searchable content
    collectSearchData();

    // Create search box if it doesn't exist
    createSearchBox();

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (!searchInput || !searchResults) return;

    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim().toLowerCase();

        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }

        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });

    // Close results on outside click
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

function collectSearchData() {
    // Collect from sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        const id = section.id;
        const title = section.querySelector('.section-title')?.textContent || '';
        const description = section.querySelector('.section-description')?.textContent || '';

        if (title) {
            searchData.push({
                type: 'section',
                id: id,
                title: title,
                description: description,
                icon: 'fas fa-file-alt'
            });
        }
    });

    // Collect from news
    document.querySelectorAll('.news-card').forEach(card => {
        const title = card.querySelector('h3, h4')?.textContent || '';
        const content = card.querySelector('p')?.textContent || '';

        if (title) {
            searchData.push({
                type: 'news',
                title: title,
                description: content,
                icon: 'fas fa-newspaper'
            });
        }
    });

    // Collect from teams
    document.querySelectorAll('.team-card').forEach(card => {
        const title = card.querySelector('h3')?.textContent || '';
        const content = card.querySelector('p')?.textContent || '';

        if (title) {
            searchData.push({
                type: 'team',
                title: title,
                description: content,
                icon: 'fas fa-users'
            });
        }
    });

    // Collect from products
    document.querySelectorAll('.product-item, .pricing-product-card').forEach(card => {
        const title = card.querySelector('.product-name, h3, h4')?.textContent || '';
        const content = card.querySelector('.product-desc, .pricing-description')?.textContent || '';

        if (title) {
            searchData.push({
                type: 'product',
                title: title,
                description: content,
                icon: 'fas fa-shopping-bag'
            });
        }
    });
}

function createSearchBox() {
    const mainContent = document.querySelector('.main-content');
    if (document.getElementById('searchContainer')) return;

    const searchHTML = `
        <div class="search-container" id="searchContainer">
            <div class="search-box">
                <input type="text" 
                       id="searchInput" 
                       class="search-input" 
                       placeholder="Zoek op de website...">
                <i class="fas fa-search search-icon"></i>
                <div class="search-results" id="searchResults"></div>
            </div>
        </div>
    `;

    // Target the Home Title Section for better placement
    const targetSection = document.querySelector('.home-title-section');

    if (targetSection) {
        // Insert inside the home title section, after the subtitle
        targetSection.insertAdjacentHTML('beforeend', searchHTML);
    } else if (mainContent) {
        // Fallback: Insert at the beginning of main content
        mainContent.insertAdjacentHTML('afterbegin', searchHTML);
    }
}

function performSearch(query) {
    const results = searchData.filter(item => {
        const searchText = (item.title + ' ' + item.description).toLowerCase();
        return searchText.includes(query);
    });

    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">Geen resultaten gevonden</div>';
        searchResults.classList.add('active');
        return;
    }

    const highlightedResults = results.map(item => {
        const highlightedTitle = highlightText(item.title, query);
        const highlightedDesc = highlightText(item.description.substring(0, 100), query);

        return `
            <div class="search-result-item" data-type="${item.type}">
                <div class="search-result-icon">
                    <i class="${item.icon}"></i>
                </div>
                <div class="search-result-content">
                    <h4>${highlightedTitle}</h4>
                    <p>${highlightedDesc}...</p>
                </div>
            </div>
        `;
    }).join('');

    searchResults.innerHTML = `
        ${highlightedResults}
        <div class="search-stats">${results.length} resultaten gevonden</div>
    `;

    searchResults.classList.add('active');

    // Add click handlers
    searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const type = item.dataset.type;
            // Navigate to relevant section
            if (type === 'section') {
                const result = results[searchResults.querySelectorAll('.search-result-item').indexOf(item)];
                if (result.id) {
                    showPage(result.id);
                    searchResults.classList.remove('active');
                }
            }
        });
    });
}

function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="search-result-highlight">$1</span>');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
} else {
    initSearch();
}

// Re-collect data when page changes
document.addEventListener('pageChanged', () => {
    searchData.length = 0;
    collectSearchData();
});

