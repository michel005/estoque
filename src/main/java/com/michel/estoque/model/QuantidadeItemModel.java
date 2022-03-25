package com.michel.estoque.model;

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

    public QuantidadeItemModel(Item item, Long quantidade) {
        this.item = item;
        this.quantidade = quantidade;
    }

}