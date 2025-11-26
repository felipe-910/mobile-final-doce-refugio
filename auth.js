// Arquivo: auth.js
// Firebase v8 + Google Sign-In robusto (corrigido)

const CLIENT_ID = '820544650032-6g0vrn9nqg5d6mqnk3kq9ers0s7qvdu7.apps.googleusercontent.com';

// --- Cadastro / Login padrão ---
async function registerUser(email, password) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        localStorage.setItem('userData', JSON.stringify({ email: userCredential.user.email }));
        return { success: true, message: "Usuário cadastrado com sucesso!" };
    } catch (error) {
        console.error("Erro no cadastro:", error);
        let message = "Erro desconhecido no cadastro.";
        if (error.code === 'auth/email-already-in-use') message = "Este email já está em uso.";
        else if (error.code === 'auth/invalid-email') message = "O formato do email é inválido.";
        else if (error.code === 'auth/weak-password') message = "A senha deve ter pelo menos 6 caracteres.";
        return { success: false, message };
    }
}

async function loginUser(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        localStorage.setItem('userData', JSON.stringify({ email: userCredential.user.email }));
        return { success: true, message: "Login bem-sucedido!" };
    } catch (error) {
        console.error("Erro no login:", error);
        let message = "Erro desconhecido no login.";
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') message = "Email ou senha inválidos.";
        else if (error.code === 'auth/invalid-email') message = "O formato do email é inválido.";
        return { success: false, message };
    }
}

function isUserLoggedIn() {
    return localStorage.getItem('userData') !== null;
}

function getUserProfile() {
    if (isUserLoggedIn()) return JSON.parse(localStorage.getItem('userData'));
    return null;
}

async function logout() {
    try {
        await auth.signOut();
    } catch (err) {
        console.error("Erro no signOut:", err);
    } finally {
        localStorage.removeItem('userData');
        window.location.href = 'index.html';
    }
}

// --- Google Sign-In ---
function handleCredentialResponse(response) {
    if (!response || !response.credential) {
        alert("Token do Google não chegou. Verifique Client ID e origens autorizadas.");
        return;
    }

    try {
        // Garantir que jwt_decode existe
        if (typeof jwt_decode !== "function") {
            throw new Error("jwt_decode não definido. Verifique se o script do jwt-decode está incluído antes do auth.js");
        }

        const profile = jwt_decode(response.credential);

        localStorage.setItem('userData', JSON.stringify({
            email: profile.email,
            name: profile.name,
            picture: profile.picture
        }));

        console.log("[auth] userData salvo:", JSON.parse(localStorage.getItem('userData')));
        setTimeout(() => window.location.href = 'index.html', 300);

    } catch (err) {
        console.error("[auth] erro em handleCredentialResponse:", err);
        alert("Erro ao processar login com Google. Veja o console.");
    }
}

function renderGoogleButton(retries = 0) {
    if (typeof google === "undefined" || !google.accounts || !google.accounts.id) {
        if (retries > 50) return console.error("[auth] Google Identity não carregou.");
        setTimeout(() => renderGoogleButton(retries + 1), 200);
        return;
    }

    try {
        google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: handleCredentialResponse
        });

        const googleButton = document.getElementById("google-login-button");
        if (googleButton) {
            google.accounts.id.renderButton(
                googleButton,
                { theme: "outline", size: "large", shape: "pill", text: "signin_with" }
            );
            console.log("[auth] Google button renderizado.");
        }

    } catch (err) {
        console.error("[auth] erro ao renderizar botão Google:", err);
    }
}

window.renderGoogleButton = renderGoogleButton;

document.addEventListener('DOMContentLoaded', () => renderGoogleButton());
