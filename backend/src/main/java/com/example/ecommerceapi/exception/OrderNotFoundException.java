package com.example.ecommerceapi.exception;

import org.springframework.http.HttpStatus;

public class OrderNotFoundException extends EcommerceException {

    public OrderNotFoundException(String message){
        super(message, HttpStatus.NOT_FOUND);
    }
}