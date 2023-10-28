package org.edu.unidep.rest.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.smallrye.common.constraint.NotNull;
import net.bytebuddy.asm.*;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.edu.unidep.command.PedidoCommand;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.time.LocalDate;

public record PedidoRequest(

        @Schema(example = "2023-06-15")
        @NotNull
        @JsonProperty("dataEmissao")
        LocalDate dataEmissao,

        @Schema(example = "Nome do Cliente")
        @NotNull
        @Size(min = 2, max = 50)
        @JsonProperty("cliente")
        String cliente,

        @Schema(example = "123")
        @NotNull
        @Size(min=2)
        @JsonProperty("codigoOrcamento")
        String codigoOrcamento
) {
    public static PedidoCommand toCommand(PedidoRequest request) {
        return new PedidoCommand(
                request.cliente(),
                request.codigoOrcamento(),
                request.dataEmissao()
        );
    }

}
