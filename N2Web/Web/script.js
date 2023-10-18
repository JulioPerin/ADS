document.addEventListener("DOMContentLoaded", async function () {
    const baseUrl = 'http://localhost:8080';

    async function listarProdutos() {
        try {
            const response = await fetch(`${baseUrl}/produtos`);
            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.status}`);
            }
            const data = await response.json();

            console.log(data);

            const produtoList = document.getElementById('produto-list');
            produtoList.innerHTML = '';
            data.forEach(produto => {
                const listItem = document.createElement('li');
                listItem.textContent = `Código: ${produto.codigoProduto}, Descrição: ${produto.descricao}, Unidade de Medida: ${produto.unidadeDeMedida}, Vencimento: ${produto.vencimento}`;
                produtoList.appendChild(listItem);
            });
        } catch (error) {
            console.error(error);
        }
    }

    listarProdutos();

    // Função para buscar um produto por código
    function buscarProdutoPorCodigo(codigo) {
        fetch(`${baseUrl}/produtos/${codigo}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                if (response.status === 404) {
                    showPopupErro('Codigo inválido');
                } else {
                    return null;
                }
            })
            .then(produto => {
                const produtoDetalhes = document.getElementById('produto-detalhes');
                produtoDetalhes.innerHTML = '';
                if (produto) {
                    const detalhesItem = document.createElement('p');
                    detalhesItem.textContent = `Código: ${codigo}, Descrição: ${produto.descricao}, Unidade de Medida: ${produto.unidadeDeMedida}, Vencimento: ${produto.vencimento}`;
                    produtoDetalhes.appendChild(detalhesItem);
                } else {
                    const erroItem = document.createElement('p');
                    erroItem.textContent = 'Produto não encontrado.';
                    produtoDetalhes.appendChild(erroItem);
                }
            });
    }

    // Listar produtos por código ao enviar o formulário
    const buscarForm = document.getElementById('buscar-form');
    buscarForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const codigo = document.getElementById('codigo').value;
        buscarProdutoPorCodigo(codigo);
    });


    //Cadastrar Produtos
    const produtoForm = document.getElementById('produto-form');

    produtoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const descricao = document.getElementById('descricao').value || null;
        const unidadeDeMedida = document.getElementById('unidadeDeMedida').value || null;
        const vencimento = document.getElementById('vencimento').value || null;

        fetch(`${baseUrl}/produtos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descricao, unidadeDeMedida, vencimento })
        })
            .then(response => {
                if (response.status === 201) {

                    // Limpar os campos do formulário após o cadastro bem-sucedido
                    document.getElementById('descricao').value = '';
                    document.getElementById('unidadeDeMedida').value = '';
                    document.getElementById('vencimento').value = '';

                    showPopup('Item cadastrado com sucesso');
                    listarProdutos();

                } else {
                    showPopup('Não foi possível cadastrar o item');
                    return response.json().then(errorData => {
                        console.error(`Erro na solicitação: ${response.status}`, errorData);
                        feedbackElement.textContent = 'Erro ao cadastrar o produto.';
                        feedbackElement.classList.remove('success');
                        feedbackElement.classList.add('error');
                        feedbackElement.style.display = 'block';
                        throw new Error(`Erro na solicitação: ${response.status}`);

                    });
                }
            })
            .catch(error => {
                console.error(error);
                // Lidar com erros na solicitação
            });
    });

    // Atualizar produto
    const atualizarForm = document.getElementById('atualizar-form');
    atualizarForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const codigo = document.getElementById('atualizarCodigo').value;
        const descricao = document.getElementById('atualizarDescricao').value || null;
        const unidadeDeMedida = document.getElementById('atualizarUnidadeDeMedida').value || null;
        const vencimento = document.getElementById('atualizarVencimento').value || null;

        fetch(`${baseUrl}/produtos/${codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descricao, unidadeDeMedida, vencimento })
        })
            .then(response => {
                if (response.status === 200) {
                    showPopup('Item atualizado com sucesso');
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
                if (response.status === 404) {
                    showPopupErro('Codigo inválido');
                }
                else {
                    showPopupErro("Não foi possível atualizar o item");
                }
            });
    });

    // Excluir produto
    const excluirForm = document.getElementById('excluir-form');
    excluirForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const codigo = document.getElementById('excluirCodigo').value;

        fetch(`${baseUrl}/produtos/${codigo}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.status === 200) {
                    showPopup('Item excluído com sucesso.');
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
                if (response.status === 404) {
                    // Exemplo de uso para exibir o pop-up ao excluir um item
                    showPopupErro('Item não encontrado');
                }
            });
    });

    function showPopup(message) {
        const popup = document.getElementById('popup');
        const popupMessage = document.getElementById('popup-message');

        popupMessage.textContent = message;
        popup.style.display = 'block';

        // Feche o pop-up automaticamente após 3 segundos (pode ajustar o tempo conforme necessário)
        setTimeout(() => {
            hidePopup();
        }, 3000);
    }

    // Função para ocultar o pop-up
    function hidePopup() {
        const popup = document.getElementById('popup');
        popup.style.display = 'none';
    }

    function showPopupErro(message) {
        const popup = document.getElementById('popupErro');
        const popupMessage = document.getElementById('popup-messageErro');

        popupMessage.textContent = message;
        popup.style.display = 'block';

        // Feche o pop-up automaticamente após 3 segundos (pode ajustar o tempo conforme necessário)
        setTimeout(() => {
            hidePopupErro();
        }, 3000);
    }

    // Função para ocultar o pop-up
    function hidePopupErro() {
        const popup = document.getElementById('popupErro');
        popup.style.display = 'none';
    }

});
