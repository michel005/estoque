package com.michel.estoque.business;

import java.util.List;

import com.michel.estoque.entity.EventoEntrada;
import com.michel.estoque.entity.ItemEventoEntrada;
import com.michel.estoque.repository.EventoEntradaRepository;
import com.michel.estoque.validation.EventoEntradaValidation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EventoEntradaBusiness extends AbstractBusiness<EventoEntrada, EventoEntradaRepository, EventoEntradaValidation> {

    @Autowired
    private ItemEventoEntradaBusiness itemEventoEntradaBusiness;

    @Override
    public void excluir(EventoEntrada entidade) {
        List<ItemEventoEntrada> itens = itemEventoEntradaBusiness.buscaPorEventoEntrada(entidade.getId());
        for (ItemEventoEntrada item : itens) {
            itemEventoEntradaBusiness.excluir(item);
        }
        super.excluir(entidade);
    }
}
