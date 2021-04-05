import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as services from '../../services/ecommerceServices';

@Component({
  selector: 'app-loja-produtos',
  templateUrl: './loja-produtos.component.html',
  styleUrls: ['./loja-produtos.component.css']
})
export class LojaProdutosComponent implements OnInit {

  //atributos (dados)
  produtos = []; //array vazio
  produto = {
    id:'',nome:'',preco:'',descricao:'',foto : ''
  } //json

  //variavel para usar o endereco da API para exibir as fotos dos produtos
  path:string;

  //Injeção de dependência
  constructor(private httpClient:HttpClient) { }

  //função executada antes do componente ser renderizado
  ngOnInit(): void {
    this.consultarProdutos();
    this.path = environment.apiEcommerce;
  }

  //função para acessar a API e consultar os produtos
  consultarProdutos() : void {
    
      //realizando uma chamada GET para consultar produtos na API..
      this.httpClient.get(environment.apiEcommerce + "api/produtos")
        .subscribe( //recebendo o PROMISSE da API (retorno)
          (data:any[]) => { //recebndo o PROMISSE de sucesso da API
            this.produtos = data;
          },
          e => { //recebndo o PROMISSE de erro da API
            console.log(e);
          }
        );
  }
  //funcao executada no evento click do botao
  obterProduto(item):void{
    this.produto = item;
  }
//funcao para adicionar o produto na cesta de compras
comprarProduto(produto) : void{
  //adicionar o produto da cesta de compras
  services.adicionarItem(produto);
  //redirecionar para a pagina de cesta de compras
  location.href = "/cesta-de-compras";
}

}
