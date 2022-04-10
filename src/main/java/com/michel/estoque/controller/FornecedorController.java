package com.michel.estoque.controller;

import com.michel.estoque.entity.Fornecedor;
import com.michel.estoque.model.FiltroFornecedorModel;
import com.michel.estoque.service.FornecedorService;
import com.michel.estoque.service.ServiceResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fornecedor")
public class FornecedorController extends AbstractController<Fornecedor, FornecedorService> {

    @PostMapping("/buscaPaginadaPorTermos")
    public ResponseEntity<?> buscaPaginadaPorTermos(@RequestParam("pagina") int pagina, @RequestParam("tamanho") int tamanho, @RequestBody FiltroFornecedorModel filtro) {
        ServiceResponse<?> originalResposta = servico.buscaPaginadaPorTermos(pagina, tamanho, filtro);

        if (originalResposta.temExcecao()) {
            return ResponseEntity.badRequest().body(originalResposta.getExcecao().getErros());
        }
        return ResponseEntity.ok().body(originalResposta.getObjeto());
    }
    
}