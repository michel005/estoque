package com.michel.estoque.validation;

import com.michel.estoque.entity.EventoEntrada;
import com.michel.estoque.exception.BusinessException;
import com.michel.estoque.repository.EventoEntradaRepository;

import org.springframework.stereotype.Component;

@Component
public class EventoEntradaValidation extends AbstractValidation<EventoEntrada, EventoEntradaRepository> {

    @Override
    public void validaCadastro(EventoEntrada evento) throws BusinessException {
        BusinessException exception = new BusinessException();

        exception.add(evento.getDescricao() == null || evento.getDescricao().isBlank(), "DESCRICAO", "EVENTO-ENTRADA-001");

        exception.add(evento.getStatus() == null, "STATUS", "EVENTO-ENTRADA-003");

        exception.add(evento.getFornecedor() == null, "FORNECEDOR", "EVENTO-ENTRADA-004");

        exception.invocarExcecao();
    }

    @Override
    public void validaAlteracao(EventoEntrada evento) throws BusinessException {
        BusinessException exception = new BusinessException();

        exception.add(evento.getDescricao().isBlank(), "DESCRICAO", "EVENTO-ENTRADA-002");

        exception.add(evento.getStatus() == null, "STATUS", "EVENTO-ENTRADA-003");

        exception.add(evento.getFornecedor() == null, "FORNECEDOR", "EVENTO-ENTRADA-004");

        exception.invocarExcecao();
    }

    @Override
    public void validaExclusao(EventoEntrada entidade) throws BusinessException {

    }

}
