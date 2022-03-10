package com.michel.estoque.controller;

import com.michel.estoque.entity.ItemEventoEntrada;
import com.michel.estoque.service.ItemEventoEntradaService;
import com.michel.estoque.service.ServiceResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/evento/entrada/item")
public class ItemEventoEntradaController extends AbstractController<ItemEventoEntrada, ItemEventoEntradaService> {
    
    @GetMapping("/quantidadeTotalPorItem")
    public ResponseEntity<?> quantidadeTotalPorItem(@RequestParam("id") Long idItem) {
    	ServiceResponse<Integer> resposta = servico.quantidadeTotalPorItem(idItem);
        if (resposta.temExcecao()) {
            return ResponseEntity.badRequest().body(resposta.getExcecao().getErros());
        }
        return ResponseEntity.ok().body(resposta.getObjeto());
    }

}