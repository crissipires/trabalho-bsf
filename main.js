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

const buttonBsf = document.getElementById('botaobsf');
const buttonBsf6 = document.getElementById('botaobsf6');

buttonBsf.addEventListener('click', () =>{

    const atorOrigem = selectAtorOrigem.value;
    const atorDestino = selectAtorDestino.value;

    const grafo = new Grafo();
    
    grafo.recuperarDadosJson('latest_movies.json', () => {
        const caminhos = grafo.bsf(atorOrigem, atorDestino);  
    
        if(caminhos == null){
            res.innerHTML = "Caminho não encontrado!" 
            return;
        }

        let comprimento = caminhos.length -1;
        let caminhoTratado = caminhos.join(" ➯ ");

        res.innerHTML = caminhoTratado            
        resComprimento.innerHTML  = "Comprimento de tamanho " + comprimento;


    });

})

buttonBsf6.addEventListener('click', () =>{

    const atorOrigem = selectAtorOrigem.value;
    const atorDestino = selectAtorDestino.value;

    const grafo = new Grafo();
    
    grafo.recuperarDadosJson('latest_movies.json', () => {
        const caminhos = grafo.bsf6(atorOrigem, atorDestino);  
    
        if(caminhos == null){
            res.innerHTML = "Caminho não encontrado!" 
            return;
        }

        res.innerHTML = "<h3>Caminhos encontrados:</h3>";
        caminhos.forEach((caminho, index) => {
            let comprimento = caminho.length -1;
            let caminhoFormatado = caminho.join(" ➯ ");
            res.innerHTML += "<p><strong>Caminho " + (index + 1) + ":</strong> " + caminhoFormatado + ". <strong>Comprimento: " + comprimento + "<strong></p>";
  
        });


    });

})