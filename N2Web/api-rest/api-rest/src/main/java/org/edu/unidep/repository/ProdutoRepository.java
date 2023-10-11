package org.edu.unidep.repository;

import org.edu.unidep.model.Produto;

import java.util.List;

public interface ProdutoRepository {

    public List<Produto> listarProdutos();

    public void salvarProduto(Produto produto);

    public Produto buscarProdutoPorCodigo(Long codigo);

    public void atualizarProduto(Produto produto);

    public void excluirProdutoPorCodigo(Long codigo);

}
