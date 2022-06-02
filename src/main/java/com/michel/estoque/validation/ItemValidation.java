package com.michel.estoque.validation;

import java.util.List;
import java.util.Objects;

import com.michel.estoque.entity.Item;
import com.michel.estoque.exception.BusinessException;
import com.michel.estoque.repository.ItemRepository;

import org.springframework.stereotype.Component;

@Component
public class ItemValidation extends AbstractValidation<Item, ItemRepository> {

    @Override
    public void validaCadastro(Item item) throws BusinessException {
        BusinessException exception = new BusinessException();

        exception.add(item.getNome() == null || item.getNome().isBlank(), "NOME", "ITEM-001");

        List<Item> opt = repo.findByNome(item.getNome());
        exception.add(!opt.isEmpty(), "NOME", "ITEM-003", item.getNome());

        exception.invocarExcecao();
    }

    @Override
    public void validaAlteracao(Item item) throws BusinessException {
        BusinessException exception = new BusinessException();

        exception.add(item.getNome().isBlank(), "NOME", "ITEM-002");

        List<Item> opt = repo.findByNome(item.getNome());
        System.out.println(opt.get(0).getId().intValue());
        System.out.println(item.getId().intValue());
        exception.add(opt.size() >= 1 && opt.get(0).getId().intValue() != item.getId().intValue(), "NOME", "ITEM-003", item.getNome());

        exception.invocarExcecao();
    }

    @Override
    public void validaExclusao(Item item) throws BusinessException {

    }

}