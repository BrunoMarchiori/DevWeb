package com.bazaar.repository;

import com.bazaar.entity.Interacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InteracaoRepository extends JpaRepository<Interacao, Long> {
    Optional<Interacao> findByProdutoId(Long produtoId);
}
