package com.bazaar.exception;

public class SenhasNaoCoincidentesException extends RuntimeException {
    public SenhasNaoCoincidentesException(String message) {
        super(message);
    }
}
