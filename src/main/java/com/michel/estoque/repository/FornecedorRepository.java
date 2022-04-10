package com.michel.estoque.repository;

import com.michel.estoque.entity.Fornecedor;
import com.michel.estoque.entity.TipoPessoa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {

    @Query("select x from Fornecedor x where ( :nome = '' or nome like '%' || :nome || '%' ) and ( :cpfCnpj = '' or cpfCnpj like '%' || :cpfCnpj || '%' ) and ( :tipoPessoa = '' or tipoPessoa = :tipoPessoa )")
    Page<Fornecedor> findByTerms(Pageable pageable, String nome, String cpfCnpj, String tipoPessoa);
    
}
