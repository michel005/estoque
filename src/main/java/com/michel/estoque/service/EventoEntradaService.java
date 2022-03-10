package com.michel.estoque.service;

import java.time.LocalDateTime;
import java.util.List;

import com.michel.estoque.business.EventoEntradaBusiness;
import com.michel.estoque.business.ItemBusiness;
import com.michel.estoque.business.ItemEventoEntradaBusiness;
import com.michel.estoque.entity.EventoEntrada;
import com.michel.estoque.entity.Item;
import com.michel.estoque.entity.ItemEventoEntrada;
import com.michel.estoque.model.EventoEntradaAnaliticoModel;
import com.michel.estoque.model.EventoEntradaModel;
import com.michel.estoque.model.ItemEventoEntradaModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventoEntradaService extends AbstractService<EventoEntrada, EventoEntradaBusiness> {

    @Autowired
    private ItemEventoEntradaBusiness itemEventoEntradaBusiness;

    @Autowired
    private ItemBusiness itemBusiness;

    @Override
    public void antesCadastrar(EventoEntrada entidade) {
        entidade.setDataEntrada(LocalDateTime.now());
    }

    @Override
    public void antesAlterar(EventoEntrada entidade) {
        entidade.setDataEntrada(LocalDateTime.now());
    }

    public ServiceResponse<EventoEntrada> cadastrar(EventoEntradaAnaliticoModel model) {
        return ServiceResponse.callback(() -> {
            if (model.getEventoEntrada().getId() != null) {
                negocio.excluir(model.getEventoEntrada());
                model.getEventoEntrada().setId(null);
            }

            model.getEventoEntrada().setDataEntrada(LocalDateTime.now());
            EventoEntrada eventoEntrada = negocio.cadastrar(model.getEventoEntrada());

            List<ItemEventoEntradaModel> itens = model.getItens();
            for (ItemEventoEntradaModel item : itens) {
                Item i = itemBusiness.buscaPorNome(item.getNomeItem());
                ItemEventoEntrada itemEventoEntrada = new ItemEventoEntrada();
                itemEventoEntrada.setEventoEntrada(eventoEntrada);
                itemEventoEntrada.setItem(i);
                itemEventoEntrada.setQuantidade(item.getQuantidade());
                itemEventoEntradaBusiness.cadastrar(itemEventoEntrada);
            }
            return eventoEntrada;
        });
    }

    public ServiceResponse<EventoEntradaModel> visualizar(Long id) {
        return ServiceResponse.callback(() -> {
            ServiceResponse<EventoEntrada> resposta = buscaPorId(id);
            if (resposta.temExcecao()) {
                resposta.getExcecao().invocarExcecao();
            }
            EventoEntradaModel model = new EventoEntradaModel();
            model.setEventoEntrada(resposta.getObjeto());
            for (ItemEventoEntrada itemEventoEntrada : itemEventoEntradaBusiness.buscaPorEventoEntrada(model.getEventoEntrada().getId())) {
                model.getItens().put(itemEventoEntrada.getItem().getNome(), itemEventoEntrada.getQuantidade());
            }
            return model;
        });
    }

    public ServiceResponse<EventoEntradaAnaliticoModel> visualizarAnalitico(Long id) {
        return ServiceResponse.callback(() -> {
            EventoEntrada eventoEntrada = negocio.buscaPorId(id);
            EventoEntradaAnaliticoModel model = new EventoEntradaAnaliticoModel();
            model.setEventoEntrada(eventoEntrada);
            for (ItemEventoEntrada itemEventoEntrada : itemEventoEntradaBusiness.buscaPorEventoEntrada(model.getEventoEntrada().getId())) {
                model.getItens().add(new ItemEventoEntradaModel(itemEventoEntrada));
            }
            return model;
        });
    }
}
