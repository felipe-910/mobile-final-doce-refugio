// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration.scope);
        
        // Verificar atualizações periodicamente
        setInterval(() => {
          registration.update();
        }, 60000); // Verifica a cada 1 minuto
      })
      .catch((error) => {
        console.log('Falha ao registrar Service Worker:', error);
      });
  });

  // Detectar quando há uma nova versão disponível
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('Nova versão do app disponível!');
    // Você pode adicionar uma notificação para o usuário aqui
  });
}

// Detectar quando o app está instalado
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevenir o prompt automático
  e.preventDefault();
  // Guardar o evento para usar depois
  window.deferredPrompt = e;
  console.log('App pode ser instalado');
  
  // Você pode mostrar um botão customizado de instalação aqui
});

// Detectar quando o app foi instalado
window.addEventListener('appinstalled', () => {
  console.log('App instalado com sucesso!');
  window.deferredPrompt = null;
});
