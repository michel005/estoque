package com.michel.estoque.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FiltroItemModel {
    
    private String nome;
    private String categoria;
    private String orderBy;
    private String orderByDirection;

}
