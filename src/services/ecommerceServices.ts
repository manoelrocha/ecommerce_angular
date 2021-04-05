//variavel de valor constante
const CESTA_DE_COMPRAS = "cesta_de_compras";

//variavel no formato JSON utilizada para guardar informacoes da cesta de compras do ecommerce
var dados = {
    itens : [], //array vazio (itens da cesta de compra)
    total : 0 // preco total da cesta
}

//funcao para adicionar 1 produto da cesta de compras
//export -> define a funcao como publica (acesso total)
export const adicionarItem = (produto) => {


    //verificar se ja existem itens adicionados na localstorage
    if(localStorage.getItem(CESTA_DE_COMPRAS) != null){
        //lendo conteudo ja gravado no localstorage
        dados = JSON.parse(localStorage.getItem(CESTA_DE_COMPRAS));
    }
    else{
        dados.itens = new Array();
        dados.total = 0;
    }

    //verificar se o produto ja foi adicionado na cesta de compras
    var itemJaAdicionado = false;
    for(var i=0; i < dados.itens.length; i++){
        //verificar se o item obtido na cesta é o mesmo que esta sendo adicionado
        if(dados.itens[i].id == produto.id){
            dados.itens[i].quantidade++; //incrementando a quantidade do item
            itemJaAdicionado = true;
            break;

        }
    }

    //só iremos adiocionar um novo produto na cesta se o item adicionado nao existir
    if(!itemJaAdicionado){
        //adicionar produto na variavel dados
        //push -> metodo para adicionar 1 item na lista (add)
        produto.quantidade = 1;
        dados.itens.push(produto);
        
    }

    dados.total += produto.preco;

    
    

    //localstorage -> gravar estes dados em uma sessao (memoria do navegador)
    //JSON.stringify -> transformando a variavel 'dados' de JSON para string
    localStorage.setItem(CESTA_DE_COMPRAS, JSON.stringify(dados));
}
//funcao para remover itens na cesta de compras
export const removerItem = (produto) =>{
    //recuperando os dados gravados na sessao
    var dados = JSON.parse(localStorage.getItem(CESTA_DE_COMPRAS));
    //percorrer os itens da cesta de compras 
    for (var i=0; i<dados.itens.length; i++){
        if (dados.itens[i].id == produto.id){
            dados.itens[i].quantidade--;
            break;
        }
    }
    //valor total da cesta
    dados.total -= produto.preco;

    dados.itens = dados.itens.filter(
        function(item){
            return item.quantidade > 0;
        }
    )
    //gravar novamente os dados na sessao
    localStorage.setItem(CESTA_DE_COMPRAS, JSON.stringify(dados));
}

//funcai para ler todo o conteudo armazenado na localStorage
export const obterItens = () => {
    var result = localStorage.getItem(CESTA_DE_COMPRAS);
    return JSON.parse(result); //convertendo de string para JSON
}