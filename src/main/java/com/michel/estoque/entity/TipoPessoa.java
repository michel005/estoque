package com.michel.estoque.entity;

import lombok.Getter;

public enum TipoPessoa {

    F("Física"), J("Juridica");

    @Getter
    private String descricao;

    private TipoPessoa(String descricao) {
        this.descricao = descricao;
    }
    
}
