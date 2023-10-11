package org.edu.unidep.rest.response;

import org.edu.unidep.model.*;

import java.time.LocalDate;

public record ProdutoResponse(
        Long codigo,
        String nome,
        String categoria,
        String codigoEAN,
        LocalDate dataValidade
) {
    public static ProdutoResponse toResponse(Produto produto) {
        return new ProdutoResponse(
                produto.getCodigoProduto(),
                produto.getNome(),
                produto.getCategoria(),
                produto.getCodigoEAN(),
                produto.getDataValidade()
        );
    }
}
