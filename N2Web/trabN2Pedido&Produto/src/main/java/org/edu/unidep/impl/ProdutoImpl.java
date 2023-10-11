package org.edu.unidep.impl;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.edu.unidep.command.ProdutoCommand;
import org.edu.unidep.model.Produto;
import org.edu.unidep.repository.ProdutoRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class ProdutoImpl implements PanacheRepository<Produto>, ProdutoRepository {

    @Override
    public List<Produto> listarProdutos() {
        return listAll();
    }


    @Override
    public Produto buscarProduto(Long codigo) {
        return findById(codigo);
    }



    @Override
    public void excluirProduto(Long id) {
        deleteById(id);
    }

    @Transactional
    @Override
    public void salvarProduto(ProdutoCommand command) {
        Produto produto = new Produto();
        produto.setNome(command.nome());
        produto.setCodigoEAN(command.codigoEAN());
        produto.setDataValidade(command.dataValidade());
        produto.setCategoria(command.categoria());

        persist(produto);
    }
}
