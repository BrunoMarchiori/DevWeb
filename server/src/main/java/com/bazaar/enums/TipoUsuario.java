package com.bazaar.enums;

public enum TipoUsuario {
    CLIENTE("Cliente"),
    GESTOR_EMPRESARIAL("Gestor Empresarial");

    private final String descricao;

    TipoUsuario(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    /**
     * Verifica se o usuário tem permissão para gerenciar produtos
     */
    public boolean podeGerenciarProdutos() {
        return this == GESTOR_EMPRESARIAL;
    }

    /**
     * Verifica se o usuário pode fazer compras
     */
    public boolean podeFazerCompras() {
        return this == CLIENTE || this == GESTOR_EMPRESARIAL;
    }

    /**
     * Verifica se o usuário pode usar carrinho
     */
    public boolean podeUsarCarrinho() {
        return this == CLIENTE || this == GESTOR_EMPRESARIAL;
    }

    /**
     * Verifica se o usuário pode usar favoritos
     */
    public boolean podeUsarFavoritos() {
        return this == CLIENTE || this == GESTOR_EMPRESARIAL;
    }
}
