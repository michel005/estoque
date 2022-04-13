package com.michel.estoque.controller;

import com.michel.estoque.entity.AbstractEntity;
import com.michel.estoque.service.AbstractService;
import com.michel.estoque.service.ServiceResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class AbstractController <T extends AbstractEntity, X extends AbstractService<T, ?>> {

    @Autowired
    protected X servico;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody T entidade) {
        System.out.println(entidade);
        ServiceResponse<T> resposta = servico.cadastrar(entidade);
        if (resposta.getExcecao() != null) {
            return ResponseEntity.badRequest().body(resposta.getExcecao().getErros());
        }
        return ResponseEntity.ok().body(resposta.getObjeto());
    }

    @PostMapping("/cadastrarTodos")
    public ResponseEntity<Map<Object, Map<String, String>>> cadastrarTodos(@RequestBody List<T> entidades) {
        Map<Object, Map<String, String>> erros = new TreeMap<>();
        for (T entidade : entidades) {
            ServiceResponse<T> resposta = servico.cadastrar(entidade);
            if (resposta.temExcecao()) {
                erros.put(entidades.indexOf(entidade), resposta.getExcecao().getErros());
            }
        }

        if (!erros.isEmpty()) {
            return ResponseEntity.badRequest().body(erros);
        }
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/alterar")
    public ResponseEntity<Map<String, String>> alterar(@RequestParam("id") Long id, @RequestBody T entidade) {
    	ServiceResponse<T> originalResposta = servico.buscaPorId(id);
        if (originalResposta.temExcecao()) {
            return ResponseEntity.badRequest().body(originalResposta.getExcecao().getErros());
        }
        T original = originalResposta.getObjeto();
        original.merge(entidade);

        ServiceResponse<T> resposta = servico.alterar(original);
        if (resposta.temExcecao()) {
            return ResponseEntity.badRequest().body(resposta.getExcecao().getErros());
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/excluir")
    public ResponseEntity<Map<String, String>> excluir(@RequestParam("id") Long id) {
        ServiceResponse<T> originalResposta = servico.buscaPorId(id);
        if (originalResposta.temExcecao()) {
            return ResponseEntity.badRequest().body(originalResposta.getExcecao().getErros());
        }

        ServiceResponse<?> resposta = servico.excluir(originalResposta.getObjeto());
        if (resposta.temExcecao()) {
            return ResponseEntity.badRequest().body(resposta.getExcecao().getErros());
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/excluirTodos")
    public ResponseEntity<Map<Object, Map<String, String>>> excluir(@RequestBody List<Long> ids) {
        Map<Object, Map<String, String>> erros = new TreeMap<>();
        for (Long id : ids) {
            ServiceResponse<T> originalResposta = servico.buscaPorId(id);
            if (originalResposta.temExcecao()) {
                erros.put(id, originalResposta.getExcecao().getErros());
            } else {
                ServiceResponse<?> resposta = servico.excluir(originalResposta.getObjeto());
                if (resposta.temExcecao()) {
                    erros.put(originalResposta.getObjeto(), resposta.getExcecao().getErros());
                }
            }
        }

        if (!erros.isEmpty()) {
            return ResponseEntity.badRequest().body(erros);
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/buscarPorId")
    public ResponseEntity<?> buscarPorId(@RequestParam("id") Long id) {
        ServiceResponse<T> originalResposta = servico.buscaPorId(id);

        if (originalResposta.temExcecao()) {
            return ResponseEntity.badRequest().body(originalResposta.getExcecao().getErros());
        }
        return ResponseEntity.ok().body(originalResposta.getObjeto());
    }

    @GetMapping("/buscarTodos")
    public ResponseEntity<?> buscarTodos() {
        ServiceResponse<?> originalResposta = servico.buscaTodos();

        if (originalResposta.temExcecao()) {
            return ResponseEntity.badRequest().body(originalResposta.getExcecao().getErros());
        }
        return ResponseEntity.ok().body(originalResposta.getObjeto());
    }

    @GetMapping("/buscaPaginada")
    public ResponseEntity<?> buscaPaginada(@RequestParam("pagina") int pagina, @RequestParam("tamanho") int tamanho) {
        ServiceResponse<?> originalResposta = servico.buscaPaginada(pagina, tamanho);

        if (originalResposta.temExcecao()) {
            return ResponseEntity.badRequest().body(originalResposta.getExcecao().getErros());
        }
        return ResponseEntity.ok().body(originalResposta.getObjeto());
    }

}