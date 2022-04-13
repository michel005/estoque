package com.michel.estoque.validation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import com.michel.estoque.entity.AbstractEntity;
import com.michel.estoque.exception.BusinessException;

public abstract class AbstractValidation <T extends AbstractEntity, R extends JpaRepository<T, Long>> {

    @Autowired
    protected R repo;
 
    public abstract void validaCadastro(T entidade) throws BusinessException;

    public abstract void validaAlteracao(T entidade) throws BusinessException;
 
    public abstract void validaExclusao(T entidade) throws BusinessException;

}