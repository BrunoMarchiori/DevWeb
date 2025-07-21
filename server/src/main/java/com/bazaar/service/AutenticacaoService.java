package com.bazaar.service;



import com.bazaar.dto.UsuarioResponseDTO;
import com.bazaar.entity.Produto;
import com.bazaar.entity.Usuario;
import com.bazaar.exception.EntidadeNaoEncontradaException;
import com.bazaar.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AutenticacaoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    public Usuario login(Usuario usuario) {
        // System.out.println("Conta = " + usuario.getConta() + " e senha = " + usuario.getSenha());

        String senhaCriptografada = usuarioService.criptografarSenha(usuario.getSenha());

        Usuario user =  usuarioRepository.findByEmailAndSenha(
                usuario.getEmail(), senhaCriptografada);

        if (user == null){
            throw  new EntidadeNaoEncontradaException("Usuario não encontrado");
        }

        return user;
    }

    public Usuario cadastroUsuario(Usuario usuario){

        return usuarioRepository.save(usuario);
    }

    @Transactional(readOnly = true)
    public UsuarioResponseDTO recuperarUsuarioPorId(long id) {

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Usuario número " + id + " não encontrado."));


        return new UsuarioResponseDTO(usuario);
    }
}
