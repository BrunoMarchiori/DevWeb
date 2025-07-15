package com.bazaar.service;



import com.bazaar.entity.Usuario;
import com.bazaar.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario login(Usuario usuario) {
        // System.out.println("Conta = " + usuario.getConta() + " e senha = " + usuario.getSenha());
        return usuarioRepository.findByEmailAndSenha(
                usuario.getEmail(), usuario.getSenha());
    }

    public Usuario cadastroUsuario(Usuario usuario){

        return usuarioRepository.save(usuario);
    }
}
