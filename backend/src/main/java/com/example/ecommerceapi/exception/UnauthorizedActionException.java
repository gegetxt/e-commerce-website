package com.example.ecommerceapi.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedActionException extends EcommerceException {

    public UnauthorizedActionException(String message) {
        super(message, HttpStatus.FORBIDDEN);
    }
}