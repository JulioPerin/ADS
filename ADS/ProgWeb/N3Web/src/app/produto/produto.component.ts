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
  codigoAtualizar: string = '';
  descricaoAtualizar: string = '';
  unidadeDeMedidaAtualizar: string = '';
  vencimentoAtualizar: string = '';
  codigoExcluir: string = '';
  buscaRealizada: boolean = false; 
  item: any = {
    user: {
      picture: 'assets/img/Angular.png'
    }
  };

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
    if (!this.codigo) {
      this.showPopupErro("Código não pode ser nulo");
      return;
    }
    const baseUrl = 'http://localhost:8080'; 
    this.http.get(`${baseUrl}/produtos/${this.codigo}`).subscribe(
      (response: any) => {
        this.produto = response || null;
        this.buscaRealizada = true;
      },
      (error: any) => {
        console.error(error);
        this.produto = null;
        this.buscaRealizada = true;
        this.showPopupErro("Código Inválido");
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

    if(!this.descricao && !this.unidadeDeMedida && !this.vencimento)
        {
          this.showPopupErro("Insira pelo menos uma informação");
            return; 
        }
  
    this.http.post<Produto>(`${baseUrl}/produtos`, data).subscribe(
      (response: Produto) => {
        console.log(response)
        this.descricao = '';
        this.unidadeDeMedida = '';
        this.vencimento = '';
        this.showPopup("Produto cadastrado com sucesso");
        this.listarProdutos();
      },
      (error: any) => {
        this.showPopupErro("Não foi possível cadastrar o produto");
        console.error('Erro na solicitação:', error);
      }
    );
  }

  atualizarProduto() {
    const baseUrl = 'http://localhost:8080'; 
    const codigo = this.codigoAtualizar; 
  
    const data = {
      descricao: this.descricaoAtualizar || null,
      unidadeDeMedida: this.unidadeDeMedidaAtualizar || null,
      vencimento: this.vencimentoAtualizar || null,
    };
  
    this.http.put<Produto>(`${baseUrl}/produtos/${codigo}`, data).subscribe(
      (response: Produto) => {
        this.descricaoAtualizar = '';
        this.unidadeDeMedidaAtualizar = '';
        this.vencimentoAtualizar= '';
        this.showPopup("Produto atualizado com sucesso");
        this.listarProdutos();
      },
      (error: any) => {
        this.showPopupErro("Não foi possível atualizar o Produto");
        console.error('Erro na solicitação:', error);
      }
    );
  }


  excluirProduto() {
    const baseUrl = 'http://localhost:8080'; // Substitua pelo URL real da sua API
    const codigo = this.codigoExcluir; // Use o código do produto do componente

    if(!this.codigoExcluir)
    {
      this.showPopupErro('Informe um código para prosseguir');
    }

    fetch(`${baseUrl}/produtos/${codigo}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.status === 200) {
          this.showPopup('Produto excluído com sucesso.');
         this.listarProdutos();
        } else if (response.status === 404) {
          this.showPopupErro('Código inválido');
        }
      });
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
    const popupErro = document.getElementById('popupErro');
    if (popup) {
      popup.style.display = 'none';
    }
    if(popupErro)
    {
      popupErro.style.display = 'none';
    }
  }
 }
  


