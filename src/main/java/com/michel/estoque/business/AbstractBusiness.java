package com.michel.estoque.business;

import java.util.List;
import java.util.Optional;

import com.michel.estoque.entity.AbstractEntity;
import com.michel.estoque.exception.BusinessException;
import com.michel.estoque.validation.AbstractValidation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public abstract class AbstractBusiness<T extends AbstractEntity, R extends JpaRepository<T, Long>, V extends AbstractValidation<T, R>> {

    @Autowired
    protected R repo;

    @Autowired
    protected V validador;

    public T cadastrar(T entidade) {
        validador.validaCadastro(entidade);
        return repo.save(entidade);
    }

    @Transactional
    public T alterar(T entidade) {
        validador.validaAlteracao(entidade);
        return repo.save(entidade);
    }

    public void excluir(T entidade) {
        buscaPorId(entidade.getId());
        validador.validaExclusao(entidade);
        repo.delete(entidade);
    }

    public T buscaPorId(Long id) {
        Optional<T> opt = repo.findById(id);
        if (opt.isPresent()) {
            return opt.get();
        }
        BusinessException.invocarExcecao("ERRO", "PADRAO-001", id);
        return null;
    }

    public Page<T> buscaPaginada(int pagina, int tamanho) {
        PageRequest pageRequest = PageRequest.of(pagina, tamanho);
        return repo.findAll(pageRequest);
    }

    public List<T> buscaTodos() {
    	return repo.findAll();
    }


}