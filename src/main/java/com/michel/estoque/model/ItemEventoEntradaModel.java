package com.michel.estoque.model;

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

    public ItemEventoEntradaModel() {
        
    }

    public ItemEventoEntradaModel(ItemEventoEntrada itemEventoEntrada) {
        this.nomeItem = itemEventoEntrada.getItem().getNome();
        this.quantidade = itemEventoEntrada.getQuantidade();
    }

}
