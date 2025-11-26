// Arquivo: profile-handler.js
// Controla a exibição do ícone de perfil quando o usuário está logado

document.addEventListener('DOMContentLoaded', function() {
    const userProfileContainer = document.getElementById('user-profile-container');
    const profileIcon = document.querySelector('.profile-icon');

    // ====== IMPORTANTE ======
    // Remover QUALQUER vestígio de botões de login
    const authButtons = document.getElementById('auth-buttons');
    if (authButtons) {
        authButtons.remove(); // remove do DOM completamente
    }

    // Verifica se o usuário está logado
    if (typeof isUserLoggedIn === 'function' && isUserLoggedIn()) {

        document.body.classList.add('user-logged-in');

        // Mostra o ícone de perfil
        if (userProfileContainer) {
            userProfileContainer.style.display = 'flex';
            userProfileContainer.style.alignItems = 'center';
        }

        // Cria o dropdown do perfil
        if (profileIcon) {
            profileIcon.style.cursor = 'pointer';

            const dropdownMenu = document.createElement('div');
            dropdownMenu.className = 'profile-dropdown-menu';
            dropdownMenu.innerHTML = `
                <div class="profile-dropdown-item" onclick="logout()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
                    Sair
                </div>
            `;

            dropdownMenu.style.display = 'none';

            const profileWrapper = document.querySelector('.profile-icon-wrapper');
            if (profileWrapper) {
                profileWrapper.style.position = 'relative';
                profileWrapper.appendChild(dropdownMenu);

                profileIcon.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const visible = dropdownMenu.style.display === 'block';
                    dropdownMenu.style.display = visible ? 'none' : 'block';
                });

                document.addEventListener('click', function() {
                    dropdownMenu.style.display = 'none';
                });
            }
        }

    } else {
        // Usuário não está logado
        document.body.classList.remove('user-logged-in');

        // Esconde o ícone
        if (userProfileContainer) {
            userProfileContainer.style.display = 'none';
        }
    }
});
