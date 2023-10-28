package org.edu.unidep.repository;

import org.edu.unidep.command.*;
import org.edu.unidep.model.Pedido;

import java.time.LocalDate;
import java.util.List;

public interface PedidoRepository {
    void criarPedido(PedidoCommand pedidoCommand);

    List<Pedido> listarTodosPedidos();

    List<Pedido> listarPedidosPorData(LocalDate data);

    List<Pedido> listarPedidosPorNomeCliente(String cliente);
}
