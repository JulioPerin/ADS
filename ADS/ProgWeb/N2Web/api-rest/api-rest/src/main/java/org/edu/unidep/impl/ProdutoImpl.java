package org.edu.unidep.impl;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.edu.unidep.model.Produto;
import org.edu.unidep.repository.ProdutoRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class ProdutoImpl implements PanacheRepository<Produto>,
        ProdutoRepository {

    @Override
    public List<Produto> listarProdutos() {
        return listAll();
    }

    @Override
    public Produto buscarProdutoPorCodigo(Long codigo) {
        return findById(codigo);
    }

    @Override
    public void salvarProduto(Produto produto) {
        persist(produto);
    }

    @Override
    public void atualizarProduto(Produto produto) {
        update("descricao = ?1, unidadeDeMedida = ?2, vencimento = ?3 where codigoProduto = ?4",
                produto.getDescricao(),
                produto.getUnidadeDeMedida(),
                produto.getVencimento(),
                produto.getCodigoProduto());
    }

    @Override
    public void excluirProdutoPorCodigo(Long codigo) {
        deleteById(codigo);
    }

}

