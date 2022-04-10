package com.michel.estoque.repository;

import com.michel.estoque.entity.Item;
import com.michel.estoque.model.QuantidadeItemModel;

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

    @Query("select new com.michel.estoque.model.QuantidadeItemModel( x, coalesce(sum(i.quantidade), 0) ) from ItemEventoEntrada i right join i.item x where i.item.nome like '%' || :nome || '%' and ( :categoria = '' or i.item.categoria = :categoria ) group by x")
    Page<QuantidadeItemModel> findAllComQuantidade(Pageable pageable, String nome, String categoria);

    @Query("select categoria from Item group by categoria order by categoria")
    List<String> findCategorias();
}