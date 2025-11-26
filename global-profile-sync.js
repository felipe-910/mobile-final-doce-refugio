
document.addEventListener('DOMContentLoaded', function() {
    const userPhotoUrl = localStorage.getItem('userProfilePhoto');
    const profileContainer = document.getElementById('user-profile-container');

    if (profileContainer && userPhotoUrl) {
        // 1. Criar o elemento <img>
        const imgElement = document.createElement('img');
        imgElement.src = userPhotoUrl;
        imgElement.alt = 'Foto de Perfil';
        imgElement.classList.add('profile-image-navbar'); // Classe para estilização

        // 2. Encontrar o wrapper do ícone (se existir)
        let iconWrapper = profileContainer.querySelector('.profile-icon-wrapper');
        if (!iconWrapper) {
            // Se não encontrar, cria um wrapper
            iconWrapper = document.createElement('div');
            iconWrapper.classList.add('profile-icon-wrapper');
            profileContainer.appendChild(iconWrapper);
        }

        // 3. Remover o ícone SVG existente (se existir)
        const existingIcon = iconWrapper.querySelector('.profile-icon');
        if (existingIcon) {
            existingIcon.remove();
        }

        // 4. Adicionar a imagem ao wrapper
        iconWrapper.appendChild(imgElement);
        
        // 5. Garantir que o container esteja visível (caso estivesse escondido por padrão)
        profileContainer.style.display = 'block';
    }
});

// Função para ser chamada no perfil.js após salvar a foto
function updateGlobalProfileIcon(photoUrl) {
    const profileContainer = document.getElementById('user-profile-container');
    if (profileContainer) {
        let imgElement = profileContainer.querySelector('.profile-image-navbar');
        let iconWrapper = profileContainer.querySelector('.profile-icon-wrapper');

        if (!iconWrapper) {
            iconWrapper = document.createElement('div');
            iconWrapper.classList.add('profile-icon-wrapper');
            profileContainer.appendChild(iconWrapper);
        }

        if (!imgElement) {
            // Se a imagem não existe, cria e substitui o SVG
            imgElement = document.createElement('img');
            imgElement.alt = 'Foto de Perfil';
            imgElement.classList.add('profile-image-navbar');
            
            const existingIcon = iconWrapper.querySelector('.profile-icon');
            if (existingIcon) {
                existingIcon.remove();
            }
            iconWrapper.appendChild(imgElement);
        }
        
        imgElement.src = photoUrl;
        profileContainer.style.display = 'block';
    }
}
