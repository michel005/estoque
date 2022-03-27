package com.michel.estoque.validation;

import com.michel.estoque.entity.Fornecedor;
import com.michel.estoque.exception.BusinessException;
import com.michel.estoque.repository.FornecedorRepository;

import org.springframework.stereotype.Component;

@Component
public class FornecedorValidation extends AbstractValidation<Fornecedor, FornecedorRepository> {

    @Override
    public void validaCadastro(Fornecedor entidade) throws BusinessException {
        BusinessException exception = new BusinessException();

        exception.add(entidade.getNome() == null || entidade.getNome().trim().isEmpty(), "NOME", "FORNECEDOR-001");

        exception.add(entidade.getTipoPessoa() == null, "TIPO_PESSOA", "FORNECEDOR-002");

        exception.add(entidade.getCpfCnpj() == null || entidade.getCpfCnpj().trim().isEmpty(), "CPF_CNPJ", "FORNECEDOR-003");

        exception.invocarExcecao();
    }

    @Override
    public void validaAlteracao(Fornecedor entidade) throws BusinessException {
        validaCadastro(entidade);
    }

    @Override
    public void validaExclusao(Fornecedor entidade) throws BusinessException {

    }
    
}
