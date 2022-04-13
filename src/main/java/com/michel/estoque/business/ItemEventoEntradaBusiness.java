package com.michel.estoque.business;

import com.michel.estoque.entity.EventoEntrada;
import com.michel.estoque.entity.Item;
import com.michel.estoque.entity.ItemEventoEntrada;
import com.michel.estoque.repository.ItemEventoEntradaRepository;
import com.michel.estoque.validation.ItemEventoEntradaValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ItemEventoEntradaBusiness extends AbstractBusiness<ItemEventoEntrada, ItemEventoEntradaRepository, ItemEventoEntradaValidation> {

    @Autowired
    private EventoEntradaBusiness eventoEntradaBusiness;

    @Autowired
    private ItemBusiness itemBusiness;

    public List<ItemEventoEntrada> buscaPorEventoEntrada(Long idEventoEntrada) {
        EventoEntrada eventoEntrada = eventoEntradaBusiness.buscaPorId(idEventoEntrada);
        return repo.findByEventoEntrada(eventoEntrada);
    }

    public Integer quantidadeTotalPorItem(Long idItem) {
        Item item = itemBusiness.buscaPorId(idItem);
        Integer quantidade = repo.sumQuantidadeByItem(item);
        return quantidade == null ? 0 : quantidade;
    }

    public ItemEventoEntrada buscarPorEventoEntradaItem(EventoEntrada eventoEntrada, Item item) {
        return repo.findByEventoEntradaItem(eventoEntrada, item).orElse(null);
    }

}
