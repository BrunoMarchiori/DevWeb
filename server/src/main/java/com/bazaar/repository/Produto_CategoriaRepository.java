package com.bazaar.repository;

import com.bazaar.entity.Produto_Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Produto_CategoriaRepository extends JpaRepository<Produto_Categoria, Long> {
}
