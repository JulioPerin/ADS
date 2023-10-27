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
      descricao: this.descricao || null,
      unidadeDeMedida: this.unidadeDeMedida || null,
      vencimento: this.vencimento || null,
    };
  
    this.http.post<Produto>(`${baseUrl}/produtos`, data).subscribe(
      (response: Produto) => {
        console.log(response)
        this.descricao = '';
        this.unidadeDeMedida = '';
        this.vencimento = '';
        this.showPopup("Deu boa meu bruxo");
        this.listarProdutos();
      },
      (error: any) => {
        this.showPopupErro("Não deu boa meu bruxo");
        console.error('Erro na solicitação:', error);
      }
    );
  }

  atualizarProduto() {
    const baseUrl = 'http://localhost:8080'; // Substitua pelo URL real da sua API
    const codigo = this.codigo; // Use o código do produto do componente
  
    const data = {
      descricao: this.descricao || null,
      unidadeDeMedida: this.unidadeDeMedida || null,
      vencimento: this.vencimento || null,
    };
  
    this.http.put<Produto>(`${baseUrl}/produtos/${codigo}`, data).subscribe(
      (response: Produto) => {
        this.descricao = '';
        this.unidadeDeMedida = '';
        this.vencimento = '';
        this.showPopup("Item atualizado com sucesso");
        this.listarProdutos();
      },
      (error: any) => {
        this.showPopupErro("Não foi possível atualizar o item");
        console.error('Erro na solicitação:', error);
      }
    );
  }










































  showPopup(message: string) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');

    if (popup && popupMessage) {
      popupMessage.textContent = message;
      popup.style.display = 'block';
      setTimeout(() => { 
        this.hidePopup();
      }, 3000);
    }
  }

  showPopupErro(message: string) {
    const popupErro = document.getElementById('popupErro');
    const popupMessageErro = document.getElementById('popup-messageErro');

    if (popupErro && popupMessageErro) {
      popupMessageErro.textContent = message;
      popupErro.style.display = 'block';
      setTimeout(() => { 
        this.hidePopup();
      }, 3000);
    }
  }

  hidePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'none';
    }
  }
  
 }
  


