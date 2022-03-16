package com.michel.estoque.repository;

import java.time.LocalDate;

import com.michel.estoque.entity.EventoEntrada;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoEntradaRepository extends JpaRepository<EventoEntrada, Long> {

    @Query(value = "select x from EventoEntrada x where day(dataEntrada) = day(:dataEntrada) and month(dataEntrada) = month(:dataEntrada) and year(dataEntrada) = year(:dataEntrada)")
    Page<EventoEntrada> findByDataEntrada(Pageable pageable, LocalDate dataEntrada);

}