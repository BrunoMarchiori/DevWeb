package com.bazaar.exception;

public class ProdutoIndisponivelException extends RuntimeException {
    public ProdutoIndisponivelException(String message) {
        super(message);
    }
}
