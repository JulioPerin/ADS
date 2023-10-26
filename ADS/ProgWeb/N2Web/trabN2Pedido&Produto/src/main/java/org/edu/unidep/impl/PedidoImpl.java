package org.edu.unidep.impl;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.edu.unidep.command.*;
import org.edu.unidep.model.Pedido;
import org.edu.unidep.repository.PedidoRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class PedidoImpl implements PanacheRepository<Pedido>, PedidoRepository {

    @Transactional
    @Override
    public void criarPedido(PedidoCommand command) {
        Pedido pedido = new Pedido();
        pedido.setCliente(command.cliente());
        pedido.setCodigoOrcamento(command.codigoOrcamento());
        pedido.setDataEmissao(command.dataEmissao());
        persist(pedido);
    }

    @Override
    public List<Pedido> listarTodosPedidos() {
        return listAll();
    }

    @Override
    public List<Pedido> listarPedidosPorData(LocalDate data) {
        return find("dataEmissao", data).list();
    }

    @Override
    public List<Pedido> listarPedidosPorNomeCliente(String cliente) {
        return find("cliente", cliente).list();
    }
}
