package com.bazaar.controller;

import com.bazaar.dto.UsuarioRegistroDTO;
import com.bazaar.dto.UsuarioResponseDTO;
import com.bazaar.exception.EmailJaExisteException;
import com.bazaar.exception.SenhasNaoCoincidentesException;
import com.bazaar.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@Valid @RequestBody UsuarioRegistroDTO registroDTO, BindingResult result) {
        try {
            // Verificar erros de validação
            if (result.hasErrors()) {
                Map<String, String> errors = new HashMap<>();
                result.getFieldErrors().forEach(error -> 
                    errors.put(error.getField(), error.getDefaultMessage())
                );
                return ResponseEntity.badRequest().body(Map.of("errors", errors));
            }

            UsuarioResponseDTO usuarioResponse = usuarioService.registrarUsuario(registroDTO);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Usuário cadastrado com sucesso!",
                "usuario", usuarioResponse
            ));
            
        } catch (SenhasNaoCoincidentesException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (EmailJaExisteException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro interno do servidor: " + e.getMessage()));
        }
    }

    @GetMapping("/verificar-email")
    public ResponseEntity<Map<String, Boolean>> verificarEmail(@RequestParam String email) {
        boolean emailExiste = usuarioService.emailJaExiste(email);
        return ResponseEntity.ok(Map.of("emailExiste", emailExiste));
    }
}
