document.addEventListener('DOMContentLoaded', function () {
    const baseUrl = "https://botafogo-atletas.mange.li";

    window.onload = function () {
        const urlParams = new URLSearchParams(window.location.search);
        const senhaParam = urlParams.get('senha');

        if (senhaParam === 'ok') {

        } else {
            alert('Acesso denado.');
            window.location.href = "index.html";
        }
    };

    const pega_json = async (caminho) => {
        try {
            const resposta = await fetch(caminho);
            if (!resposta.ok) {
                throw new Error(`Error fetching data: ${resposta.statusText}`);
            }
            const dados = await resposta.json();
            return dados;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const preenche = (atleta) => {
        const cardsContainer = document.getElementById('cards-container');
        const card = document.createElement('div');
        card.classList.add('card');

        const espaco_nome = document.createElement('div');
        espaco_nome.innerText = atleta.nome;

        const imagem = document.createElement('img');
        imagem.src = atleta.imagem;

        const espaco_descricao = document.createElement('p');
        espaco_descricao.innerText = atleta.descricao;

        card.addEventListener('click', () => {
            window.location.href = `descricao.html?senha=ok&id=${atleta.id}`;
        });

        card.appendChild(espaco_nome);
        card.appendChild(imagem);
        card.appendChild(espaco_descricao);

        cardsContainer.appendChild(card);
    }

    const filterPlayers = async (selectedFilter) => {
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = '';

        let apiUrl;

        switch (selectedFilter) {
            case 'all':
                apiUrl = `${baseUrl}/all`;
                break;
            case 'feminino':
                apiUrl = `${baseUrl}/feminino`;
                break;
            case 'masculino':
                apiUrl = `${baseUrl}/masculino`;
                break;
        }

        if (apiUrl) {
            const playerData = await pega_json(apiUrl);
            playerData.forEach(preenche);
        }
    }

    const allButton = document.getElementById('all-button');
        allButton.addEventListener('click', () => {
            filterPlayers('all');
        });

        const femininoButton = document.getElementById('feminino-button');
        femininoButton.addEventListener('click', () => {
            filterPlayers('feminino');
        });

        const masculinoButton = document.getElementById('masculino-button');
        masculinoButton.addEventListener('click', () => {
            filterPlayers('masculino');
        })

    const playerFilter = document.getElementById('player-filter');
    playerFilter.addEventListener('change', (event) => {
        filterPlayers(event.target.value);
    });


    filterPlayers('all');
});

