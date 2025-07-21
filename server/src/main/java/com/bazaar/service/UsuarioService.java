package com.bazaar.service;

import com.bazaar.DTO.UsuarioRegistroDTO;
import com.bazaar.DTO.UsuarioResponseDTO;
import com.bazaar.entity.Usuario;
import com.bazaar.exception.EmailJaExisteException;
import com.bazaar.exception.SenhasNaoCoincidentesException;
import com.bazaar.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioResponseDTO registrarUsuario(UsuarioRegistroDTO registroDTO) {
        // Validar se as senhas coincidem
        if (!registroDTO.getSenha().equals(registroDTO.getConfirmaSenha())) {
            throw new SenhasNaoCoincidentesException("A senha e a confirmação de senha devem ser iguais.");
        }

        // Verificar se o email já existe
        if (usuarioRepository.existsByEmail(registroDTO.getEmail())) {
            throw new EmailJaExisteException("Já existe um usuário cadastrado com este email.");
        }

        // Criar novo usuário
        Usuario usuario = new Usuario();
        usuario.setNome(registroDTO.getNome());
        usuario.setEndereco(registroDTO.getEndereco());
        usuario.setTelefone(registroDTO.getTelefone());
        usuario.setEmail(registroDTO.getEmail());
        
        // Criptografar a senha usando SHA-256 por simplicidade
        String senhaCriptografada = criptografarSenha(registroDTO.getSenha());
        usuario.setSenha(senhaCriptografada);

        // Salvar usuário
        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        // Retornar resposta sem a senha
        return new UsuarioResponseDTO(
            usuarioSalvo.getId(),
            usuarioSalvo.getNome(),
            usuarioSalvo.getEndereco(),
            usuarioSalvo.getTelefone(),
            usuarioSalvo.getEmail()
        );
    }

    public boolean emailJaExiste(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    public String criptografarSenha(String senha) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(senha.getBytes());
            StringBuilder hexString = new StringBuilder();
            
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Erro ao criptografar senha", e);
        }
    }
}
