package com.example.ecommerceapi.exception;

import org.springframework.http.HttpStatus;

public class InvalidCredentialsException extends EcommerceException {

    public InvalidCredentialsException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}