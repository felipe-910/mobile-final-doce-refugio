// Carregar produtos do arquivo JSON
let products = [];

// Função para carregar produtos
async function loadProducts() {
    try {
        const response = await fetch('produtos.json');
        products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        // Fallback para produtos hardcoded se necessário
    }
}

// Carrinho de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedProduct = null;

// Função para gerar estrelas de avaliação
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '★' : '☆';
    }
    return stars;
}

// Função para obter o label da categoria
function getCategoryLabel(category) {
    const labels = {
        'doces-finos': 'Doces Finos',
        'caseiros': 'Caseiros',
        'gelados': 'Gelados',
        'festa': 'Bolos de Festa',
        'fitness': 'Fitness'
    };
    return labels[category] || category;
}

// Função para renderizar os produtos
function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="product-card">
                <div class="product-badge">${getCategoryLabel(product.category)}</div>
                <div class="product-img" style="background-image: url('${product.image}');"></div>
                <div class="product-content">
                    <h3>${product.name}</h3>
                    <div class="rating">
                        <span class="stars">${generateStars(product.rating)}</span>
                        <span class="rating-count">(${product.ratingCount})</span>
                    </div>
                    <p>${product.description}</p>
                    <div class="product-price">
                        <span class="price">${product.price}</span>
                        <span class="price-note">${product.serves}</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary-custom btn-sm btn-add-cart" data-product-id="${product.id}">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Adicionar event listeners aos botões de adicionar
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            openAddToCartModal(productId);
        });
    });
}

// Função para abrir modal de adicionar ao carrinho
function openAddToCartModal(productId) {
    selectedProduct = products.find(p => p.id === productId);
    if (!selectedProduct) return;
    
    document.getElementById('modalProductName').textContent = selectedProduct.name;
    document.getElementById('modalProductPrice').textContent = selectedProduct.price;
    document.getElementById('productQuantity').value = 1;
    document.getElementById('productObservations').value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('addToCartModal'));
    modal.show();
}

// Função para adicionar ao carrinho
function addToCart() {
    if (!selectedProduct) return;
    
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const observations = document.getElementById('productObservations').value.trim();
    
    const cartItem = {
        id: Date.now(), // ID único para o item do carrinho
        productId: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        priceValue: selectedProduct.priceValue,
        image: selectedProduct.image,
        quantity: quantity,
        observations: observations
    };
    
    cart.push(cartItem);
    saveCart();
    updateCartBadge();
    
    // Fechar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addToCartModal'));
    modal.hide();
    
    // Mostrar feedback
    showToast('Produto adicionado ao carrinho!');
}

// Função para salvar carrinho no localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para atualizar badge do carrinho
function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartBadge').textContent = totalItems;
}

// Função para renderizar carrinho
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCart.style.display = 'block';
        cartTotal.textContent = 'R$ 0,00';
        return;
    }
    
    emptyCart.style.display = 'none';
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item mb-3 p-3 border rounded">
            <div class="row align-items-center">
                <div class="col-3 col-md-2">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                </div>
                <div class="col-6 col-md-7">
                    <h6 class="mb-1">${item.name}</h6>
                    <p class="mb-1 text-muted small">${item.price} x ${item.quantity}</p>
                    ${item.observations ? `<p class="mb-0 text-muted small"><strong>Obs:</strong> ${item.observations}</p>` : ''}
                </div>
                <div class="col-3 col-md-3 text-end">
                    <p class="mb-2 fw-bold">R$ ${(item.priceValue * item.quantity).toFixed(2).replace('.', ',')}</p>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Remover</button>
                </div>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.priceValue * item.quantity), 0);
    cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Função para remover item do carrinho
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartBadge();
    renderCart();
}

// Função para mostrar toast
function showToast(message) {
    // Criar elemento de toast simples
    const toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 end-0 p-3';
    toast.style.zIndex = '9999';
    toast.innerHTML = `
        <div class="toast show" role="alert">
            <div class="toast-body bg-success text-white rounded">
                ${message}
            </div>
        </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

let currentCategory = 'todos';
let currentSearch = '';

function filterProducts() {
    let filtered = products;
    
    if (currentCategory !== 'todos') {
        filtered = filtered.filter(product => product.category === currentCategory);
    }
    
    if (currentSearch.trim() !== '') {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
            product.description.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }
    
    renderProducts(filtered);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Carregar produtos do JSON
    loadProducts();
    updateCartBadge();
    
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.getAttribute('data-category');
            filterProducts();
        });
    });
    
    // Pesquisa
    document.getElementById('searchInput').addEventListener('input', function(e) {
        currentSearch = e.target.value;
        filterProducts();
    });
    
    // Botões de quantidade
    document.getElementById('decreaseQty').addEventListener('click', function() {
        const input = document.getElementById('productQuantity');
        const value = parseInt(input.value);
        if (value > 1) {
            input.value = value - 1;
        }
    });
    
    document.getElementById('increaseQty').addEventListener('click', function() {
        const input = document.getElementById('productQuantity');
        const value = parseInt(input.value);
        if (value < 99) {
            input.value = value + 1;
        }
    });
    
    // Confirmar adicionar ao carrinho
    document.getElementById('confirmAddToCart').addEventListener('click', addToCart);
    
    // Abrir modal do carrinho
    document.getElementById('cartButton').addEventListener('click', function() {
        renderCart();
        const modal = new bootstrap.Modal(document.getElementById('cartModal'));
        modal.show();
    });
    
    // Finalizar pedido
    document.getElementById('finishOrder').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        // Redirecionar para página de checkout
        window.location.href = 'checkout.html';
    });
});
