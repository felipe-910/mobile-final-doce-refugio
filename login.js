// Arquivo: login.js
// Lida com os formulários de login e cadastro (usando registerUser/loginUser de auth.js)

async function validarLogin(event) {
    event.preventDefault();

    const form = event.target;
    const email = form.querySelector('#usuario').value;
    const password = form.querySelector('#senha').value;

    const confirmPasswordInput = form.querySelector('#confirmar-senha');

    if (confirmPasswordInput) {
        // Cadastro
        const confirmPassword = confirmPasswordInput.value;
        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        const result = await registerUser(email, password);
        if (result.success) {
            alert(result.message + " Você será redirecionado para a tela de login.");
            toggleForm(false);
        } else {
            alert("Erro no cadastro: " + result.message);
        }
    } else {
        // Login normal
        const result = await loginUser(email, password);
        if (result.success) {
            alert(result.message + " Redirecionando...");
            window.location.href = 'index.html';
        } else {
            alert("Erro no login: " + result.message);
        }
    }
}

function toggleForm(isRegister) {
    const mainContainer = document.querySelector('.container');
    const form = mainContainer.querySelector('form');

    // Remove listener antigo (se existir)
    try { form.removeEventListener('submit', validarLogin); } catch (e) { /* ignore */ }

    if (isRegister) {
        form.innerHTML = `
            <h1>Cadastro</h1>
            <div class="input-box">
                <input placeholder="Email" type="email" id="usuario" name="usuario" required>
                <i class="bx bxs-envelope"></i>
            </div>
            <div class="input-box">
                <input placeholder="Senha" type="password" id="senha" name="senha" required>
                <i class="bx bxs-lock-alt"></i>
            </div>
            <div class="input-box">
                <input placeholder="Confirmar Senha" type="password" id="confirmar-senha" name="confirmar-senha" required>
                <i class="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" class="login">Cadastrar</button>
            <div class="register-link">
                <p>Já tem conta? <a href="#" onclick="toggleForm(false); return false;">Fazer Login</a></p>
            </div>
        `;
    } else {
        form.innerHTML = `
            <h1>Login</h1>
            <div class="input-box">
                <input placeholder="Email" type="email" id="usuario" name="usuario" required>
                <i class="bx bxs-envelope"></i>
            </div>
            <div class="input-box">
                <input placeholder="Senha" type="password" id="senha" name="senha" required>
                <i class="bx bxs-lock-alt"></i>
            </div>
            <div class="remember">
                <label><input type="checkbox"> Lembrar senha</label>
                <a href="#">Esqueci a senha</a>
            </div>
            <button type="submit" class="login">Entrar</button>
            <div class="register-link">
                <p>Não tem conta? <a href="#" onclick="toggleForm(true); return false;">Criar conta</a></p>
            </div>
        `;
    }

    // Adiciona o listener ao novo form
    form.addEventListener('submit', validarLogin);

    // Se a função renderGoogleButton existir, tenta renderizar (caso o botão precise ser re-rend.)
    if (typeof window.renderGoogleButton === "function") {
        window.renderGoogleButton();
    }
}

// Inicializa ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.container form');
    if (form) {
        form.addEventListener('submit', validarLogin);
    }

    // O link de criar conta agora é criado dinamicamente pelo toggleForm,
    // mas caso exista no HTML inicial, adicionamos listener de segurança:
    const registerLink = document.querySelector('.register-link a');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            toggleForm(true);
        });
    }
});
