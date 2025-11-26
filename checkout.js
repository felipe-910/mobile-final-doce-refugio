// Carregar carrinho do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let deliveryType = '';
let deliveryFee = 0;
let selectedPayment = '';
let addressData = {};

// Verificar se há itens no carrinho
if (cart.length === 0) {
    window.location.href = 'cardapio.html';
}

// Função para salvar pedido no arquivo JSON
async function saveOrderToFile(orderData) {
    try {
        // Carregar pedidos existentes
        let orders = [];
        try {
            const response = await fetch('pedidos.json');
            orders = await response.json();
        } catch (e) {
            console.log('Criando novo arquivo de pedidos');
        }
        
        // Adicionar status padrão
        orderData.status = 'novo';
        
        // Adicionar novo pedido
        orders.push(orderData);
        
        // Salvar no arquivo (em ambiente real, seria via API)
        // Por enquanto, apenas salvamos no localStorage
        const allOrders = JSON.parse(localStorage.getItem('all_orders')) || [];
        allOrders.push(orderData);
        localStorage.setItem('all_orders', JSON.stringify(allOrders));
        
        // Também salvamos em um formato que pode ser exportado
        console.log('Pedido salvo:', JSON.stringify(orderData, null, 2));
        
        // Criar um blob para download (opcional - para integração manual)
        const blob = new Blob([JSON.stringify(allOrders, null, 2)], { type: 'application/json' });
        
        return true;
    } catch (error) {
        console.error('Erro ao salvar pedido:', error);
        return false;
    }
}

// Renderizar resumo do pedido
function renderOrderSummary() {
    const summaryItems = document.getElementById('summaryItems');
    const subtotalElement = document.getElementById('subtotal');
    const deliveryFeeElement = document.getElementById('deliveryFee');
    const totalElement = document.getElementById('totalAmount');
    
    // Renderizar itens
    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <img src="${item.image}" alt="${item.name}" class="summary-item-image">
            <div class="summary-item-details">
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-qty">${item.quantity}x ${item.price}</div>
                ${item.observations ? `<div class="summary-item-qty text-muted small">Obs: ${item.observations}</div>` : ''}
            </div>
            <div class="summary-item-price">
                R$ ${(item.priceValue * item.quantity).toFixed(2).replace('.', ',')}
            </div>
        </div>
    `).join('');
    
    // Calcular totais
    const subtotal = cart.reduce((sum, item) => sum + (item.priceValue * item.quantity), 0);
    const total = subtotal + deliveryFee;
    
    subtotalElement.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    deliveryFeeElement.textContent = deliveryFee > 0 ? `R$ ${deliveryFee.toFixed(2).replace('.', ',')}` : 'Grátis';
    totalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Navegar entre steps
function showStep(stepNumber) {
    document.querySelectorAll('.checkout-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(`step${stepNumber}`).classList.add('active');
}

// Step 1: Tipo de Entrega
document.querySelectorAll('.delivery-option').forEach(option => {
    option.addEventListener('click', function() {
        // Remover seleção anterior
        document.querySelectorAll('.delivery-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Adicionar seleção
        this.classList.add('selected');
        const radio = this.querySelector('input[type="radio"]');
        radio.checked = true;
        deliveryType = radio.value;
        
        // Habilitar botão
        document.getElementById('nextStep1').disabled = false;
        
        // Atualizar taxa de entrega
        if (deliveryType === 'delivery') {
            deliveryFee = 8.00;
        } else {
            deliveryFee = 0;
        }
        renderOrderSummary();
    });
});

document.getElementById('nextStep1').addEventListener('click', function() {
    if (deliveryType === 'delivery') {
        showStep(2);
    } else {
        showStep(3);
    }
});

// Step 2: Endereço (apenas para delivery)
document.getElementById('backStep2').addEventListener('click', function() {
    showStep(1);
});

// Máscara para CEP
document.getElementById('cep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) {
        value = value.substring(0, 5) + '-' + value.substring(5, 8);
    }
    e.target.value = value;
});

// Buscar CEP (simulação)
document.getElementById('cep').addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        // Aqui você pode integrar com uma API de CEP como ViaCEP
        // Por enquanto, vamos apenas simular
        document.getElementById('rua').focus();
    }
});

document.getElementById('nextStep2').addEventListener('click', function() {
    const form = document.getElementById('addressForm');
    
    // Validar campos obrigatórios
    const cep = document.getElementById('cep').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    
    if (!cep || !rua || !numero || !bairro || !cidade) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Salvar dados do endereço
    addressData = {
        cep: cep,
        rua: rua,
        numero: numero,
        complemento: document.getElementById('complemento').value.trim(),
        bairro: bairro,
        cidade: cidade,
        referencia: document.getElementById('referencia').value.trim()
    };
    
    showStep(3);
});

// Step 3: Forma de Pagamento
document.getElementById('backStep3').addEventListener('click', function() {
    if (deliveryType === 'delivery') {
        showStep(2);
    } else {
        showStep(1);
    }
});

document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', function() {
        // Remover seleção anterior
        document.querySelectorAll('.payment-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Adicionar seleção
        this.classList.add('selected');
        const radio = this.querySelector('input[type="radio"]');
        radio.checked = true;
        selectedPayment = radio.value;
        
        // Mostrar campo de troco se for dinheiro
        const changeSection = document.getElementById('changeSection');
        if (selectedPayment === 'dinheiro') {
            changeSection.style.display = 'block';
        } else {
            changeSection.style.display = 'none';
        }
        
        // Habilitar botão
        document.getElementById('finishCheckout').disabled = false;
    });
});

// Máscara para troco
document.getElementById('changeFor').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = (parseInt(value) / 100).toFixed(2);
    e.target.value = 'R$ ' + value.replace('.', ',');
});

// Finalizar pedido
document.getElementById('finishCheckout').addEventListener('click', async function() {
    if (!selectedPayment) {
        alert('Por favor, selecione uma forma de pagamento.');
        return;
    }
    
    // Validar troco se for dinheiro
    if (selectedPayment === 'dinheiro') {
        const changeFor = document.getElementById('changeFor').value;
        if (!changeFor) {
            alert('Por favor, informe o valor para troco.');
            return;
        }
    }
    
    // Preparar dados do pedido
    const orderData = {
        items: cart,
        deliveryType: deliveryType,
        address: deliveryType === 'delivery' ? addressData : null,
        paymentMethod: selectedPayment,
        changeFor: selectedPayment === 'dinheiro' ? document.getElementById('changeFor').value : null,
        subtotal: cart.reduce((sum, item) => sum + (item.priceValue * item.quantity), 0),
        deliveryFee: deliveryFee,
        total: cart.reduce((sum, item) => sum + (item.priceValue * item.quantity), 0) + deliveryFee,
        orderDate: new Date().toISOString(),
        orderNumber: generateOrderNumber(),
        status: 'novo'
    };
    
    // Salvar pedido no arquivo JSON
    await saveOrderToFile(orderData);
    
    // Salvar pedido no localStorage (backup)
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Limpar carrinho
    localStorage.removeItem('cart');
    
    // Mostrar modal de confirmação
    document.getElementById('orderNumber').textContent = '#' + orderData.orderNumber;
    const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    modal.show();
    
    // Redirecionar após fechar modal
    document.getElementById('confirmationModal').addEventListener('hidden.bs.modal', function() {
        window.location.href = 'cardapio.html';
    });
});

// Gerar número do pedido
function generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return timestamp.toString().slice(-6) + random.toString().padStart(3, '0');
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    renderOrderSummary();
});
