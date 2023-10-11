package org.edu.unidep.model;

import io.smallrye.common.constraint.NotNull;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
public class Pedido implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo")
    private Long codigoPedido;

    @NotNull
    @Column(name = "dataEmissao")
    private LocalDate dataEmissao;

    @NotNull
    @Column(name = "cliente")
    private String cliente;

    @NotNull
    @Column(name = "codigoOrcamento")
    private String codigoOrcamento;


    public Long getCodigoPedido() {
        return codigoPedido;
    }

    public void setCodigoPedido(Long codigoPedido) {
        this.codigoPedido = codigoPedido;
    }

    public LocalDate getDataEmissao() {
        return dataEmissao;
    }

    public void setDataEmissao(LocalDate dataEmissao) {
        this.dataEmissao = dataEmissao;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String nomeCliente) {
        this.cliente = nomeCliente;
    }

    public String getCodigoOrcamento() {
        return codigoOrcamento;
    }

    public void setCodigoOrcamento(String codigoOrcamento) {
        this.codigoOrcamento = codigoOrcamento;
    }
}
