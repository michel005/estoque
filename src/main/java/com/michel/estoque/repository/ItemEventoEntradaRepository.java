package com.michel.estoque.repository;

import com.michel.estoque.entity.EventoEntrada;
import com.michel.estoque.entity.Item;
import com.michel.estoque.entity.ItemEventoEntrada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemEventoEntradaRepository extends JpaRepository<ItemEventoEntrada, Long> {

    List<ItemEventoEntrada> findByEventoEntrada(EventoEntrada eventoEntrada);

    @Query(value = "select sum(quantidade) from ItemEventoEntrada x where x.item = :item")
    Integer sumQuantidadeByItem(Item item);

    @Query(value = "select x from ItemEventoEntrada x where x.eventoEntrada = :eventoEntrada and x.item = :item")
    Optional<ItemEventoEntrada> findByEventoEntradaItem(EventoEntrada eventoEntrada, Item item);

}
