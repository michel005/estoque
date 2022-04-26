package com.michel.estoque.model;

import java.math.BigDecimal;

import com.michel.estoque.entity.ItemEventoEntrada;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ItemEventoEntradaModel {

    private String nomeItem;
    private Integer quantidade;
    private BigDecimal valor;

    public ItemEventoEntradaModel() {
        
    }

    public ItemEventoEntradaModel(ItemEventoEntrada itemEventoEntrada) {
        if (itemEventoEntrada.getItem() != null) {
            this.nomeItem = itemEventoEntrada.getItem().getNome();
        }
        this.quantidade = itemEventoEntrada.getQuantidade();
        this.valor = itemEventoEntrada.getValor();
    }

}
