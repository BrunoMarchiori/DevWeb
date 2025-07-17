package com.bazaar.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UsuarioRegistroDTO {
    
    @NotEmpty(message = "O nome deve ser informado.")
    @Size(min = 2, max = 100, message = "O nome deve ter entre 2 e 100 caracteres.")
    private String nome;
    
    @NotEmpty(message = "O endereço deve ser informado.")
    @Size(max = 255, message = "O endereço deve ter no máximo 255 caracteres.")
    private String endereco;
    
    private Long telefone;
    
    @Email(message = "Email deve ter um formato válido.")
    @NotEmpty(message = "O email deve ser informado.")
    private String email;
    
    @NotEmpty(message = "A senha deve ser informada.")
    @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres.")
    private String senha;
    
    @NotEmpty(message = "A confirmação de senha deve ser informada.")
    private String confirmaSenha;
}
