package com.example.ecommerceapi.exception;

import org.springframework.http.HttpStatus;

public class DuplicateResourceException extends EcommerceException {

    public DuplicateResourceException(String message) {
        super(message, HttpStatus.CONFLICT);
    }
}