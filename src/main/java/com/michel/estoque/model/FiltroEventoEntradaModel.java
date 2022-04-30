package com.michel.estoque.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class FiltroEventoEntradaModel {

    @JsonFormat(pattern = "ddMMyyyy")
    @DateTimeFormat(pattern = "ddMMyyyy")
    private LocalDate dataEntrada;
    private String descricao;
    private String status;
    private String orderBy;
    private String orderByDirection;
    
}
