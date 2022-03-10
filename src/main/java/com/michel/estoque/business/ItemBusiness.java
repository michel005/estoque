package com.michel.estoque.business;

import com.michel.estoque.entity.Item;
import com.michel.estoque.repository.ItemRepository;
import com.michel.estoque.validation.ItemValidation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class ItemBusiness extends AbstractBusiness<Item, ItemRepository, ItemValidation> {

    public Item buscaPorNome(String nome) {
        return repo.findByNome(nome).get(0);
    }

    public Page<Item> buscaPorTermo(int pagina, int tamanho, String termoBusca) {
        PageRequest pageRequest = PageRequest.of(pagina, tamanho, Sort.Direction.ASC, "nome");
        return repo.findByTermoBusca(pageRequest, termoBusca);
    }

}