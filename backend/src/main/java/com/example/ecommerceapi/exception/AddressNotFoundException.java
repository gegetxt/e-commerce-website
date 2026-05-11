package com.example.ecommerceapi.exception;

import org.springframework.http.HttpStatus;

public class AddressNotFoundException extends EcommerceException {

    public AddressNotFoundException(String message){
        super(message, HttpStatus.NOT_FOUND);
    }
}