package org.edu.unidep.command;

import java.time.LocalDate;

public record PedidoCommand(
        String cliente,
        String codigoOrcamento,
        LocalDate dataEmissao
) {
}
