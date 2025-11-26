// Carregar produtos do arquivo JSON
let products = [];
let filteredProducts = [];
let currentCategory = 'todos';

// URL da API (ajuste se necessário)
const API_URL = 'http://localhost:5000/api';

// Carregar produtos do servidor
async function loadProducts() {
    try {
        // Tentar carregar da API
        const response = await fetch(`${API_URL}/produtos`);
        products = await response.json();
        console.log('✅ Produtos carregados da API:', products.length);
    } catch (error) {
        console.log('⚠️  API não disponível, carregando do arquivo local...');
        try {
            // Fallback: carregar do arquivo local
            const response = await fetch('produtos.json');
            products = await response.json();
            console.log('✅ Produtos carregados do arquivo local:', products.length);
        } catch (err) {
            console.error('❌ Erro ao carregar produtos:', err);
            products = [];
        }
    }
    
    filteredProducts = products;
    renderProducts();
    updateCartBadge();
}

// Renderizar produtos
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-muted">Nenhum produto encontrado nesta categoria.</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/600x400?text=Imagem+Indisponível'">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        ${'⭐'.repeat(product.rating)}
                        <span class="rating-count">(${product.ratingCount})</span>
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <div>
                            <div class="product-price">${product.price}</div>
                            <div class="product-serves">${product.serves}</div>
                        </div>
                        <button class="btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="bi bi-cart-plus"></i> Adicionar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Filtrar por categoria
function filterByCategory(category) {
    currentCategory = category;
    
    // Atualizar botões ativos
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filtrar produtos
    if (category === 'todos') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    renderProducts();
}

// Buscar produtos
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    renderProducts();
}

// Adicionar ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar se produto já está no carrinho
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: Date.now(),
            productId: product.id,
            name: product.name,
            price: product.price,
            priceValue: product.priceValue,
            image: product.image,
            quantity: 1,
            observations: ''
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    
    // Feedback visual
    showToast(`${product.name} adicionado ao carrinho!`);
}

// Atualizar badge do carrinho
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartBadge');
    
    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = 'block';
    } else {
        badge.style.display = 'none';
    }
}

// Mostrar toast de feedback
function showToast(message) {
    // Criar elemento de toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    // Remover após 3 segundos
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    
    // Atualizar produtos a cada 30 segundos (para pegar novos produtos)
    setInterval(loadProducts, 30000);
});

// Atualizar badge ao voltar para a página
window.addEventListener('focus', updateCartBadge);
