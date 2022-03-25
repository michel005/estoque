package com.michel.estoque.business;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.michel.estoque.entity.EventoEntrada;
import com.michel.estoque.entity.ItemEventoEntrada;
import com.michel.estoque.repository.EventoEntradaRepository;
import com.michel.estoque.validation.EventoEntradaValidation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    public Page<EventoEntrada> buscarPorDataEntrada(int pagina, int tamanho, LocalDate dataEntrada) {
        LocalDateTime dataInicial = LocalDateTime.of(dataEntrada, LocalTime.of(0, 0, 0));
        LocalDateTime dataFinal = LocalDateTime.of(dataEntrada, LocalTime.of(23, 59, 59));
        PageRequest pageRequest = PageRequest.of(pagina, tamanho, Sort.Direction.DESC, "dataEntrada");
        return repo.findByDataEntrada(pageRequest, dataInicial, dataFinal);
    }
}
