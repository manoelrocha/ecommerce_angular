import { Component, OnInit } from '@angular/core';
import * as services from '../../services/ecommerceServices';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-cesta-de-compras',
  templateUrl: './cesta-de-compras.component.html',
  styleUrls: ['./cesta-de-compras.component.css']
})
export class CestaDeComprasComponent implements OnInit {

  //atributo
  dados = {
    itens : [],
    total : 0
  }

  path:string;

  constructor() { }

  //sempre q o componente é aberto (renderizado)
  ngOnInit(): void {
    //recuperar todo conteudo da cesta de compras gravado em sessao (localstorage)
    this.dados = services.obterItens();

    //armazenar o caminho do servidor na API
    this.path = environment.apiEcommerce;

  }
  aumentarItem(item) : void{
    services.adicionarItem(item);
    //executando nova consulta na cesta de compras para atualizar informacoes na tela
    this.dados = services.obterItens();
  }
  diminuirItem(item) : void{
    services.removerItem(item);
    //executando nova consulta na cesta de compras para atualizar informacoes na tela
    this.dados = services.obterItens();
  }

}
