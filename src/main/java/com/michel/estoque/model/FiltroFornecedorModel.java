package com.michel.estoque.model;

import com.michel.estoque.entity.TipoPessoa;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FiltroFornecedorModel {
    
    private String nome;
    private String cpfCnpj;
    private String tipoPessoa;

}
