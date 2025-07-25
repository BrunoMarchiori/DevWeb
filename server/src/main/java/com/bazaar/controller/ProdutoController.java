package com.bazaar.controller;

import com.bazaar.dto.FavoritoDTO;
import com.bazaar.dto.ProdutoDTO;
import com.bazaar.entity.Interacao;
import com.bazaar.entity.Produto;
import com.bazaar.entity.ResultadoPaginado;
import com.bazaar.entity.Usuario;
import com.bazaar.service.AuthorizationService;
import com.bazaar.service.FavoritoService;
import com.bazaar.service.InteracaoService;
import com.bazaar.service.ProdutoService;
import com.bazaar.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@CrossOrigin("http://localhost:5432")
@RestController
@RequestMapping("produtos")  // http://localhost:8080/produtos
public class ProdutoController {

    @Autowired
    private FavoritoService favoriteService;

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private InteracaoService interacaoService;

    @Autowired
    private AuthorizationService authorizationService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping   // Requisição do tipo GET para http://localhost:8080/produtos
    public List<Produto> recuperarProdutos() {
//        if (true) {
//            throw new RuntimeException("Deu erro no servidor");
//        }
        return produtoService.recuperarProdutos();
    }

    // Requisição do tipo GET para http://localhost:8080/produtos/id
    @GetMapping("{idProduto}")
    public ResponseEntity<ProdutoDTO> recuperarProdutoPorId(@PathVariable("idProduto") long id) {
        ProdutoDTO dto = produtoService.recuperarProdutoPorId(id);
        return ResponseEntity.ok(dto);
    }

    // Requisição do tipo GET para http://localhost:8080/produtos/categoria/frutas
    /*@GetMapping("categoria/{slugCategoria}")
    public List<Produto> recuperarProdutosPorSlugCategoria(@PathVariable("slugCategoria") String slugCategoria) {
        return produtoService.recuperarProdutosPorSlugCategoria(slugCategoria);
    }*/

    // Requisição do tipo POST para http://localhost:8080/produtos
    @PostMapping
    public Produto cadastraProduto(@RequestBody Produto produto, @RequestParam Long usuarioId) {
        // Validar se o usuário tem permissão para gerenciar produtos
        Usuario usuario = usuarioService.buscarPorId(usuarioId);
        authorizationService.validarGerenciamentoProdutos(usuario);

        produto.setDataCadastro(LocalDate.now());
        produto.setDisponivel(true);
        Interacao interacao = new Interacao(produto);
        produtoService.cadastrarProduto(produto);
        interacaoService.cadastrarInteracao(interacao);

        return produto;
    }

    @PutMapping
    public Produto alterarProduto(@RequestBody Produto produto, @RequestParam Long usuarioId) {
        // Validar se o usuário tem permissão para gerenciar produtos
        Usuario usuario = usuarioService.buscarPorId(usuarioId);
        authorizationService.validarGerenciamentoProdutos(usuario);
        
        return produtoService.alterarProduto(produto);
    }

    @DeleteMapping  ("{idProduto}")   // http://localhost:8080/produtos/1
    public void removerProduto(@PathVariable("idProduto") long id, @RequestParam Long usuarioId) {
        // Validar se o usuário tem permissão para gerenciar produtos
        Usuario usuario = usuarioService.buscarPorId(usuarioId);
        authorizationService.validarGerenciamentoProdutos(usuario);
        
        produtoService.removerProduto(id);
    }

    // Entradas
    // - pagina corrente
    // - tamanho da página
    // Saídas:
    // - total de itens
    // - total de páginas
    // - pagina corrente
    // - itens da página corrente

    // Requisição do tipo GET para
    // http://localhost:8080/produtos/paginacao?pagina=0&tamanho=5&nome=ce
    @GetMapping("paginacao")
    public ResultadoPaginado<Produto> recuperarProdutosComPaginacao(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "5") int tamanho,
            @RequestParam(value = "nome", defaultValue = "") String nome) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Produto> page = produtoService.recuperarProdutosComPaginacao(pageable, nome);
        ResultadoPaginado<Produto> resultadoPaginado = new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
        return resultadoPaginado;
    }

    // Adicionar produto aos favoritados
    @PostMapping("/{idProduto}/favoritar/{idUsuario}")
    public ResponseEntity<String> favoritarProduto(
            @PathVariable Long idProduto,
            @PathVariable Long idUsuario) {
        favoriteService.addFavorite(idUsuario, idProduto);
        return ResponseEntity.ok("Produto favoritado com sucesso!");
    }

    // Remover produto dos favoritos
    @DeleteMapping("/{idProduto}/desfavoritar/{idUsuario}")
    public ResponseEntity<String> desfavoritarProduto(
            @PathVariable Long idProduto,
            @PathVariable Long idUsuario) {
        favoriteService.removeFavorite(idUsuario, idProduto);
        return ResponseEntity.ok("Produto removido dos favoritos.");
    }

    // Listar favoritos de um usuário
    @GetMapping("/favoritos/{idUsuario}")
    public ResponseEntity<Set<FavoritoDTO>> listarFavoritos(@PathVariable Long idUsuario) {
        Set<FavoritoDTO> favoritos = favoriteService.getFavorites(idUsuario);
        return ResponseEntity.ok(favoritos);
    }



}
