package com.bazaar.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AdicionarItemCarrinhoDTO {
    
    @NotNull(message = "O ID do produto deve ser informado.")
    private Long produtoId;
    
    @NotNull(message = "A quantidade deve ser informada.")
    @Min(value = 1, message = "A quantidade deve ser maior que 0.")
    private Integer quantidade;

    public AdicionarItemCarrinhoDTO(Long produtoId, Integer quantidade) {
        this.produtoId = produtoId;
        this.quantidade = quantidade;
    }
}
