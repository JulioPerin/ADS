package org.edu.unidep.repository;

import org.edu.unidep.command.ProdutoCommand;
import org.edu.unidep.model.Produto;

import java.util.List;

public interface ProdutoRepository {
    List<Produto> listarProdutos();

    void excluirProduto(Long codigo);

    void salvarProduto(ProdutoCommand command);

    Produto buscarProduto(Long codigo);

//    void atualizarProduto(Produto produto);

}
