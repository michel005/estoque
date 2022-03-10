package com.michel.estoque.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.michel.estoque.exception.BusinessException;

import lombok.Data;

@Data
public class ServiceResponse<T> {
    
    private T objeto;
    private BusinessException excecao;

    public static <T> ServiceResponse<T> builder(T objeto) {
        return new ServiceResponse<>(objeto);
    }

    public static <T> ServiceResponse<T> builder(BusinessException excecao) {
        return new ServiceResponse<>(excecao);
    }

    private ServiceResponse(T objeto) {
        this.objeto = objeto;
    }

    private ServiceResponse(BusinessException excecao) {
        this.excecao = excecao;
    }

    public ServiceResponse<T> exception(BusinessException excecao) {
        this.excecao = excecao;
        return this;
    }

    public ServiceResponse<T> objeto(T objeto) {
        this.objeto = objeto;
        return this;
    }
    
    public T getObjetoOrDefault(T def) {
    	return objeto == null ? def : objeto;
    }

	public static <X> ServiceResponse<X> callback(IRespostaServico<X> action) {
		try {
			return ServiceResponse.builder(action.accept());
		} catch(BusinessException ex) {
			return ServiceResponse.builder(ex);
		} catch(RuntimeException ex) {
			ex.printStackTrace();
			BusinessException e = new BusinessException();
			e.add("ERRO", ex.toString());
			return ServiceResponse.builder(e);
		}
	}
	
	public boolean temExcecao() {
		return this.excecao != null;
	}
	
	public ResponseEntity<Map<String, String>> badRequest() {
		return ResponseEntity.badRequest().body(this.excecao.getErros());
	}
	
	public interface IRespostaServico<X> {
		
		X accept();
		
	}

}