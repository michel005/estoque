package com.michel.estoque.business;

import com.michel.estoque.entity.Fornecedor;
import com.michel.estoque.repository.FornecedorRepository;
import com.michel.estoque.validation.FornecedorValidation;

import org.springframework.stereotype.Component;

@Component
public class FornecedorBusiness extends AbstractBusiness<Fornecedor, FornecedorRepository, FornecedorValidation> {
    
}