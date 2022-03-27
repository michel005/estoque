package com.michel.estoque.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "es_evento_entrada")
@ToString
@Getter
@Setter
public class EventoEntrada extends AbstractEntity {

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @Column(name = "data_entrada", nullable = false)
    private LocalDateTime dataEntrada;

    @Column(name = "descricao", nullable = false, length = 100)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = true)
    private StatusEventoEntrada status = StatusEventoEntrada.PENDENTE;

    @ManyToOne
    @JoinColumn(name="fornecedor_id")
    private Fornecedor fornecedor;

}
