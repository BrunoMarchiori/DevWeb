package com.bazaar.service;

import com.bazaar.entity.Interacao;
import com.bazaar.entity.Produto;
import com.bazaar.repository.InteracaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InteracaoService {

    @Autowired
    InteracaoRepository interacaoRepository;

    public Interacao cadastrarInteracao(Interacao interacao) {
        return interacaoRepository.save(interacao);
    }
}
