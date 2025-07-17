package com.bazaar.dto;

import lombok.Data;

@Data
public class UsuarioResponseDTO {
    private Long id;
    private String nome;
    private String endereco;
    private Long telefone;
    private String email;
    
    public UsuarioResponseDTO(Long id, String nome, String endereco, Long telefone, String email) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.email = email;
    }
}
