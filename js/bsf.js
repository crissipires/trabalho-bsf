export default class Grafo {

    constructor() {
        this.listaAdj = {};
    }
   
    adicionarVertice(vertice) {
      if(vertice in this.listaAdj){
        return;
      }

      this.listaAdj[vertice] = []; 
    }
  
    adicionarAresta(vertice1, vertice2) {
        if(!this.listaAdj[vertice1].includes(vertice2)){
            this.listaAdj[vertice1].push(vertice2);
        }

        if(!this.listaAdj[vertice2].includes(vertice1)){
            this.listaAdj[vertice2].push(vertice1);
        }     
    }

    recuperarDadosJson(nomeArquivo, callback) {
        try {
            fetch(nomeArquivo)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao carregar o arquivo');
                    }
                    return response.json(); 
                })
                .then(dados => {
                    for (const filme of dados) {
                        this.adicionarVertice(filme.title);

                        const elenco = filme.cast;
                        elenco.forEach(ator => {
                            this.adicionarVertice(ator);                
                            this.adicionarAresta(ator,filme.title);
                        }) 
                      }
                      window.dados = this.listaAdj;
                      callback(); 
                })
                .catch(error => {
                    console.error(error); 
            });
        } catch (erro) {
            console.error("Erro ao semear o grafo:", erro);
        }

    }

    bsf(verticeOrigem, verticeDestino){
        let vertice;

        const fila = [verticeOrigem];

        const caminho = {};
        caminho[verticeOrigem] = [verticeOrigem];

        while(fila.length > 0){
            vertice =  fila.shift()
            
            console.log("--------------------------------------------------")
            console.log("Vertice " + vertice)       
            console.log(window.dados[vertice])

                for (const vizinho of window.dados[vertice]) {
                    if(!caminho.hasOwnProperty(vizinho)){                  
                        fila.push(vizinho)                   
                        
                        console.log("vizinho = "+ vizinho)
                        console.log("caminho do vertice pai = " +  caminho[vertice])
                        console.log("concatenacao = " + caminho[vertice].concat(vizinho))
                        
                        caminho[vizinho] = caminho[vertice].concat(vizinho);

                        console.log("Caminho de " +vizinho+ " = "+ caminho[vizinho])

                    }

                    if(vizinho === verticeDestino){
                        return caminho[vizinho];
                    }  
                }
            console.log("--------------------------------------------------")
        } 

        return null;
    }

     
    bsf6(verticeOrigem, verticeDestino) {
        const caminhos = []; 
        const fila = [{ vertice: verticeOrigem, caminho: [verticeOrigem], arestas: 0 }];
    
        while (fila.length > 0) {
            const { vertice, caminho, arestas } = fila.shift();
    
            if (arestas === 6) {
                continue; 
            }
    
            for (const vizinho of window.dados[vertice]) {
                if (!caminho.includes(vizinho)) {
                    const novoCaminho = caminho.concat(vizinho);
                    const novasArestas = arestas + 1;
    
                    if (vizinho === verticeDestino) {
                        caminhos.push(novoCaminho);
                    } else {
                        fila.push({ vertice: vizinho, caminho: novoCaminho, arestas: novasArestas });
                    }
                }
            }
        }
        console.log(caminhos)
        return caminhos;


    }
    
    
    
    
}
    