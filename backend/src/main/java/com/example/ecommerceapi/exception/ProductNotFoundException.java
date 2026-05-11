package com.example.ecommerceapi.exception;

import org.springframework.http.HttpStatus;

public class ProductNotFoundException extends EcommerceException {

    public ProductNotFoundException(String message){
        super(message, HttpStatus.NOT_FOUND);
    }
}