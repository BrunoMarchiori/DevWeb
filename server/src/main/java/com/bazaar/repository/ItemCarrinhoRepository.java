package com.bazaar.repository;

import com.bazaar.entity.Carrinho;
import com.bazaar.entity.ItemCarrinho;
import com.bazaar.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemCarrinhoRepository extends JpaRepository<ItemCarrinho, Long> {
    
    Optional<ItemCarrinho> findByCarrinhoAndProduto(Carrinho carrinho, Produto produto);
    
    void deleteByCarrinhoAndProduto(Carrinho carrinho, Produto produto);
}
