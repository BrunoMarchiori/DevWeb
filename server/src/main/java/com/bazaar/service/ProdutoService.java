package com.bazaar.service;

import com.bazaar.DTO.ProdutoDTO;
import com.bazaar.exception.EntidadeNaoEncontradaException;
import com.bazaar.entity.Produto;
import com.bazaar.repository.InteracaoRepository;
import com.bazaar.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Transactional(readOnly = true)
    public List<Produto> recuperarProdutos() {

        List<Produto> produtos = produtoRepository.recuperarProdutosComCategoria();

        if (produtos.isEmpty()) {
            throw new EntidadeNaoEncontradaException("Não existem produtos cadastrados");
        }

        return produtos;
    }

    public Produto cadastrarProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

//    public Produto alterarProduto(Produto produto) {
//        Optional<Produto> opt = produtoRepository.findById(produto.getId());
//        if (opt.isPresent()) {
//            return produtoRepository.save(produto);
//        }
//        throw new ProdutoNaoEncontradoException(
//                "Produto número " + produto.getId() + " não encontrado.");
//    }

//    @Transactional
//    public Produto alterarProduto(Produto produto) {
//        Optional<Produto> opt = produtoRepository.recuperarProdutoPorIdComLock(produto.getId());
//        if (opt.isPresent()) {
//            return produtoRepository.save(produto);
//        }
//        throw new ProdutoNaoEncontradoException(
//                "Produto número " + produto.getId() + " não encontrado.");
//    }

    @Transactional
    public Produto alterarProduto(Produto produto) {
        produtoRepository.findById(produto.getId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Produto número " + produto.getId() + " não encontrado."));
        return produtoRepository.save(produto);
    }

    @Transactional(rollbackFor = Exception.class)
    public void removerProduto(long id) {
        produtoRepository.deleteById(id);
//        produtoRepository.deleteById(1L);
//        if (true) {
//            throw new Exception("Deu erro!");
//        }
//        produtoRepository.deleteById(2L);
    }

    @Transactional(readOnly = true)
    public ProdutoDTO recuperarProdutoPorId(long id) {

        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Produto número " + id + " não encontrado."));

        return new ProdutoDTO(produto);

    }

    @Transactional(readOnly = true)
    public Page<Produto> recuperarProdutosComPaginacao(Pageable pageable, String nome) {
        return produtoRepository.recuperarProdutosComPaginacao(pageable, "%" + nome + "%");
    }

    /*public List<Produto> recuperarProdutosPorSlugCategoria(String slugCategoria) {
        return produtoRepository.recuperarProdutosPorSlugCategoria(slugCategoria);
    }*/
}
