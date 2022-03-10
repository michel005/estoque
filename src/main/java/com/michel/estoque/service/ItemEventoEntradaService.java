package com.michel.estoque.service;

import java.util.List;

import com.michel.estoque.business.ItemEventoEntradaBusiness;
import com.michel.estoque.entity.ItemEventoEntrada;

import org.springframework.stereotype.Service;

@Service
public class ItemEventoEntradaService extends AbstractService<ItemEventoEntrada, ItemEventoEntradaBusiness> {

    @Override
    public void antesCadastrar(ItemEventoEntrada entidade) {

    }

    @Override
    public void antesAlterar(ItemEventoEntrada entidade) {

    }

    public ServiceResponse<List<ItemEventoEntrada>> buscaPorEventoEntrada(Long idEventoEntrada) {
        return ServiceResponse.callback(() -> negocio.buscaPorEventoEntrada(idEventoEntrada));
    }

    public ServiceResponse<Integer> quantidadeTotalPorItem(Long idItem) {
        return ServiceResponse.callback(() -> negocio.quantidadeTotalPorItem(idItem));
    }
}
