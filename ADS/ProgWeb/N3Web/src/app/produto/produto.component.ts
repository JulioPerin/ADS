import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
  codigo: string = ''; 
  produto: Produto | null = null; 
  descricao: string = '';  // Adicione essa linha
  unidadeDeMedida: string = '';  // Adicione essa linha
  vencimento: string = ''; 
  mensagemSucesso: string = '';

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

  buscarProdutoPorCodigo() {
    const baseUrl = 'http://localhost:8080'; 
    this.http.get(`${baseUrl}/produtos/${this.codigo}`).subscribe(
      (response: any) => {
        this.produto = response || null;
      },
      (error: any) => {
        console.error(error);
        this.produto = null;
      }
    );
  }

  cadastrarProduto() {
    const baseUrl = 'http://localhost:8080'; // Substitua pelo URL real da sua API
    const data = {
      descricao: this.descricao,
      unidadeDeMedida: this.unidadeDeMedida,
      vencimento: this.vencimento,
    };
  
    this.http.post<Produto>(`${baseUrl}/produtos`, data).subscribe(
      (response: Produto) => {
        console.log(Produto)
        this.descricao = '';
        this.unidadeDeMedida = '';
        this.vencimento = '';
        console.log("Cadastro bem-sucedido");
        this.listarProdutos();
      },
      (error: any) => {
        console.error('Erro na solicitação:', error);
      }
    );
  }
  
    
 }
  


