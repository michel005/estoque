package com.michel.estoque.service;

import com.michel.estoque.business.ItemBusiness;
import com.michel.estoque.entity.Item;
import com.michel.estoque.utils.CharUtils;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class ItemService extends AbstractService<Item, ItemBusiness> {

    @Override
    public void antesCadastrar(Item entidade) {
        entidade.setNome(CharUtils.deAccent(entidade.getNome().toUpperCase()));
    }

    @Override
    public void antesAlterar(Item entidade) {
        entidade.setNome(CharUtils.deAccent(entidade.getNome().toUpperCase()));
    }

    public ServiceResponse<Item> buscaPorNome(String nome) {
        return ServiceResponse.callback(() -> negocio.buscaPorNome(nome));
    }

    public ServiceResponse<Page<Item>> buscaPorTermoBusca(int pagina, int tamanho, String termo) {
        return ServiceResponse.callback(() -> negocio.buscaPorTermo(pagina, tamanho, termo));
    }

}