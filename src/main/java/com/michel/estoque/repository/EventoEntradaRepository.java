package com.michel.estoque.repository;

import com.michel.estoque.entity.EventoEntrada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoEntradaRepository extends JpaRepository<EventoEntrada, Long> {
}