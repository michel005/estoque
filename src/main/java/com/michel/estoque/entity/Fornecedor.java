package com.michel.estoque.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "es_fornecedor")
@ToString
@Getter
@Setter
public class Fornecedor extends AbstractEntity {

    @Column(name = "cpf_cnpj", length = 14, nullable = false)
    private String cpfCnpj;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pessoa", length = 1, nullable = false)
    private TipoPessoa tipoPessoa;

    @Column(name = "nome", length = 50, nullable = false)
    private String nome;
    
}
