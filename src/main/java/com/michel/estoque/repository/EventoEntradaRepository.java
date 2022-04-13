package com.michel.estoque.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.michel.estoque.entity.EventoEntrada;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoEntradaRepository extends JpaRepository<EventoEntrada, Long> {

    @Query(value = "select x from EventoEntrada x where dataEntrada between :dataInicial and :dataFinal")
    Page<EventoEntrada> findByDataEntrada(Pageable pageable, LocalDateTime dataInicial, LocalDateTime dataFinal);

}