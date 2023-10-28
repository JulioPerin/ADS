package org.edu.unidep.service;

import org.edu.unidep.command.*;
import org.edu.unidep.model.Pedido;
import org.edu.unidep.repository.PedidoRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class PedidoService {

    private final PedidoRepository pedidoRepository;

    @Inject
    public PedidoService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    public void criarPedido(PedidoCommand pedido) {
        pedidoRepository.criarPedido(pedido);
    }

    public List<Pedido> listarTodosPedidos() {
        return pedidoRepository.listarTodosPedidos();
    }

    public List<Pedido> listarPedidosPorData(LocalDate data) {
        return pedidoRepository.listarPedidosPorData(data);
    }

    public List<Pedido> listarPedidosPorNomeCliente(String cliente) {
        return pedidoRepository.listarPedidosPorNomeCliente(cliente);
    }
}
