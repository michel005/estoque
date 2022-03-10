package com.michel.estoque.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "es_item")
@ToString
@Getter
@Setter
public class Item extends AbstractEntity {

    @Column(name = "nome", length = 45, nullable = false)
    private String nome;

    @Column(name = "categoria", length = 50)
    private String categoria;

}
