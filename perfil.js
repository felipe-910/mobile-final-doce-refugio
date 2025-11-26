document.addEventListener('DOMContentLoaded', function() {
    const userPhoto = document.getElementById('userPhoto');
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    const photoInput = document.getElementById('photoInput');
    const logoutBtn = document.getElementById('logoutBtn');
    const btnSalvar = document.querySelector('.btn-salvar');
    const meusPedidosBtn = document.getElementById('meusPedidosBtn');
    const ordersContainer = document.getElementById('ordersContainer');
    const ordersList = document.getElementById('ordersList');

    // Carregar foto
    const savedPhoto = localStorage.getItem('userProfilePhoto');
    if (savedPhoto) {
        userPhoto.src = savedPhoto;
        userPhoto.style.display = 'block';
        photoPlaceholder.style.display = 'none';
    }

    photoInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                userPhoto.src = e.target.result;
                userPhoto.style.display = 'block';
                photoPlaceholder.style.display = 'none';
                localStorage.setItem('userProfilePhoto', e.target.result);
                updateGlobalProfileIcon(e.target.result); // Chama a função de sincronização
            }
            reader.readAsDataURL(file);
        }
    });

    // Salvar perfil
    btnSalvar.addEventListener('click', function() {
        const inputs = document.querySelectorAll('.campo input[type="text"]');
        const textarea = document.querySelector('.campo textarea');
        const formData = {
            nome: inputs[0].value,
            sobrenome: inputs[1].value,
            cidade: inputs[2].value,
            nascimento: inputs[3].value,
            profissao: inputs[4].value,
            biografia: textarea.value
        };
        localStorage.setItem('userProfileData', JSON.stringify(formData));
        alert('Perfil salvo com sucesso!');
    });

    // Carregar dados
    const savedData = localStorage.getItem('userProfileData');
    if (savedData) {
        const data = JSON.parse(savedData);
        const inputs = document.querySelectorAll('.campo input[type="text"]');
        const textarea = document.querySelector('.campo textarea');
        inputs[0].value = data.nome || '';
        inputs[1].value = data.sobrenome || '';
        inputs[2].value = data.cidade || '';
        inputs[3].value = data.nascimento || '';
        inputs[4].value = data.profissao || '';
        textarea.value = data.biografia || '';
    }

    // Logout
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('userData');
        sessionStorage.removeItem('userData');
        window.location.href = 'login.html';
    });

    // Redireciona se não estiver logado
    const userData = localStorage.getItem('userData');
    if (!userData) window.location.href = 'login.html';

    // === MEUS PEDIDOS ===
    meusPedidosBtn.addEventListener('click', function(e) {
        e.preventDefault();
        ordersContainer.style.display = 'block';
        fetch('pedidos.json')
            .then(res => res.json())
            .then(data => renderOrders(data))
            .catch(err => console.error(err));
    });

    function renderOrders(orders) {
        ordersList.innerHTML = '';
        orders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.classList.add('order-card');

            let itemsHTML = '';
            order.items.forEach(item => {
                itemsHTML += `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <strong>${item.name}</strong> x ${item.quantity}<br>
                        ${item.observations ? `Observações: ${item.observations}` : ''}
                        <br>Preço: ${item.price}
                    </div>
                </div>`;
            });

            orderCard.innerHTML = `
                <p><strong>Número do Pedido:</strong> ${order.orderNumber}</p>
                <p><strong>Data:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <p><strong>Entrega:</strong> ${order.deliveryType}</p>
                <p><strong>Total:</strong> R$ ${order.total.toFixed(2)}</p>
                <div>${itemsHTML}</div>
            `;

            ordersList.appendChild(orderCard);
        });
    }

    window.closeOrders = function() {
        ordersContainer.style.display = 'none';
    }
});
