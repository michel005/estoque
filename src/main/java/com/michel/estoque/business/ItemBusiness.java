package com.michel.estoque.business;

import java.util.List;

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
        List<Item> item = repo.findByNome(nome);
        if (item.isEmpty()) {
            return null;
        } else {
            return item.get(0);
        }
    }

    public Page<Item> buscaPorTermo(int pagina, int tamanho, String termoBusca) {
        PageRequest pageRequest = PageRequest.of(pagina, tamanho, Sort.Direction.ASC, "nome");
        return repo.findByTermoBusca(pageRequest, termoBusca);
    }

}