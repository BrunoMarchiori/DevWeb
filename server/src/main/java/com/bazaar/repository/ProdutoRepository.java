package com.bazaar.repository;

import com.bazaar.entity.Produto;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Produto p where p.id = :id")
    Optional<Produto> recuperarProdutoPorIdComLock(@Param("id") Long id);
    
    Optional<Produto> findByImagem(String imagem);

    @Query("select p from Produto p order by p.id")
    List<Produto> recuperarProdutosComCategoria();

    @NonNull
    Optional<Produto> findById(@NonNull Long id);

    @Query(
            value = "select p " +
                    "from Produto p " +
                    "where p.nome like :nome " +
                    "order by p.id",
            countQuery = "select count(p) from Produto p where p.nome like :nome"
    )
    Page<Produto> recuperarProdutosComPaginacao(Pageable pageable, @Param("nome") String nome);

    @Query("SELECT p.id, p.nome, p.preco, p.imagem FROM Produto p " +
           "JOIN p.categorias c " +
           "LEFT JOIN Interacao i ON p.id = i.produto.id " +
           "WHERE c.id = :categoriaId " +
           "ORDER BY COALESCE(i.visualizacoes, 0) DESC")
    List<Object[]> findProdutosPorCategoriaOrderByInteracao(@Param("categoriaId") Long categoriaId, Pageable pageable);

    /*@Query("select p from Produto p " +
            "left outer join fetch p.categoria c " +
            "where c.slug = :slugCategoria " +
            "order by p.id")
    List<Produto> recuperarProdutosPorSlugCategoria(@Param("slugCategoria") String slugCategoria);*/
}
