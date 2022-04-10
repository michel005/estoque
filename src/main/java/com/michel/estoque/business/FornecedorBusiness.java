package com.michel.estoque.business;

import com.michel.estoque.entity.Fornecedor;
import com.michel.estoque.model.FiltroFornecedorModel;
import com.michel.estoque.repository.FornecedorRepository;
import com.michel.estoque.validation.FornecedorValidation;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

@Component
public class FornecedorBusiness extends AbstractBusiness<Fornecedor, FornecedorRepository, FornecedorValidation> {

    public Object buscaPaginadaPorTermos(int pagina, int tamanho, FiltroFornecedorModel filtro) {
        PageRequest pageRequest = PageRequest.of(pagina, tamanho);
        return repo.findByTerms(pageRequest, filtro.getNome(), filtro.getCpfCnpj(), filtro.getTipoPessoa().toString());
    }
    
}