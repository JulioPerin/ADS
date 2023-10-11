package org.edu.unidep.rest.response;

import org.edu.unidep.model.Pedido;

import java.time.LocalDate;

public record PedidoResponse(
        Long codigoPedido,
        LocalDate dataEmissao,
        String cliente,
        String codigoOrcamento
) {
    public static PedidoResponse toResponse(Pedido pedido) {
        return new PedidoResponse(
                pedido.getCodigoPedido(),
                pedido.getDataEmissao(),
                pedido.getCliente(),
                pedido.getCodigoOrcamento()
        );
    }
}
