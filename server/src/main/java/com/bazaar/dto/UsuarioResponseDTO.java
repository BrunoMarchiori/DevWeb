package com.bazaar.DTO;

import com.bazaar.entity.Usuario;
import lombok.Data;

@Data
public class UsuarioResponseDTO {
    private Long id;
    private String nome;
    private String endereco;
    private Long telefone;
    private String email;
    
    public UsuarioResponseDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.endereco = usuario.getEndereco();
        this.telefone = usuario.getTelefone();
        this.email = usuario.getEmail();
    }
}
