package com.michel.estoque.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import com.michel.estoque.business.AbstractBusiness;
import com.michel.estoque.entity.AbstractEntity;

public abstract class AbstractService <T extends AbstractEntity, N extends AbstractBusiness<T, ?, ?>> {

    @Autowired
    protected N negocio;

    public abstract void antesCadastrar(T entidade);
    public abstract void antesAlterar(T entidade);

    public ServiceResponse<T> cadastrar(T entidade) {
    	return ServiceResponse.callback(() -> {
            antesCadastrar(entidade);
            return negocio.cadastrar(entidade);
        });
    }

    public ServiceResponse<T> alterar(T entidade) {
    	return ServiceResponse.callback(() -> {
            antesAlterar(entidade);
            return negocio.alterar(entidade);
        });
    }

    public ServiceResponse<?> excluir(T entidade) {
    	return ServiceResponse.callback(() -> {
    		negocio.excluir(entidade);
    		return null;
    	});
    }

    public ServiceResponse<T> buscaPorId(Long id) {
    	return ServiceResponse.callback(() -> negocio.buscaPorId(id));
    }

    public ServiceResponse<List<T>> buscaTodos() {
        return ServiceResponse.callback(() -> negocio.buscaTodos());
    }

    public ServiceResponse<Page<T>> buscaPaginada(int pagina, int tamanho) {
        return ServiceResponse.callback(() -> negocio.buscaPaginada(pagina, tamanho));
    }

}