package com.example.ecommerceapi.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class EcommerceException extends RuntimeException {

    private HttpStatus httpStatus;

    public EcommerceException(String message, HttpStatus httpStatus){
        super(message);
        this.httpStatus = httpStatus;
    }

    public EcommerceException(String message){
        super(message);
        this.httpStatus = HttpStatus.BAD_REQUEST;
    }
}