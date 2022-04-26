package com.michel.estoque.model;

import java.math.BigDecimal;

import com.michel.estoque.entity.Item;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class QuantidadeItemModel {

    private Long id;
    
    private String nome;

    private String categoria;

    private Long quantidade;

    private BigDecimal minValor;

    private BigDecimal maxValor;

    public QuantidadeItemModel(Item item, Long quantidade, BigDecimal minValor, BigDecimal maxValor) {
        this.id = item.getId();
        this.nome = item.getNome();
        this.categoria = item.getCategoria();
        this.quantidade = quantidade;
        this.minValor = minValor;
        this.maxValor = maxValor;
    }

}