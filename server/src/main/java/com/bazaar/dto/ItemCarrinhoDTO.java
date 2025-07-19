package com.bazaar.dto;

import com.bazaar.entity.ItemCarrinho;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class ItemCarrinhoDTO {
    
    private Long id;
    private Long produtoId;
    private String nomeProduto;
    private String imagemProduto;
    private BigDecimal precoUnitario;
    private Integer quantidade;
    private BigDecimal subtotal;
    private boolean produtoDisponivel;

    public ItemCarrinhoDTO(ItemCarrinho item) {
        this.id = item.getId();
        this.produtoId = item.getProduto().getId();
        this.nomeProduto = item.getProduto().getNome();
        this.imagemProduto = item.getProduto().getImagem();
        this.precoUnitario = item.getPrecoUnitario();
        this.quantidade = item.getQuantidade();
        this.subtotal = item.getSubtotal();
        this.produtoDisponivel = item.getProduto().isDisponivel();
    }
}
