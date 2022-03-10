package com.michel.estoque.controller;

import com.michel.estoque.entity.EventoEntrada;
import com.michel.estoque.model.EventoEntradaAnaliticoModel;
import com.michel.estoque.model.EventoEntradaModel;
import com.michel.estoque.service.EventoEntradaService;
import com.michel.estoque.service.ServiceResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/evento/entrada")
public class EventoEntradaController extends AbstractController<EventoEntrada, EventoEntradaService> {

    @PostMapping("/cadastrarModelo")
    public ResponseEntity<?> cadastrar(@RequestBody EventoEntradaAnaliticoModel model) {
        ServiceResponse<?> response = servico.cadastrar(model);

        if (response.temExcecao()) {
            return ResponseEntity.badRequest().body(response.getExcecao().getErros());
        }

        return visualizarAnalitico(((EventoEntrada)response.getObjeto()).getId());
    }

    @GetMapping("/visualizar")
    public ResponseEntity<?> visualizar(@RequestParam("id") Long id) {
        ServiceResponse<EventoEntradaModel> originalResposta = servico.visualizar(id);

        if (originalResposta.temExcecao()) {
            return ResponseEntity.badRequest().body(originalResposta.getExcecao().getErros());
        }
        return ResponseEntity.ok().body(originalResposta.getObjeto());
    }

    @GetMapping("/visualizarAnalitico")
    public ResponseEntity<?> visualizarAnalitico(@RequestParam("id") Long id) {
        ServiceResponse<EventoEntradaAnaliticoModel> originalResposta = servico.visualizarAnalitico(id);

        if (originalResposta.temExcecao()) {
            return ResponseEntity.badRequest().body(originalResposta.getExcecao().getErros());
        }
        return ResponseEntity.ok().body(originalResposta.getObjeto());
    }

}