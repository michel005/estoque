package com.michel.estoque.repository;

import com.michel.estoque.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByNome(String nome);

    @Query("select x from Item x where nome like '%' || :termo || '%' or categoria like '%' || :termo || '%'")
    Page<Item> findByTermoBusca(Pageable pageable, String termo);
}