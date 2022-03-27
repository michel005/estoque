package com.michel.estoque.service;

import com.michel.estoque.business.FornecedorBusiness;
import com.michel.estoque.entity.Fornecedor;

import org.springframework.stereotype.Service;

@Service
public class FornecedorService extends AbstractService<Fornecedor, FornecedorBusiness> {

    @Override
    public void antesCadastrar(Fornecedor entidade) {

    }

    @Override
    public void antesAlterar(Fornecedor entidade) {
        
    }
    
}
