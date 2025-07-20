package com.bazaar.DTO;

import com.bazaar.entity.Carrinho;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class CarrinhoDTO {
    
    private Long id;
    private Long usuarioId;
    private String nomeUsuario;
    private List<ItemCarrinhoDTO> itens;
    private BigDecimal valorTotal;
    private Integer quantidadeTotalItens;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataAtualizacao;
    private String status;

    public CarrinhoDTO(Carrinho carrinho) {
        this.id = carrinho.getId();
        this.usuarioId = carrinho.getUsuario().getId();
        this.nomeUsuario = carrinho.getUsuario().getNome();
        this.itens = carrinho.getItens().stream()
                .map(ItemCarrinhoDTO::new)
                .collect(Collectors.toList());
        this.valorTotal = carrinho.getValorTotal();
        this.quantidadeTotalItens = carrinho.getQuantidadeTotalItens();
        this.dataCriacao = carrinho.getDataCriacao();
        this.dataAtualizacao = carrinho.getDataAtualizacao();
        this.status = carrinho.getStatus().name();
    }
}
