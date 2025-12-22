// ============================================
// CLUB SHOP SYSTEM
// ============================================
// Online winkel voor club merchandise

if (typeof ClubShop === 'undefined') {
    class ClubShop {
    constructor() {
        this.products = [];
        this.cart = [];
        this.categories = ['shirts', 'equipment', 'merchandise', 'accessories'];
        this.init();
    }

    init() {
        this.loadProducts();
        this.loadCart();
        this.setupEventListeners();
        this.renderProducts();
        this.updateCartUI();
    }

    /**
     * Laadt producten
     */
    loadProducts() {
        this.products = [
            {
                id: 1,
                name: 'Club Shirt Thuis',
                category: 'shirts',
                price: 45.00,
                image: 'images/products/shirt-home.jpg',
                description: 'Officieel thuis shirt van RFC Lissewege',
                sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                customizable: true,
                inStock: true,
                stock: 50
            },
            {
                id: 2,
                name: 'Club Shirt Uit',
                category: 'shirts',
                price: 45.00,
                image: 'images/products/shirt-away.jpg',
                description: 'Officieel uit shirt van RFC Lissewege',
                sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                customizable: true,
                inStock: true,
                stock: 50
            },
            {
                id: 3,
                name: 'Trainingspak',
                category: 'equipment',
                price: 65.00,
                image: 'images/products/tracksuit.jpg',
                description: 'Compleet trainingspak met club logo',
                sizes: ['S', 'M', 'L', 'XL'],
                customizable: false,
                inStock: true,
                stock: 30
            },
            {
                id: 4,
                name: 'Club Sjaal',
                category: 'merchandise',
                price: 15.00,
                image: 'images/products/scarf.jpg',
                description: 'Warme club sjaal voor supporters',
                sizes: ['One Size'],
                customizable: false,
                inStock: true,
                stock: 100
            },
            {
                id: 5,
                name: 'Club Pet',
                category: 'accessories',
                price: 12.00,
                image: 'images/products/cap.jpg',
                description: 'Club pet met geborduurd logo',
                sizes: ['One Size'],
                customizable: false,
                inStock: true,
                stock: 75
            },
            {
                id: 6,
                name: 'Voetbalschoenen',
                category: 'equipment',
                price: 89.00,
                image: 'images/products/boots.jpg',
                description: 'Professionele voetbalschoenen',
                sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
                customizable: false,
                inStock: true,
                stock: 20
            },
            {
                id: 7,
                name: 'Club Beker',
                category: 'merchandise',
                price: 8.00,
                image: 'images/products/mug.jpg',
                description: 'Keramieken beker met club logo',
                sizes: ['One Size'],
                customizable: false,
                inStock: true,
                stock: 50
            },
            {
                id: 8,
                name: 'Club T-Shirt',
                category: 'shirts',
                price: 25.00,
                image: 'images/products/tshirt.jpg',
                description: 'Casual club t-shirt',
                sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                customizable: true,
                inStock: true,
                stock: 60
            }
        ];
    }

    /**
     * Laadt winkelwagen
     */
    loadCart() {
        const saved = localStorage.getItem('shop_cart');
        if (saved) {
            this.cart = JSON.parse(saved);
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Category filter
        const categoryFilter = document.getElementById('shopCategoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.filterByCategory(e.target.value);
            });
        }

        // Search
        const searchInput = document.getElementById('shopSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchProducts(e.target.value);
            });
        }

        // Cart toggle
        const cartToggle = document.getElementById('shopCartToggle');
        if (cartToggle) {
            cartToggle.addEventListener('click', () => {
                this.toggleCart();
            });
        }

        // Checkout
        const checkoutBtn = document.getElementById('shopCheckoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.showCheckout();
            });
        }
    }

    /**
     * Rendert producten
     */
    renderProducts(category = 'all', searchTerm = '') {
        const container = document.getElementById('shopProductsGrid');
        if (!container) return;

        let filtered = this.products;

        if (category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
        }

        if (searchTerm) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        container.innerHTML = filtered.map(product => `
            <div class="shop-product-card">
                <div class="product-image">
                    <div class="product-placeholder">
                        <i class="fas fa-tshirt"></i>
                    </div>
                    ${!product.inStock ? '<div class="product-out-of-stock">Uitverkocht</div>' : ''}
                </div>
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">€${product.price.toFixed(2)}</div>
                    ${product.customizable ? '<span class="product-badge"><i class="fas fa-edit"></i> Personaliseerbaar</span>' : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-product-view" onclick="clubShop.showProductDetails(${product.id})">
                        <i class="fas fa-eye"></i> Bekijken
                    </button>
                    ${product.inStock ? `
                        <button class="btn-product-add" onclick="clubShop.addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Toevoegen
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    /**
     * Toont product details
     */
    showProductDetails(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.getElementById('productDetailsModal');
        if (!modal) {
            this.createProductModal();
        }

        const productModal = document.getElementById('productDetailsModal');
        const modalContent = productModal.querySelector('.modal-content');
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h3>${product.name}</h3>
                <button class="modal-close" onclick="this.closest('.modal').style.display='none'">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="product-details-body">
                <div class="product-details-image">
                    <div class="product-placeholder-large">
                        <i class="fas fa-tshirt"></i>
                    </div>
                </div>
                <div class="product-details-info">
                    <div class="product-details-price">€${product.price.toFixed(2)}</div>
                    <p class="product-details-description">${product.description}</p>
                    
                    <div class="product-options">
                        <div class="form-group">
                            <label>Maat</label>
                            <select id="productSize" class="form-select">
                                ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                            </select>
                        </div>
                        
                        ${product.customizable ? `
                            <div class="form-group">
                                <label>Naam op Shirt (optioneel)</label>
                                <input type="text" id="productCustomName" class="form-input" placeholder="Naam" maxlength="15">
                            </div>
                            <div class="form-group">
                                <label>Nummer op Shirt (optioneel)</label>
                                <input type="number" id="productCustomNumber" class="form-input" placeholder="Nummer" min="1" max="99">
                            </div>
                        ` : ''}
                        
                        <div class="form-group">
                            <label>Aantal</label>
                            <input type="number" id="productQuantity" class="form-input" value="1" min="1" max="${product.stock}">
                        </div>
                    </div>
                    
                    <div class="product-details-actions">
                        <button class="btn-primary" onclick="clubShop.addToCartFromDetails(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Toevoegen aan Winkelwagen
                        </button>
                    </div>
                </div>
            </div>
        `;

        productModal.style.display = 'flex';
    }

    /**
     * Voegt product toe aan winkelwagen
     */
    addToCart(productId, quantity = 1, size = null, customName = null, customNumber = null) {
        const product = this.products.find(p => p.id === productId);
        if (!product || !product.inStock) return;

        const cartItem = {
            id: Date.now(),
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity: quantity,
            size: size || product.sizes[0],
            customName: customName,
            customNumber: customNumber,
            image: product.image
        };

        this.cart.push(cartItem);
        this.saveCart();
        this.updateCartUI();
        this.showCartNotification();
    }

    /**
     * Voegt toe vanuit details modal
     */
    addToCartFromDetails(productId) {
        const size = document.getElementById('productSize')?.value;
        const quantity = parseInt(document.getElementById('productQuantity')?.value || 1);
        const customName = document.getElementById('productCustomName')?.value || null;
        const customNumber = document.getElementById('productCustomNumber')?.value || null;

        this.addToCart(productId, quantity, size, customName, customNumber);

        // Close modal
        const modal = document.getElementById('productDetailsModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    /**
     * Update winkelwagen UI
     */
    updateCartUI() {
        const cartCount = document.getElementById('shopCartCount');
        const cartTotal = document.getElementById('shopCartTotal');
        const cartItems = document.getElementById('shopCartItems');

        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        if (cartTotal) {
            cartTotal.textContent = `€${totalPrice.toFixed(2)}`;
        }

        if (cartItems) {
            cartItems.innerHTML = this.cart.length === 0 
                ? '<p class="cart-empty">Je winkelwagen is leeg</p>'
                : this.cart.map((item, index) => `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>${item.productName}</h4>
                            <p>Maat: ${item.size} • Aantal: ${item.quantity}</p>
                            ${item.customName ? `<p>Naam: ${item.customName}</p>` : ''}
                            ${item.customNumber ? `<p>Nummer: ${item.customNumber}</p>` : ''}
                            <div class="cart-item-price">€${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                        <button class="cart-item-remove" onclick="clubShop.removeFromCart(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('');
        }
    }

    /**
     * Verwijdert uit winkelwagen
     */
    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.updateCartUI();
    }

    /**
     * Toont checkout
     */
    showCheckout() {
        if (this.cart.length === 0) {
            alert('Je winkelwagen is leeg!');
            return;
        }

        const modal = document.getElementById('checkoutModal');
        if (!modal) {
            this.createCheckoutModal();
        }

        const checkoutModal = document.getElementById('checkoutModal');
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        checkoutModal.querySelector('#checkoutTotal').textContent = `€${totalPrice.toFixed(2)}`;
        checkoutModal.style.display = 'flex';
    }

    /**
     * Maakt checkout modal aan
     */
    createCheckoutModal() {
        const modal = document.createElement('div');
        modal.id = 'checkoutModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content checkout-modal-content">
                <div class="modal-header">
                    <h3>Afrekenen</h3>
                    <button class="modal-close" onclick="this.closest('.modal').style.display='none'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="checkoutForm" class="checkout-form">
                    <div class="checkout-section">
                        <h4>Verzendgegevens</h4>
                        <div class="form-group">
                            <label>Naam</label>
                            <input type="text" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label>Telefoon</label>
                            <input type="tel" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label>Adres</label>
                            <input type="text" class="form-input" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Postcode</label>
                                <input type="text" class="form-input" required>
                            </div>
                            <div class="form-group">
                                <label>Stad</label>
                                <input type="text" class="form-input" required>
                            </div>
                        </div>
                    </div>
                    
                    <div class="checkout-section">
                        <h4>Betalingsmethode</h4>
                        <div class="payment-methods">
                            <label class="payment-method">
                                <input type="radio" name="payment" value="bancontact" checked>
                                <span>Bancontact</span>
                            </label>
                            <label class="payment-method">
                                <input type="radio" name="payment" value="paypal">
                                <span>PayPal</span>
                            </label>
                            <label class="payment-method">
                                <input type="radio" name="payment" value="card">
                                <span>Creditcard</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="checkout-summary">
                        <div class="summary-row">
                            <span>Subtotaal</span>
                            <span id="checkoutSubtotal">€0.00</span>
                        </div>
                        <div class="summary-row">
                            <span>Verzending</span>
                            <span>€5.00</span>
                        </div>
                        <div class="summary-row total">
                            <span>Totaal</span>
                            <span id="checkoutTotal">€0.00</span>
                        </div>
                    </div>
                    
                    <div class="checkout-actions">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal').style.display='none'">Annuleren</button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-lock"></i> Bestelling Plaatsen
                        </button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        // Setup form
        const form = document.getElementById('checkoutForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processOrder();
            });
        }
    }

    /**
     * Verwerkt bestelling
     */
    processOrder() {
        // In production, this would connect to payment gateway
        alert('Bestelling geplaatst! Je ontvangt een bevestigingsemail.');
        
        // Clear cart
        this.cart = [];
        this.saveCart();
        this.updateCartUI();

        // Close modal
        const modal = document.getElementById('checkoutModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    /**
     * Filtert op categorie
     */
    filterByCategory(category) {
        this.renderProducts(category);
    }

    /**
     * Zoekt producten
     */
    searchProducts(term) {
        this.renderProducts('all', term);
    }

    /**
     * Toggle winkelwagen
     */
    toggleCart() {
        const cartSidebar = document.getElementById('shopCartSidebar');
        if (cartSidebar) {
            cartSidebar.classList.toggle('active');
        }
    }

    /**
     * Toont cart notificatie
     */
    showCartNotification() {
        // Simple notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = '<i class="fas fa-check"></i> Toegevoegd aan winkelwagen!';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    /**
     * Maakt product modal aan
     */
    createProductModal() {
        const modal = document.createElement('div');
        modal.id = 'productDetailsModal';
        modal.className = 'modal';
        modal.innerHTML = '<div class="modal-content product-modal-content"></div>';
        document.body.appendChild(modal);
    }

    /**
     * Slaat winkelwagen op
     */
    saveCart() {
        localStorage.setItem('shop_cart', JSON.stringify(this.cart));
    }
    }
    window.ClubShop = ClubShop;
}

// Initialiseer wanneer DOM klaar is
if (!window.clubShop) {
    let clubShop;
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.clubShop) {
            clubShop = new ClubShop();
            window.clubShop = clubShop;
        }
    });
}

