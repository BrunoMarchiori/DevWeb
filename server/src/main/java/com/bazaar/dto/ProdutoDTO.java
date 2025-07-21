package com.bazaar.dto;

import com.bazaar.entity.ItemCarrinho;
import com.bazaar.entity.Produto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class ProdutoDTO {

    private Long id;
    private String nome;
    private String descricao;
    private boolean disponivel;
    private Integer qtdEstoque;
    private BigDecimal preco;




    public ProdutoDTO(Produto produto) {
        this.id = produto.getId();
        this.nome = produto.getNome();
        this.descricao = produto.getDescricao();
        this.disponivel = produto.isDisponivel();
        this.qtdEstoque = produto.getQtdEstoque();
        this.preco = produto.getPreco();

    }
}
