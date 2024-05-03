//const fs = require('fs');

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

    semearAPartirDeArquivo(nomeArquivo, callback) {
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

            // const dados = JSON.parse(fs.readFileSync(nomeArquivo, 'utf8')); 
            // dados.forEach(filme => {
            //     const elenco = filme.cast;
            //     this.adicionarVertice(filme.title);
            //     elenco.forEach(ator => {
            //         this.adicionarVertice(ator);                
            //         this.adicionarAresta(ator,filme.title);
            //     })
                
            // });
            
        } catch (erro) {
            console.error("Erro ao semear o grafo:", erro);
        }

    }

    show(){
        for(let vertice in window.dados){
        console.log("Vertice: " + vertice + "\n Arestas -> " + window.dados[vertice])
        }
    }

    grau(){
        for(let vertice in this.listaAdj){
            console.log("Vertice: " + vertice + " tem grau -> " + this.listaAdj[vertice].length)
            }
    }

   

    bsf(verticeOrigem, verticeDestino){

        const fila = [verticeOrigem];

        const caminho = {};
        caminho[verticeOrigem] = [verticeOrigem];

        let marcado = {};
        let vertice;
        while(fila.length > 0){

            vertice =  fila.shift()
            console.log("--------------------------------------------------")
            console.log("Vertice " + vertice)       
           
                console.log(window.dados[vertice])
                    for (const vizinho of window.dados[vertice]) {


                        if(!marcado[vizinho]){ 
                            marcado[vizinho] = true;                      
                            fila.push(vizinho)
                            console.log("vizinho "+ vizinho)
                            console.log("fila " + fila)
                            console.log("caminho do vertice " +  caminho[vertice])
                            console.log("concatenacao " + caminho[vertice].concat(vizinho))
                            caminho[vizinho] = caminho[vertice].concat(vizinho);
                            console.log("Caminho de " +vizinho+ " = "+ caminho[vizinho])
                        }

                        if(vizinho === verticeDestino){
                            console.log("encontrou " + caminho[vizinho])
                            return caminho[vizinho];
                        }  
                }
                console.log("--------------------------------------------------")
        } 

        return null;
    }
}