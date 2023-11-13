const url = "https://botafogo-atletas.mange.li";

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const senhaParam = urlParams.get('senha');

    if (senhaParam === 'ok') {

    } else {
        alert('Acesso denado.');
        window.location.href = "index.html";
    }
};

const urlParams = new URLSearchParams(window.location.search);
const atletaId = urlParams.get('id');

const numero_jogador = atletaId;

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const preenche = (atleta) => {
    const espaco_nome = document.getElementById('nome');
    const imagem = document.querySelector('div#container > div#esquerda > img');
    const espaco_descricao = document.querySelector('div#container > p');
    const container = document.getElementById('container');

    espaco_nome.innerText = atleta.nome;
    imagem.src = atleta.imagem;
    espaco_descricao.innerText = atleta.descricao;
}

(async () => {
    const atleta = await pega_json(`${url}/${numero_jogador}`);
    preenche(atleta);
})();

console.log("Síncrono");