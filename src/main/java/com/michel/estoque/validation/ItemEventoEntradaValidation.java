package com.michel.estoque.validation;

import com.michel.estoque.entity.ItemEventoEntrada;
import com.michel.estoque.exception.BusinessException;
import com.michel.estoque.repository.ItemEventoEntradaRepository;

import org.springframework.stereotype.Component;

@Component
public class ItemEventoEntradaValidation extends AbstractValidation<ItemEventoEntrada, ItemEventoEntradaRepository> {

    @Override
    public void validaCadastro(ItemEventoEntrada item) throws BusinessException {
        BusinessException exception = new BusinessException();



        exception.invocarExcecao();
    }

    @Override
    public void validaAlteracao(ItemEventoEntrada item) throws BusinessException {
        BusinessException exception = new BusinessException();



        exception.invocarExcecao();
    }

    @Override
    public void validaExclusao(ItemEventoEntrada item) throws BusinessException {

    }

}
