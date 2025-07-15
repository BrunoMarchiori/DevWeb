package com.bazaar.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "A 'Imagem' deve ser informada.")
    private String imagem;

    @NotEmpty(message = "O 'Nome' deve ser informado.")
    private String nome;

    private String slug;

    @NotEmpty(message = "A 'Descrição' deve ser informada.")
    private String descricao;

    private boolean disponivel;

    // Foi preciso mudar o tipo do campo de int para Integer para o @NotNull funcionar.
    @NotNull(message = "A 'Quantidade em estoque' deve ser informada.")
    @Min(value=0, message = "A 'Quantidade em estoque' deve ser maior ou igual a 0.")
    private Integer qtdEstoque;

    @NotNull(message = "O 'Preço' deve ser informado.")
    @DecimalMin(inclusive = true, value="0.1", message = "O 'Preço' deve ser maior ou igual a 0.1.")
    private BigDecimal preco;


    private LocalDate dataCadastro;

    /**
     * Define a relação: Muitos produtos pertencem a UMA empresa.
     * fetch = FetchType.LAZY: É uma otimização de performance CRÍTICA.
     * Significa que os dados da Empresa só serão carregados do banco quando
     * você explicitamente chamar produto.getEmpresa(). Isso evita carregar
     * dados desnecessários em consultas de listas de produtos.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    /**
     * Cria a coluna de chave estrangeira na tabela 'produto'.
     * name = "empresa_id": Nome da coluna.
     * nullable = false: Boa prática que garante que todo produto deve pertencer a uma empresa.
     */
    @JoinColumn(name = "empresa_id")
    private Empresa empresa;

    @OneToOne(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Interacao interacao;

    public Produto(String imagem, String nome, String slug, String descricao,
                   boolean disponivel, Integer qtdEstoque, BigDecimal preco,
                   LocalDate dataCadastro) {
        this.imagem = imagem;
        this.nome = nome;
        this.slug = slug;
        this.descricao = descricao;
        this.disponivel = disponivel;
        this.qtdEstoque = qtdEstoque;
        this.preco = preco;
        this.dataCadastro = dataCadastro;
        this.disponivel = isDisponivel();

    }

    public boolean isDisponivel() {
        return this.qtdEstoque > 0;
    }

}
