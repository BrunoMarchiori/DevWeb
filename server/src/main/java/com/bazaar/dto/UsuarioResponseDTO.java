package com.bazaar.dto;

import com.bazaar.entity.Usuario;
import com.bazaar.enums.TipoUsuario;
import lombok.Data;

@Data
public class UsuarioResponseDTO {
    private Long id;
    private String nome;
    private String endereco;
    private Long telefone;
    private String email;
    private TipoUsuario tipo;
    private Long empresaColaboradoraId;
    private String empresaColaboradoraNome;
    
    public UsuarioResponseDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.endereco = usuario.getEndereco();
        this.telefone = usuario.getTelefone();
        this.email = usuario.getEmail();
        this.tipo = usuario.getTipo();
        
        if (usuario.getEmpresaColaboradora() != null) {
            this.empresaColaboradoraId = usuario.getEmpresaColaboradora().getId();
            this.empresaColaboradoraNome = usuario.getEmpresaColaboradora().getNome();
        }
    }
}
