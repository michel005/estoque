package com.michel.estoque.exception;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Properties;
import java.util.TreeMap;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
public class BusinessException extends RuntimeException {
    
	private static final long serialVersionUID = -8650618758199482778L;
	
	@Getter
    @Setter
    private Map<String, String> erros = new TreeMap<>();

    public void add(boolean condicao, String campo, String codigo, Object...params) {
        if (condicao) {
            add(campo, codigo, params);
        }
    }

    public void add(String campo, String codigo, Object...params) {
        Properties props = new Properties();
        try(InputStream input = BusinessException.class.getResourceAsStream("/error.properties")) {
            assert input != null;
            props.load(new InputStreamReader(input, StandardCharsets.UTF_8));
            erros.put(campo, String.format(props.getProperty(codigo, codigo), params));
        } catch(Exception ex) {
            erros.put(campo, ex.toString());
        }
    }

    public void invocarExcecao() throws RuntimeException {
        if (!erros.isEmpty()) {
            throw this;
        }
    }

    public static void invocarExcecao(boolean condicao, String campo, String codigo, Object...params) throws RuntimeException {
    	if (condicao) {
    		invocarExcecao(campo, codigo, params);
        }
    }

    public static void invocarExcecao(String campo, String codigo, Object...params) throws RuntimeException {
        BusinessException exception = new BusinessException();
        exception.add(campo, codigo, params);
        exception.invocarExcecao();
    }
    
}