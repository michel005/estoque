package com.michel.estoque.service;

import com.michel.estoque.business.ItemBusiness;
import com.michel.estoque.entity.Item;
import com.michel.estoque.model.FiltroItemModel;
import com.michel.estoque.model.QuantidadeItemModel;
import com.michel.estoque.utils.CharUtils;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class ItemService extends AbstractService<Item, ItemBusiness> {

    @Override
    public void antesCadastrar(Item entidade) {
        if (entidade.getNome() != null) {
            entidade.setNome(CharUtils.deAccent(entidade.getNome().toUpperCase()));
        }
        if (entidade.getCategoria() != null) {
            entidade.setCategoria(CharUtils.deAccent(entidade.getCategoria().toUpperCase()));
        }
    }

    @Override
    public void antesAlterar(Item entidade) {
        if (entidade.getNome() != null) {
            entidade.setNome(CharUtils.deAccent(entidade.getNome().toUpperCase()));
        }
        if (entidade.getCategoria() != null) {
            entidade.setCategoria(CharUtils.deAccent(entidade.getCategoria().toUpperCase()));
        }
    }

    public ServiceResponse<Item> buscaPorNome(String nome) {
        return ServiceResponse.callback(() -> negocio.buscaPorNome(nome));
    }

    public ServiceResponse<Page<Item>> buscaPorTermoBusca(int pagina, int tamanho, String termo) {
        return ServiceResponse.callback(() -> negocio.buscaPorTermo(pagina, tamanho, termo));
    }

    public ServiceResponse<Page<QuantidadeItemModel>> buscaTudoComQuantidade(int pagina, int tamanho, FiltroItemModel filtro) {
        return ServiceResponse.callback(() -> negocio.buscaTudoComQuantidade(pagina, tamanho, filtro));
    }

    public ServiceResponse<?> buscaCategorias() {
        return ServiceResponse.callback(() -> negocio.buscaCategorias());
    }

}