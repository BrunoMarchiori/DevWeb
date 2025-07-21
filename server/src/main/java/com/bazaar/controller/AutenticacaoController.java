package com.bazaar.controller;
import com.bazaar.DTO.UsuarioResponseDTO;
import com.bazaar.entity.Interacao;
import com.bazaar.entity.Produto;
import com.bazaar.entity.Usuario;
import com.bazaar.service.AutenticacaoService;
import com.bazaar.util.TokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@CrossOrigin("http://localhost:5432")
@RestController
@RequestMapping("autenticacao")   // http://localhost:8080/autenticacao
public class AutenticacaoController {

    @Autowired
    private AutenticacaoService autenticacaoService;

    @PostMapping("login")  // http://localhost:8080/autenticacao/login
    public TokenResponse login(@RequestBody Usuario usuario) {
        System.out.println(usuario.getEmail() + " " + usuario.getSenha());
        Usuario usuarioLogado = autenticacaoService.login(usuario);
        if (usuarioLogado != null) {
            return new TokenResponse(usuarioLogado.getId());
        } else {
            return new TokenResponse(0);
        }
    }

    // Requisição do tipo GET para http://localhost:8080/autenticacao/id
    @GetMapping("{idUsuario}")
    public ResponseEntity<UsuarioResponseDTO> recuperarUsuarioPorId(@PathVariable("idUsuario") long id) {

        UsuarioResponseDTO dto = autenticacaoService.recuperarUsuarioPorId(id);

        return ResponseEntity.ok(dto);
    }

}
