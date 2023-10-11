package org.edu.unidep.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.smallrye.common.constraint.NotNull;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Produto")
public class Produto extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CodigoProduto")
    private Long codigoProduto;

    @NotNull
    @Column(name = "Descricao", length = 80)
    private String descricao;

    @NotNull
    @Column(name = "UnidadeDeMedida", length = 80)
    private Long unidadeDeMedida;

    @NotNull
    @Column(name = "Vencimento")
    private LocalDate vencimento;

    public Produto(String descricao, Long unidadeDeMedida, LocalDate vencimento) {
        this.descricao = descricao;
        this.unidadeDeMedida = unidadeDeMedida;
        this.vencimento = vencimento;
    }

    public Produto() {

    }

    public Long getCodigoProduto() {
        return codigoProduto;
    }

    public void setCodigoProduto(Long codigoProduto) {
        this.codigoProduto = codigoProduto;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getUnidadeDeMedida() {
        return unidadeDeMedida;
    }

    public void setUnidadeDeMedida(Long unidadeDeMedida) {
        this.unidadeDeMedida = unidadeDeMedida;
    }

    public LocalDate getVencimento() {
        return vencimento;
    }

    public void setVencimento(LocalDate vencimento) {
        this.vencimento = vencimento;
    }

    @Override
    public String toString() {
        return "Produto{" +
                "codigoProduto=" + codigoProduto +
                ", descricao='" + descricao + '\'' +
                ", unidadeDeMedida=" + unidadeDeMedida +
                ", vencimento=" + vencimento +
                '}';
    }

}
