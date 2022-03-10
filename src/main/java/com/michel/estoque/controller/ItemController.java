package com.michel.estoque.controller;

import com.michel.estoque.entity.Item;
import com.michel.estoque.service.ItemService;
import com.michel.estoque.service.ServiceResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/item")
public class ItemController extends AbstractController<Item, ItemService> {

    @GetMapping("/buscaPorNome")
    public ResponseEntity<?> buscaPorNome(@RequestParam("nome") String nome) {
        ServiceResponse<Item> originalResposta = servico.buscaPorNome(nome);

        if (originalResposta.temExcecao()) {
            return ResponseEntity.badRequest().body(originalResposta.getExcecao().getErros());
        }
        return ResponseEntity.ok().body(originalResposta.getObjeto());
    }

    @GetMapping("/buscaPorTermo")
    public ResponseEntity<?> buscaPorTermo(@RequestParam("pagina") int pagina, @RequestParam("tamanho") int tamanho, @RequestParam("termo") String termo) {
        ServiceResponse<?> originalResposta = servico.buscaPorTermoBusca(pagina, tamanho, termo);

        if (originalResposta.temExcecao()) {
            return ResponseEntity.badRequest().body(originalResposta.getExcecao().getErros());
        }
        return ResponseEntity.ok().body(originalResposta.getObjeto());
    }

}