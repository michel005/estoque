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

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "telefone", length = 50)
    private String telefone;

    @Column(name = "cidade", length = 50)
    private String cidade;

    @Column(name = "estado", length = 50)
    private String estado;

    @Column(name = "pais", length = 50)
    private String pais;

    @Column(name = "cep", length = 50)
    private String cep;

    @Column(name = "rua", length = 50)
    private String rua;

    @Column(name = "numero", length = 50)
    private String numero;

    @Column(name = "bairro", length = 50)
    private String bairro;

    @Column(name = "complemento", length = 50)
    private String complemento;
    
}
