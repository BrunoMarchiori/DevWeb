package com.bazaar.controller;

import com.bazaar.DTO.AdicionarItemCarrinhoDTO;
import com.bazaar.DTO.CarrinhoDTO;
import com.bazaar.service.CarrinhoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/carrinho")
@CrossOrigin(origins = "*")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    @PostMapping("/usuario/{usuarioId}/adicionar")
    public ResponseEntity<CarrinhoDTO> adicionarItem(
            @PathVariable Long usuarioId,
            @Valid @RequestBody AdicionarItemCarrinhoDTO dto) {
        
        CarrinhoDTO carrinhoDTO = carrinhoService.adicionarItem(usuarioId, dto);
        return ResponseEntity.ok(carrinhoDTO);
    }

    @DeleteMapping("/usuario/{usuarioId}/remover/{produtoId}")
    public ResponseEntity<CarrinhoDTO> removerItem(
            @PathVariable Long usuarioId,
            @PathVariable Long produtoId) {
        
        CarrinhoDTO carrinhoDTO = carrinhoService.removerItem(usuarioId, produtoId);
        return ResponseEntity.ok(carrinhoDTO);
    }

    @PutMapping("/usuario/{usuarioId}/atualizar/{produtoId}")
    public ResponseEntity<CarrinhoDTO> atualizarQuantidadeItem(
            @PathVariable Long usuarioId,
            @PathVariable Long produtoId,
            @RequestParam Integer quantidade) {
        
        CarrinhoDTO carrinhoDTO = carrinhoService.atualizarQuantidadeItem(usuarioId, produtoId, quantidade);
        return ResponseEntity.ok(carrinhoDTO);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<CarrinhoDTO> obterCarrinho(@PathVariable Long usuarioId) {
        CarrinhoDTO carrinhoDTO = carrinhoService.obterCarrinho(usuarioId);
        return ResponseEntity.ok(carrinhoDTO);
    }

    @DeleteMapping("/usuario/{usuarioId}/limpar")
    public ResponseEntity<CarrinhoDTO> limparCarrinho(@PathVariable Long usuarioId) {
        CarrinhoDTO carrinhoDTO = carrinhoService.limparCarrinho(usuarioId);
        return ResponseEntity.ok(carrinhoDTO);
    }

    @PostMapping("/usuario/{usuarioId}/fechar-compra")
    public ResponseEntity<Map<String, String>> fecharCompra(@PathVariable Long usuarioId) {
        String mensagem = carrinhoService.fecharCompra(usuarioId);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", mensagem);
        response.put("status", "success");
        
        return ResponseEntity.ok(response);
    }
}
