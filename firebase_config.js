// Arquivo: firebase_config.js
// Configuração inicial do Firebase

// Credenciais fornecidas pelo usuário para o projeto "confeitaria doce refugio"
const firebaseConfig = {
    apiKey: "AIzaSyBHpSGX8ODVBuJi33TVoWm1vGodBMnx3yg",
    authDomain: "confeitaria-doce-refugio.firebaseapp.com",
    projectId: "confeitaria-doce-refugio",
    storageBucket: "confeitaria-doce-refugio.firebasestorage.app",
    messagingSenderId: "358272373214",
    appId: "1:358272373214:web:2d4c3f52862552dce88d4f",
    // measurementId: "G-QJQ94L0WZ7" // Opcional, não necessário para autenticação
};

// Inicializa o Firebase
// Usando a sintaxe da versão 8 do SDK, que é mais simples para inclusão via <script> tag
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); // Obtém a instância de autenticação
