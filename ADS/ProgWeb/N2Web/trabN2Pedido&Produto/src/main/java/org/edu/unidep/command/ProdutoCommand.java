package org.edu.unidep.command;

import java.time.LocalDate;

public record ProdutoCommand(
        String nome,
        String categoria,
        String codigoEAN,
        LocalDate dataValidade
) {
}
