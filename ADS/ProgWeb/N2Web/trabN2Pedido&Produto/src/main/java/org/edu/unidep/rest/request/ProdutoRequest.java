package org.edu.unidep.rest.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.smallrye.common.constraint.NotNull;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.edu.unidep.command.ProdutoCommand;

import javax.validation.constraints.Size;
import java.time.LocalDate;

public record ProdutoRequest(
        @Schema(example = "Doritos")
        @NotNull
        @Size(min = 5, max = 80)
        @JsonProperty("nome")
        String nome,

        @Schema(example = "Salgadinho")
        @NotNull
        @Size(min = 2, max = 50)
        @JsonProperty("categoria")
        String categoria,

        @Schema(example = "7892840221843")
        @NotNull
        @Size(min = 13, max = 13)
        @JsonProperty("codigoEAN")
        String codigoEAN,

        @Schema(example = "2023-05-20")
        @NotNull
        @JsonProperty("dataValidade")
        LocalDate dataValidade
) {
    public static ProdutoCommand toCommand(ProdutoRequest request) {
        return new ProdutoCommand(
                request.nome(),
                request.categoria(),
                request.codigoEAN(),
                request.dataValidade()
        );
    }
}
