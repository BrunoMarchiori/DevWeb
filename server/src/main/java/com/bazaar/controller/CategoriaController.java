package com.bazaar.controller;

import com.bazaar.entity.Categoria;
import com.bazaar.repository.CategoriaRepository;
import com.bazaar.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping
    public List<Map<String, Object>> listarCategoriasComProdutos() {
        List<Categoria> categorias = categoriaRepository.findAll();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (Categoria categoria : categorias) {
            Map<String, Object> categoriaData = new HashMap<>();
            categoriaData.put("id", categoria.getId());
            categoriaData.put("nome", categoria.getNome());
            
            // Buscar produtos da categoria ordenados por interação
            List<Object[]> produtosArray = produtoRepository.findProdutosPorCategoriaOrderByInteracao(categoria.getId(), PageRequest.of(0, 10));
            
            List<Map<String, Object>> produtosData = produtosArray.stream().map(produtoArray -> {
                Map<String, Object> produtoData = new HashMap<>();
                produtoData.put("id", produtoArray[0]);
                produtoData.put("nome", produtoArray[1]);
                produtoData.put("preco", produtoArray[2]);
                produtoData.put("imagem", produtoArray[3]);
                produtoData.put("categoria", categoria.getNome()); // Categoria atual
                return produtoData;
            }).collect(Collectors.toList());
            
            categoriaData.put("produtos", produtosData);
            resultado.add(categoriaData);
        }

        return resultado;
    }
}
