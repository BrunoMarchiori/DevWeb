package com.bazaar.controller;

import com.bazaar.entity.Categoria;
import com.bazaar.entity.Empresa;
import com.bazaar.entity.Produto;
import com.bazaar.entity.Interacao;
import com.bazaar.repository.CategoriaRepository;
import com.bazaar.repository.EmpresaRepository;
import com.bazaar.repository.ProdutoRepository;
import com.bazaar.repository.InteracaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class TestController {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private InteracaoRepository interacaoRepository;

    @GetMapping("/processar-imagens")
    public String processarImagens() {
        try {
            String imagensPath = "/home/operador/Documentos/Facul/DevWeb/Imagens";
            File imagensDir = new File(imagensPath);
            
            if (!imagensDir.exists()) {
                return "Pasta de imagens não encontrada. Certifique-se de extrair o Imagens.zip primeiro.";
            }

            // Criar empresa se não existir
            Empresa empresa = null;
            if (empresaRepository.count() == 0) {
                empresa = new Empresa();
                empresa.setNome("Bazaar Store");
                empresa = empresaRepository.save(empresa);
            } else {
                empresa = empresaRepository.findAll().get(0);
            }

            // 1. Primeiro, criar todas as categorias
            Map<String, Categoria> categoriasMap = new HashMap<>();
            File[] categoriasDirs = imagensDir.listFiles(File::isDirectory);
            
            if (categoriasDirs != null) {
                for (File categoriaDir : categoriasDirs) {
                    String nomeCategoria = categoriaDir.getName();
                    
                    // Verificar se a categoria já existe
                    Optional<Categoria> categoriaExistente = categoriaRepository.findByNome(nomeCategoria);
                    Categoria categoria;
                    
                    if (categoriaExistente.isPresent()) {
                        categoria = categoriaExistente.get();
                    } else {
                        categoria = new Categoria(nomeCategoria);
                        categoria = categoriaRepository.save(categoria);
                    }
                    
                    categoriasMap.put(nomeCategoria, categoria);
                }
            }

            // 2. Mapear todas as imagens e suas categorias
            Map<String, Set<Categoria>> imagensPorCategoria = new HashMap<>();
            
            if (categoriasDirs != null) {
                for (File categoriaDir : categoriasDirs) {
                    String nomeCategoria = categoriaDir.getName();
                    Categoria categoria = categoriasMap.get(nomeCategoria);
                    
                    File[] arquivosImagem = categoriaDir.listFiles((dir, name) -> 
                        name.toLowerCase().endsWith(".png") || 
                        name.toLowerCase().endsWith(".jpg") || 
                        name.toLowerCase().endsWith(".jpeg"));
                    
                    if (arquivosImagem != null) {
                        for (File imagemFile : arquivosImagem) {
                            String nomeImagem = imagemFile.getName();
                            
                            imagensPorCategoria.computeIfAbsent(nomeImagem, k -> new HashSet<>())
                                              .add(categoria);
                        }
                    }
                }
            }

            // 3. Criar produtos únicos com múltiplas categorias
            int produtosCriados = 0;
            List<BigDecimal> precos = Arrays.asList(
                new BigDecimal("29.99"), new BigDecimal("49.99"), new BigDecimal("79.99"),
                new BigDecimal("99.99"), new BigDecimal("149.99"), new BigDecimal("199.99"),
                new BigDecimal("299.99"), new BigDecimal("399.99"), new BigDecimal("599.99")
            );
            
            Random random = new Random();
            
            for (Map.Entry<String, Set<Categoria>> entry : imagensPorCategoria.entrySet()) {
                String nomeImagem = entry.getKey();
                Set<Categoria> categorias = entry.getValue();
                
                // Verificar se produto já existe com esse nome de imagem
                if (produtoRepository.findByImagem(nomeImagem).isEmpty()) {
                    // Encontrar o arquivo da imagem (pegar da primeira categoria)
                    String primeiraCategoria = categorias.iterator().next().getNome();
                    File imagemFile = new File(imagensPath + "/" + primeiraCategoria + "/" + nomeImagem);
                    
                    if (imagemFile.exists()) {
                        // Ler a imagem como bytes
                        byte[] imagemBytes = Files.readAllBytes(imagemFile.toPath());
                        
                        // Criar nome do produto baseado no nome da imagem
                        String nomeProduto = nomeImagem
                            .replaceAll("pngimg\\.com - ", "")
                            .replaceAll("_PNG\\d+", "")
                            .replaceAll("_", " ")
                            .replaceAll("\\.png|\\.jpg|\\.jpeg", "")
                            .trim();
                        
                        // Capitalizar primeira letra de cada palavra
                        nomeProduto = Arrays.stream(nomeProduto.split(" "))
                            .map(word -> word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase())
                            .collect(Collectors.joining(" "));
                        
                        // Criar slug
                        String slug = nomeProduto.toLowerCase()
                            .replaceAll("[^a-z0-9]+", "-")
                            .replaceAll("^-|-$", "");
                        
                        // Criar produto
                        Produto produto = new Produto();
                        produto.setNome(nomeProduto);
                        produto.setSlug(slug);
                        produto.setImagem(nomeImagem);
                        produto.setImagemBlob(imagemBytes);
                        produto.setDescricao("Produto " + nomeProduto + " disponível nas categorias: " + 
                            categorias.stream().map(Categoria::getNome).collect(Collectors.joining(", ")));
                        produto.setPreco(precos.get(random.nextInt(precos.size())));
                        produto.setQtdEstoque(random.nextInt(50) + 10); // Entre 10 e 60
                        produto.setDisponivel(true);
                        produto.setDataCadastro(LocalDate.now());
                        produto.setEmpresa(empresa);
                        produto.setCategorias(categorias);
                        
                        produtoRepository.save(produto);
                        produtosCriados++;
                    }
                }
            }
            
            return String.format("Processamento concluído! Criadas %d categorias e %d produtos únicos.", 
                categoriasMap.size(), produtosCriados);
            
        } catch (Exception e) {
            return "Erro ao processar imagens: " + e.getMessage();
        }
    }

    @GetMapping("/status-produtos")
    public String statusProdutos() {
        try {
            long totalProdutos = produtoRepository.count();
            long totalCategorias = categoriaRepository.count();
            long totalEmpresas = empresaRepository.count();
            
            return String.format("Status do banco: %d produtos, %d categorias, %d empresas", 
                totalProdutos, totalCategorias, totalEmpresas);
        } catch (Exception e) {
            return "Erro ao verificar status: " + e.getMessage();
        }
    }

    @GetMapping("/criar-interacoes")
    public String criarInteracoes() {
        try {
            // Buscar todos os produtos
            List<Produto> produtos = produtoRepository.findAll();
            
            for (Produto produto : produtos) {
                // Verificar se já existe interação para este produto
                if (interacaoRepository.findByProdutoId(produto.getId()).isEmpty()) {
                    Interacao interacao = new Interacao();
                    interacao.setProduto(produto);
                    
                    // Produtos com mais de uma categoria têm mais interações
                    int numeroInteracoes;
                    if (produto.getCategorias().size() > 1) {
                        numeroInteracoes = 100 + new Random().nextInt(200); // 100-300
                    } else {
                        numeroInteracoes = 10 + new Random().nextInt(90); // 10-100
                    }
                    
                    interacao.setVisualizacoes(numeroInteracoes);
                    interacao.setCurtidas(numeroInteracoes / 5);
                    
                    interacaoRepository.save(interacao);
                }
            }
            
            return "Interações criadas com sucesso!";
        } catch (Exception e) {
            return "Erro ao criar interações: " + e.getMessage();
        }
    }
}
