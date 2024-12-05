document.addEventListener('DOMContentLoaded', function () {
    fetch('vaga.json')
        .then(response => response.json())
        .then(data => {
            const offersGrid = document.getElementById('offers-grid');
            offersGrid.innerHTML = ''; // Limpa o conteúdo inicial

            data.forEach(vaga => {
                const card = document.createElement('article');
                card.className = 'offer-card';
                card.innerHTML = `
                    <h3>${vaga.title}</h3>
                    <p>${vaga.modalidade}</p>
                    <p>${vaga.local}</p>
                    <button class="details-button" onclick="openModal(${vaga.id})">Detalhes</button>
                `;
                offersGrid.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao carregar os dados das vagas:', error));

         // Registrar o Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registrado com sucesso:', registration);
                })
                .catch((error) => {
                    console.log('Erro ao registrar o Service Worker:', error);
                });
        });
    }

    // Gerenciar o evento "beforeinstallprompt" para permitir a instalação do PWA
    let deferredPrompt;
    const installButton = document.getElementById('install-button');

    window.addEventListener('beforeinstallprompt', (event) => {
        // Prevenir o comportamento padrão do navegador
        event.preventDefault();
        // Armazenar o evento para ser disparado quando o usuário clicar no botão de instalação
        deferredPrompt = event;

        // Exibir o botão de "Adicionar à Tela Inicial"
        if (installButton) {
            installButton.style.display = 'block';
        }

        // Ao clicar no botão de instalação
        installButton.addEventListener('click', () => {
            // Mostrar o prompt de instalação
            deferredPrompt.prompt();

            // Esperar pela escolha do usuário
            deferredPrompt.userChoice.then((choiceResult) => {
                console.log(choiceResult.outcome);
                deferredPrompt = null;  // Limpar o evento após o prompt
            });
        });
    });
});

function openModal(id) {
    fetch('vaga.json')
        .then(response => response.json())
        .then(data => {
            const vaga = data.find(j => j.id == id);

            if (vaga) {
                document.getElementById('modal-title').innerText = vaga.title;
                document.getElementById('modal-bolsa').innerText = vaga.bolsa;
                document.getElementById('modal-horario').innerText = vaga.horario;
                document.getElementById('modal-local').innerText = vaga.local;
                document.getElementById('modal-curso').innerText = vaga.curso;
                document.getElementById('modal-responsabilidades').innerText = vaga.responsabilidades;
                document.getElementById('modal-requisitos').innerText = vaga.requisitos;

                document.getElementById('modal').style.display = 'block';
            }
        })
        .catch(error => console.error('Erro ao carregar os detalhes da vaga:', error));
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Fechar o modal se o usuário clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}