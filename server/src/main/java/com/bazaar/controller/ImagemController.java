package com.bazaar.controller;

import com.bazaar.entity.Produto;
import com.bazaar.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/imagens")
@CrossOrigin(origins = "*")
public class ImagemController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping("/{produtoId}")
    @Transactional(readOnly = true)
    public ResponseEntity<byte[]> getImagem(@PathVariable Long produtoId) {
        try {
            Optional<Produto> produtoOpt = produtoRepository.findById(produtoId);
            
            if (produtoOpt.isPresent() && produtoOpt.get().getImagemBlob() != null) {
                byte[] imagemBytes = produtoOpt.get().getImagemBlob();
                
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_PNG);
                headers.setContentLength(imagemBytes.length);
                headers.setCacheControl("public, max-age=31536000"); // Cache por 1 ano
                
                return new ResponseEntity<>(imagemBytes, headers, HttpStatus.OK);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
