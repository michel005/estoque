package com.michel.estoque.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "es_item_evento_entrada")
@ToString(callSuper = true)
@Getter
@Setter
public class ItemEventoEntrada extends AbstractEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "item_id", nullable = false, referencedColumnName = "id")
    private Item item;

    @ManyToOne(optional = false)
    @JoinColumn(name = "evento_entrada_id", nullable = false, referencedColumnName = "id")
    private EventoEntrada eventoEntrada;

    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;

}