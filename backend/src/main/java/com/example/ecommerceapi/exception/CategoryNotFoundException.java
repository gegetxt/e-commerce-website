package com.example.ecommerceapi.exception;

import org.springframework.http.HttpStatus;

public class CategoryNotFoundException extends EcommerceException {

    public CategoryNotFoundException(String message){
        super(message, HttpStatus.NOT_FOUND);
    }
}