package org.edu.unidep.service;

import org.edu.unidep.command.ProdutoCommand;
//import org.edu.unidep.command.ProdutoQuery;
import org.edu.unidep.model.Produto;
import org.edu.unidep.repository.ProdutoRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    @Inject
    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> listar() {
        return produtoRepository.listarProdutos();
    }

    public void salvar(ProdutoCommand command){
        produtoRepository.salvarProduto(command);
    }

    @Transactional
    public ProdutoCommand atualizar(Long id, ProdutoCommand command) {
        Produto produtoEncontrado = produtoRepository.buscarProduto(id);

        produtoEncontrado.setNome(command.nome());
        produtoEncontrado.setDataValidade(command.dataValidade());
        produtoEncontrado.setCategoria(command.categoria());
        produtoEncontrado.setCodigoEAN((command.codigoEAN()));

        return command;
    }



}
