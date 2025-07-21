package com.bazaar.service;

import com.bazaar.entity.Usuario;
import com.bazaar.enums.TipoUsuario;
import com.bazaar.exception.UnauthorizedException;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {

    /**
     * Valida se o usuário pode gerenciar produtos
     */
    public void validarGerenciamentoProdutos(Usuario usuario) {
        if (usuario == null || !usuario.podeGerenciarProdutos()) {
            throw new UnauthorizedException("Acesso negado. Apenas Gestores Empresariais podem gerenciar produtos.");
        }
    }

    /**
     * Valida se o usuário pode fazer compras
     */
    public void validarCompras(Usuario usuario) {
        if (usuario == null || !usuario.podeFazerCompras()) {
            throw new UnauthorizedException("Acesso negado. Usuário não autorizado para fazer compras.");
        }
    }

    /**
     * Valida se o usuário pode usar carrinho
     */
    public void validarCarrinho(Usuario usuario) {
        if (usuario == null || !usuario.podeUsarCarrinho()) {
            throw new UnauthorizedException("Acesso negado. Usuário não autorizado para usar carrinho.");
        }
    }

    /**
     * Valida se o usuário pode usar favoritos
     */
    public void validarFavoritos(Usuario usuario) {
        if (usuario == null || !usuario.podeUsarFavoritos()) {
            throw new UnauthorizedException("Acesso negado. Usuário não autorizado para usar favoritos.");
        }
    }

    /**
     * Verifica se o usuário é um Gestor Empresarial
     */
    public boolean isGestorEmpresarial(Usuario usuario) {
        return usuario != null && usuario.getTipo() == TipoUsuario.GESTOR_EMPRESARIAL;
    }

    /**
     * Verifica se o usuário é um Cliente
     */
    public boolean isCliente(Usuario usuario) {
        return usuario != null && usuario.getTipo() == TipoUsuario.CLIENTE;
    }
}
