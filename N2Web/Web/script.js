document.addEventListener("DOMContentLoaded", function () {
    // Função para listar todos os produtos
    function listarProdutos() {
        fetch('/produtos')
            .then(response => response.json())
            .then(data => {
                const produtoList = document.getElementById('produto-list');
                produtoList.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens
                data.forEach(produto => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Código: ${produto.codigo}, Descrição: ${produto.descricao}, Unidade de Medida: ${produto.unidadeDeMedida}, Vencimento: ${produto.vencimento}`;
                    produtoList.appendChild(listItem);
                });
            });
    }

    // Listar produtos ao carregar a página
    listarProdutos();

    // Função para buscar um produto por código
    function buscarProdutoPorCodigo(codigo) {
        fetch(`/produtos/${codigo}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then(produto => {
                const produtoDetalhes = document.getElementById('produto-detalhes');
                produtoDetalhes.innerHTML = '';
                if (produto) {
                    const detalhesItem = document.createElement('p');
                    detalhesItem.textContent = `Código: ${produto.codigo}, Descrição: ${produto.descricao}, Unidade de Medida: ${produto.unidadeDeMedida}, Vencimento: ${produto.vencimento}`;
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


    // Cadastrar produto
    const produtoForm = document.getElementById('produto-form');
    produtoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const descricao = document.getElementById('descricao').value;
        const unidadeDeMedida = document.getElementById('unidadeDeMedida').value;
        const vencimento = document.getElementById('vencimento').value;

        fetch('/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descricao, unidadeDeMedida, vencimento })
        })
        .then(response => {
            if (response.status === 201) {
                // Recarregar a lista de produtos após o cadastro bem-sucedido
                window.location.reload();
            }
        });
    });

    // Atualizar produto
    const atualizarForm = document.getElementById('atualizar-form');
    atualizarForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const codigo = document.getElementById('atualizarCodigo').value;
        const descricao = document.getElementById('atualizarDescricao').value;
        const unidadeDeMedida = document.getElementById('atualizarUnidadeDeMedida').value;
        const vencimento = document.getElementById('atualizarVencimento').value;

        fetch(`/produtos/${codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descricao, unidadeDeMedida, vencimento })
        })
        .then(response => {
            if (response.status === 200) {
                // Recarregar a lista de produtos após a atualização bem-sucedida
                window.location.reload();
            }
        });
    });

    // Excluir produto
    const excluirForm = document.getElementById('excluir-form');
    excluirForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const codigo = document.getElementById('excluirCodigo').value;

        fetch(`/produtos/${codigo}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.status === 200) {
                // Recarregar a lista de produtos após a exclusão bem-sucedida
                window.location.reload();
            }
        });
    });
});
