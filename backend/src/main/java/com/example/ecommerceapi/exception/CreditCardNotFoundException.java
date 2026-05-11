package com.example.ecommerceapi.exception;

import org.springframework.http.HttpStatus;

public class CreditCardNotFoundException extends EcommerceException {

    public CreditCardNotFoundException(String message){
        super(message, HttpStatus.NOT_FOUND);
    }
}