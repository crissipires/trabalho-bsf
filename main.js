import Grafo from './js/bsf.js';

let dados;
fetch('latest_movies.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo');
        }
        return response.json(); 
    })
    .then(data => {
        dados = data; 
        processarDados(dados); 
    })
    .catch(error => {
        console.error(error); 
});

function processarDados(dados) {
    const listaAtores = [];
    dados.forEach(filme => {
        filme.cast.forEach(ator => {
            if (!listaAtores.includes(ator)) {
                listaAtores.push(ator);
            }
        });
    });

    const selectAtorOrigem = document.getElementById('atorOrigem');
    const selectAtorDestino = document.getElementById('atorDestino');
    listaAtores.forEach(ator => {
        const optionOrigem = document.createElement('option');
        optionOrigem.text = ator;
        selectAtorOrigem.add(optionOrigem);
    
        const optionDestino = document.createElement('option');
        optionDestino.text = ator;
        selectAtorDestino.add(optionDestino);
    });  
}


const selectAtorOrigem = document.getElementById('atorOrigem');
const selectAtorDestino = document.getElementById('atorDestino');
const button = document.getElementById('botao');

button.addEventListener('click', () =>{

    const atorOrigem = selectAtorOrigem.value;
    const atorDestino = selectAtorDestino.value;

    const grafo = new Grafo();
    
    grafo.semearAPartirDeArquivo('latest_movies.json', () => {
        const caminho = grafo.bsf(atorOrigem, atorDestino);  
    
        if(caminho == null){
            res.innerHTML = "Caminho não encontrado!" 
            return;
        }

        let comprimento = caminho.length;
        let caminhoTratado = caminho.join(" ➯ ");

        res.innerHTML = caminhoTratado            
        resComprimento.innerHTML  = "Comprimento de tamanho " + comprimento;

    });

})