package com.michel.estoque.model;

import com.michel.estoque.entity.EventoEntrada;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;
import java.util.TreeMap;

@Getter
@Setter
@ToString
public class EventoEntradaModel {

    private EventoEntrada eventoEntrada;
    private Map<String, Integer> itens = new TreeMap<>();

}