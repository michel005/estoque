package com.michel.estoque.model;

import java.util.ArrayList;
import java.util.List;

import com.michel.estoque.entity.EventoEntrada;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EventoEntradaAnaliticoModel {

    private EventoEntrada eventoEntrada;
    private List<ItemEventoEntradaModel> itens = new ArrayList<>();

}