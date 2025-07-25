package com.bazaar.entity;

import com.bazaar.enums.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "favoriteProducts")
@Entity
@Table(name = "usuario")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "O 'Nome' deve ser informado.")
    @Size(min = 2, max = 100, message = "O nome deve ter entre 2 e 100 caracteres.")
    private String nome;

    @NotEmpty(message = "O endereço deve ser informado.")
    @Size(max = 255, message = "O endereço deve ter no máximo 255 caracteres.")
    private String endereco;

    private long telefone;

    @Email(message = "Email deve ter um formato válido.")
    @NotEmpty(message = "O email deve ser informado.")
    @Column(unique = true)
    private String email;

    @NotEmpty(message = "A senha deve ser informada.")
    @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres.")
    private String senha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empresa_colaboradora_id", nullable = true)
    private Empresa empresaColaboradora;

    @ManyToMany
    @JoinTable(
            name = "favorites",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<Produto> favoriteProducts = new HashSet<>();


    public Usuario(String nome, String endereco, long telefone, String email, String senha) {
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
    }

    public Usuario(String nome, String endereco, long telefone, String email, String senha, Empresa empresaColaboradora) {
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
        this.empresaColaboradora = empresaColaboradora;
    }

    /**
     * Método para obter o tipo de usuário dinamicamente baseado na empresa
     */
    public TipoUsuario getTipo() {
        return empresaColaboradora != null ? TipoUsuario.GESTOR_EMPRESARIAL : TipoUsuario.CLIENTE;
    }

    /**
     * Métodos de conveniência para verificar permissões
     */
    public boolean podeGerenciarProdutos() {
        return getTipo().podeGerenciarProdutos();
    }

    public boolean podeFazerCompras() {
        return getTipo().podeFazerCompras();
    }

    public boolean podeUsarCarrinho() {
        return getTipo().podeUsarCarrinho();
    }

    public boolean podeUsarFavoritos() {
        return getTipo().podeUsarFavoritos();
    }
}
