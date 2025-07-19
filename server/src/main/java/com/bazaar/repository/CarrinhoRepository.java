package com.bazaar.repository;

import com.bazaar.entity.Carrinho;
import com.bazaar.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
    
    @Query("SELECT c FROM Carrinho c WHERE c.usuario = :usuario AND c.status = 'ATIVO'")
    Optional<Carrinho> findByUsuarioAndStatusAtivo(@Param("usuario") Usuario usuario);
    
    Optional<Carrinho> findByUsuarioAndStatus(Usuario usuario, Carrinho.StatusCarrinho status);
    
    boolean existsByUsuarioAndStatus(Usuario usuario, Carrinho.StatusCarrinho status);
}
