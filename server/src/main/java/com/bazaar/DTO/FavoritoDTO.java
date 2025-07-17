package com.bazaar.DTO;

import com.bazaar.entity.Produto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class FavoritoDTO {

    private Long id;
    private String imagem;
    private String nome;
    private String slug;
    private BigDecimal preco;

    public FavoritoDTO(Produto produto) {
        this.id = produto.getId();
        this.imagem = produto.getImagem();
        this.nome = produto.getNome();
        this.slug = produto.getSlug();
        this.preco = produto.getPreco();
    }

}
