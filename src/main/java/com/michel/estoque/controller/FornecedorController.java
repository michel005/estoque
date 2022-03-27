package com.michel.estoque.controller;

import com.michel.estoque.entity.Fornecedor;
import com.michel.estoque.service.FornecedorService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fornecedor")
public class FornecedorController extends AbstractController<Fornecedor, FornecedorService> {
    
}
