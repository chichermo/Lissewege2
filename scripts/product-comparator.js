// ============================================
// PRODUCT COMPARATOR
// ============================================
function initProductComparator() {
    const pricingSection = document.getElementById('prijslijst');
    if (!pricingSection) return;

    // Add compare button to products
    const products = pricingSection.querySelectorAll('.product-item');
    products.forEach(product => {
        const compareBtn = document.createElement('button');
        compareBtn.className = 'product-compare-btn';
        compareBtn.innerHTML = '<i class="fas fa-balance-scale"></i>';
        compareBtn.setAttribute('aria-label', 'Vergelijk product');
        
        const productInfo = product.querySelector('.product-info');
        if (productInfo) {
            productInfo.insertBefore(compareBtn, productInfo.firstChild);
        }

        compareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCompare(product);
        });
    });

    // Create compare bar
    createCompareBar();

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .product-compare-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.9);
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            color: var(--primary-color);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 10;
        }
        .product-compare-btn:hover {
            background: var(--primary-color);
            color: var(--white);
        }
        .product-compare-btn.active {
            background: var(--accent-color);
            border-color: var(--accent-color);
            color: var(--white);
        }
        .product-item {
            position: relative;
        }
        .compare-bar {
            position: fixed;
            bottom: -100px;
            left: 0;
            right: 0;
            background: var(--white);
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
            padding: 1.5rem;
            z-index: 9999;
            transition: bottom 0.3s ease;
        }
        .compare-bar.active {
            bottom: 0;
        }
        .compare-items {
            display: flex;
            gap: 1rem;
            max-width: 1200px;
            margin: 0 auto;
            overflow-x: auto;
        }
        .compare-item {
            min-width: 200px;
            text-align: center;
        }
        .compare-item img {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 0.5rem;
        }
    `;
    document.head.appendChild(style);
}

let comparedProducts = [];

function toggleCompare(product) {
    const productName = product.querySelector('.product-name')?.textContent || '';
    const index = comparedProducts.findIndex(p => p.name === productName);

    if (index > -1) {
        comparedProducts.splice(index, 1);
        product.querySelector('.product-compare-btn')?.classList.remove('active');
    } else {
        if (comparedProducts.length >= 3) {
            alert('Je kunt maximaal 3 producten vergelijken.');
            return;
        }
        comparedProducts.push({
            name: productName,
            element: product
        });
        product.querySelector('.product-compare-btn')?.classList.add('active');
    }

    updateCompareBar();
}

function createCompareBar() {
    const compareBar = document.createElement('div');
    compareBar.className = 'compare-bar';
    compareBar.id = 'compareBar';
    compareBar.innerHTML = `
        <div class="compare-items" id="compareItems"></div>
        <div style="text-align: center; margin-top: 1rem;">
            <button class="btn-new btn-new-accent" id="compareBtn">Vergelijk</button>
            <button class="btn-new btn-new-outline" id="clearCompareBtn">Wissen</button>
        </div>
    `;
    document.body.appendChild(compareBar);

    document.getElementById('clearCompareBtn')?.addEventListener('click', () => {
        comparedProducts = [];
        document.querySelectorAll('.product-compare-btn').forEach(btn => btn.classList.remove('active'));
        updateCompareBar();
    });

    document.getElementById('compareBtn')?.addEventListener('click', () => {
        showComparison();
    });
}

function updateCompareBar() {
    const compareBar = document.getElementById('compareBar');
    const compareItems = document.getElementById('compareItems');
    
    if (!compareBar || !compareItems) return;

    if (comparedProducts.length === 0) {
        compareBar.classList.remove('active');
        return;
    }

    compareBar.classList.add('active');
    compareItems.innerHTML = comparedProducts.map(product => `
        <div class="compare-item">
            <div>${product.name}</div>
        </div>
    `).join('');
}

function showComparison() {
    if (comparedProducts.length < 2) {
        alert('Selecteer minimaal 2 producten om te vergelijken.');
        return;
    }

    // Create comparison modal
    const modal = document.createElement('div');
    modal.className = 'comparison-modal';
    modal.innerHTML = `
        <div class="comparison-content">
            <button class="comparison-close">&times;</button>
            <h2>Productvergelijking</h2>
            <div class="comparison-table">
                ${createComparisonTable()}
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.comparison-close').addEventListener('click', () => {
        modal.remove();
    });

    // Add CSS for modal
    if (!document.querySelector('#comparisonModalStyle')) {
        const style = document.createElement('style');
        style.id = 'comparisonModalStyle';
        style.textContent = `
            .comparison-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }
            .comparison-content {
                background: var(--white);
                border-radius: 16px;
                padding: 2rem;
                max-width: 90vw;
                max-height: 90vh;
                overflow: auto;
                position: relative;
            }
            .comparison-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: var(--text-color);
            }
            .comparison-table {
                margin-top: 2rem;
            }
            .comparison-table table {
                width: 100%;
                border-collapse: collapse;
            }
            .comparison-table th,
            .comparison-table td {
                padding: 1rem;
                text-align: left;
                border-bottom: 1px solid rgba(13, 77, 46, 0.1);
            }
        `;
        document.head.appendChild(style);
    }
}

function createComparisonTable() {
    // Simple comparison table
    return `
        <table>
            <thead>
                <tr>
                    <th>Eigenschap</th>
                    ${comparedProducts.map(p => `<th>${p.name}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Beschikbaarheid</td>
                    ${comparedProducts.map(p => `<td>Op aanvraag</td>`).join('')}
                </tr>
            </tbody>
        </table>
    `;
}

// Initialize when pricing section is shown
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initProductComparator, 500);
    });
} else {
    setTimeout(initProductComparator, 500);
}

