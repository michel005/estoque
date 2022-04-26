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
    
    private Item item;

    private Long quantidade;

    private BigDecimal minValor;

    private BigDecimal maxValor;

    public QuantidadeItemModel(Item item, Long quantidade, BigDecimal minValor, BigDecimal maxValor) {
        this.item = item;
        this.quantidade = quantidade;
        this.minValor = minValor;
        this.maxValor = maxValor;
    }

}