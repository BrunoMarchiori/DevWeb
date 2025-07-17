package com.bazaar.service;


import com.bazaar.DTO.FavoritoDTO;
import com.bazaar.entity.Produto;
import com.bazaar.entity.Usuario;
import com.bazaar.exception.EntidadeNaoEncontradaException;
import com.bazaar.repository.InteracaoRepository;
import com.bazaar.repository.ProdutoRepository;
import com.bazaar.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class FavoritoService {

    @Autowired
    private UsuarioRepository userRepository;

    @Autowired
    private ProdutoRepository productRepository;

    public void addFavorite(Long userId, Long productId) {
        Usuario user = userRepository.findById(userId).orElseThrow();
        Produto product = productRepository.findById(productId).orElseThrow();
        user.getFavoriteProducts().add(product);
        userRepository.save(user);
    }

    public void removeFavorite(Long userId, Long productId) {
        Usuario user = userRepository.findById(userId).orElseThrow();
        Produto product = productRepository.findById(productId).orElseThrow();
        user.getFavoriteProducts().remove(product);
        userRepository.save(user);
    }

    public Set<FavoritoDTO> getFavorites(Long userId) {
        Usuario user = userRepository.findById(userId).orElseThrow();

        return user.getFavoriteProducts()
                .stream()
                .map(FavoritoDTO::new)
                .collect(Collectors.toSet());


    }


}
