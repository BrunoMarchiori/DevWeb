package com.bazaar.service;

import com.bazaar.dto.AdicionarItemCarrinhoDTO;
import com.bazaar.dto.CarrinhoDTO;
import com.bazaar.entity.Carrinho;
import com.bazaar.entity.ItemCarrinho;
import com.bazaar.entity.Produto;
import com.bazaar.entity.Usuario;
import com.bazaar.exception.*;
import com.bazaar.repository.CarrinhoRepository;
import com.bazaar.repository.ItemCarrinhoRepository;
import com.bazaar.repository.ProdutoRepository;
import com.bazaar.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private ItemCarrinhoRepository itemCarrinhoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Transactional
    public CarrinhoDTO adicionarItem(Long usuarioId, AdicionarItemCarrinhoDTO dto) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuário não encontrado"));

        Produto produto = produtoRepository.findById(dto.getProdutoId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Produto não encontrado"));

        // Verificar se o produto está disponível
        if (!produto.isDisponivel()) {
            throw new ProdutoIndisponivelException("Produto não está disponível");
        }

        // Verificar se há estoque suficiente
        if (produto.getQtdEstoque() < dto.getQuantidade()) {
            throw new EstoqueInsuficienteException(
                "Estoque insuficiente. Disponível: " + produto.getQtdEstoque());
        }

        // Buscar ou criar carrinho ativo para o usuário
        Carrinho carrinho = carrinhoRepository.findByUsuarioAndStatusAtivo(usuario)
                .orElseGet(() -> new Carrinho(usuario));

        // Verificar se o produto já está no carrinho
        Optional<ItemCarrinho> itemExistente = itemCarrinhoRepository
                .findByCarrinhoAndProduto(carrinho, produto);

        if (itemExistente.isPresent()) {
            // Se já existe, atualizar quantidade
            ItemCarrinho item = itemExistente.get();
            int novaQuantidade = item.getQuantidade() + dto.getQuantidade();
            
            // Verificar estoque novamente com a nova quantidade
            if (produto.getQtdEstoque() < novaQuantidade) {
                throw new EstoqueInsuficienteException(
                    "Estoque insuficiente. Disponível: " + produto.getQtdEstoque() + 
                    ", já no carrinho: " + item.getQuantidade());
            }
            
            item.atualizarQuantidade(novaQuantidade);
            itemCarrinhoRepository.save(item);
        } else {
            // Se não existe, criar novo item
            ItemCarrinho novoItem = new ItemCarrinho(carrinho, produto, dto.getQuantidade());
            carrinho.getItens().add(novoItem);
            itemCarrinhoRepository.save(novoItem);
        }

        carrinho.atualizarDataModificacao();
        carrinho = carrinhoRepository.save(carrinho);

        return new CarrinhoDTO(carrinho);
    }

    @Transactional
    public CarrinhoDTO removerItem(Long usuarioId, Long produtoId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuário não encontrado"));

        Carrinho carrinho = carrinhoRepository.findByUsuarioAndStatusAtivo(usuario)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Carrinho ativo não encontrado"));

        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Produto não encontrado"));

        itemCarrinhoRepository.deleteByCarrinhoAndProduto(carrinho, produto);
        
        carrinho.atualizarDataModificacao();
        carrinho = carrinhoRepository.save(carrinho);

        return new CarrinhoDTO(carrinho);
    }

    @Transactional
    public CarrinhoDTO atualizarQuantidadeItem(Long usuarioId, Long produtoId, Integer novaQuantidade) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuário não encontrado"));

        Carrinho carrinho = carrinhoRepository.findByUsuarioAndStatusAtivo(usuario)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Carrinho ativo não encontrado"));

        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Produto não encontrado"));

        ItemCarrinho item = itemCarrinhoRepository.findByCarrinhoAndProduto(carrinho, produto)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Item não encontrado no carrinho"));

        // Verificar estoque
        if (produto.getQtdEstoque() < novaQuantidade) {
            throw new EstoqueInsuficienteException(
                "Estoque insuficiente. Disponível: " + produto.getQtdEstoque());
        }

        if (novaQuantidade <= 0) {
            itemCarrinhoRepository.delete(item);
        } else {
            item.atualizarQuantidade(novaQuantidade);
            itemCarrinhoRepository.save(item);
        }

        carrinho.atualizarDataModificacao();
        carrinho = carrinhoRepository.save(carrinho);

        return new CarrinhoDTO(carrinho);
    }

    @Transactional(readOnly = true)
    public CarrinhoDTO obterCarrinho(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuário não encontrado"));

        Carrinho carrinho = carrinhoRepository.findByUsuarioAndStatusAtivo(usuario)
                .orElseGet(() -> new Carrinho(usuario));

        return new CarrinhoDTO(carrinho);
    }

    @Transactional
    public CarrinhoDTO limparCarrinho(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuário não encontrado"));

        Carrinho carrinho = carrinhoRepository.findByUsuarioAndStatusAtivo(usuario)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Carrinho ativo não encontrado"));

        carrinho.getItens().clear();
        carrinho.atualizarDataModificacao();
        carrinho = carrinhoRepository.save(carrinho);

        return new CarrinhoDTO(carrinho);
    }

    @Transactional
    public String fecharCompra(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuário não encontrado"));

        Carrinho carrinho = carrinhoRepository.findByUsuarioAndStatusAtivo(usuario)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Carrinho ativo não encontrado"));

        if (carrinho.getItens().isEmpty()) {
            throw new CarrinhoVazioException("Não é possível finalizar compra com carrinho vazio");
        }

        // Verificar disponibilidade e estoque de todos os itens
        for (ItemCarrinho item : carrinho.getItens()) {
            Produto produto = item.getProduto();
            
            if (!produto.isDisponivel()) {
                throw new ProdutoIndisponivelException(
                    "O produto '" + produto.getNome() + "' não está mais disponível");
            }
            
            if (produto.getQtdEstoque() < item.getQuantidade()) {
                throw new EstoqueInsuficienteException(
                    "Estoque insuficiente para o produto '" + produto.getNome() + 
                    "'. Disponível: " + produto.getQtdEstoque() + 
                    ", solicitado: " + item.getQuantidade());
            }
        }

        // Atualizar estoque dos produtos
        for (ItemCarrinho item : carrinho.getItens()) {
            Produto produto = item.getProduto();
            produto.setQtdEstoque(produto.getQtdEstoque() - item.getQuantidade());
            produtoRepository.save(produto);
        }

        // Finalizar carrinho
        carrinho.setStatus(Carrinho.StatusCarrinho.FINALIZADO);
        carrinho.atualizarDataModificacao();
        carrinhoRepository.save(carrinho);

        return "Compra finalizada com sucesso! Total: R$ " + carrinho.getValorTotal();
    }
}
