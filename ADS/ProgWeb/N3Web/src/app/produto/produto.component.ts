import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Produto {
  codigoProduto: number = 0; 
  descricao: string = '';
  unidadeDeMedida: number = 0;
  vencimento: string = '';
}

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listarProdutos();
  }

  listarProdutos() {
    this.http.get('http://localhost:8080/produtos').subscribe(
      (response: any) => {
        this.produtos = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
