package com.michel.estoque.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.michel.estoque.entity.EventoEntrada;
import com.michel.estoque.entity.StatusEventoEntrada;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoEntradaRepository extends JpaRepository<EventoEntrada, Long> {

    @Query(value = "select x from EventoEntrada x where (:dataInicial is null or dataEntrada between :dataInicial and :dataFinal) and (:descricao is null or descricao like '%' || :descricao || '%') and (:status is null or status = :status)")
    Page<EventoEntrada> findByDataEntrada(Pageable pageable, LocalDateTime dataInicial, LocalDateTime dataFinal, String descricao, StatusEventoEntrada status);

}