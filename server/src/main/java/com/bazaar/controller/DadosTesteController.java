package com.bazaar.controller;

import com.bazaar.entity.Empresa;
import com.bazaar.entity.Produto;
import com.bazaar.repository.EmpresaRepository;
import com.bazaar.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dados-teste")
@CrossOrigin(origins = "*")
public class DadosTesteController {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @PostMapping("/criar")
    public ResponseEntity<Map<String, String>> criarDadosTeste() {
        try {
            // Criar empresa se não existir
            Empresa empresa;
            List<Empresa> empresas = empresaRepository.findAll();
            if (empresas.isEmpty()) {
                empresa = new Empresa("Bazaar Store");
                empresa = empresaRepository.save(empresa);
            } else {
                empresa = empresas.get(0);
            }

            // Verificar se já existem produtos
            List<Produto> produtosExistentes = produtoRepository.findAll();
            if (!produtosExistentes.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Dados de teste já existem. Total de produtos: " + produtosExistentes.size());
                response.put("status", "info");
                return ResponseEntity.ok(response);
            }

            // Criar produtos de exemplo
            Produto produto1 = new Produto(
                "https://via.placeholder.com/300x200?text=Smartphone",
                "Smartphone Samsung Galaxy",
                "smartphone-samsung-galaxy",
                "Smartphone com tela de 6.1 polegadas, câmera de 64MP e 128GB de armazenamento",
                true,
                10,
                new BigDecimal("899.99"),
                LocalDate.now()
            );
            produto1.setEmpresa(empresa);

            Produto produto2 = new Produto(
                "https://via.placeholder.com/300x200?text=Notebook",
                "Notebook Dell Inspiron",
                "notebook-dell-inspiron",
                "Notebook com processador Intel i5, 8GB RAM e SSD de 256GB",
                true,
                5,
                new BigDecimal("2499.99"),
                LocalDate.now()
            );
            produto2.setEmpresa(empresa);

            Produto produto3 = new Produto(
                "https://via.placeholder.com/300x200?text=Headphone",
                "Headphone Bluetooth JBL",
                "headphone-bluetooth-jbl",
                "Headphone sem fio com cancelamento de ruído e bateria de 30 horas",
                true,
                15,
                new BigDecimal("299.99"),
                LocalDate.now()
            );
            produto3.setEmpresa(empresa);

            Produto produto4 = new Produto(
                "https://via.placeholder.com/300x200?text=Smart+TV",
                "Smart TV Samsung 55\"",
                "smart-tv-samsung-55",
                "Smart TV 4K com HDR, sistema Tizen e controle por voz",
                true,
                3,
                new BigDecimal("1899.99"),
                LocalDate.now()
            );
            produto4.setEmpresa(empresa);

            Produto produto5 = new Produto(
                "https://via.placeholder.com/300x200?text=Mouse",
                "Mouse Gamer Logitech",
                "mouse-gamer-logitech",
                "Mouse gamer com sensor óptico de alta precisão e RGB",
                true,
                20,
                new BigDecimal("149.99"),
                LocalDate.now()
            );
            produto5.setEmpresa(empresa);

            // Salvar produtos
            produtoRepository.save(produto1);
            produtoRepository.save(produto2);
            produtoRepository.save(produto3);
            produtoRepository.save(produto4);
            produtoRepository.save(produto5);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Dados de teste criados com sucesso! 5 produtos adicionados.");
            response.put("status", "success");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Erro ao criar dados de teste: " + e.getMessage());
            response.put("status", "error");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/produtos")
    public ResponseEntity<List<Produto>> listarProdutos() {
        List<Produto> produtos = produtoRepository.findAll();
        return ResponseEntity.ok(produtos);
    }

    @DeleteMapping("/limpar")
    public ResponseEntity<Map<String, String>> limparDados() {
        try {
            produtoRepository.deleteAll();
            empresaRepository.deleteAll();

            Map<String, String> response = new HashMap<>();
            response.put("message", "Dados de teste removidos com sucesso!");
            response.put("status", "success");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Erro ao limpar dados: " + e.getMessage());
            response.put("status", "error");
            return ResponseEntity.badRequest().body(response);
        }
    }
}
