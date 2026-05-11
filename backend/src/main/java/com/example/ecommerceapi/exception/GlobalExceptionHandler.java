package com.example.ecommerceapi.exception;

import com.example.ecommerceapi.dto.response.EcommerceErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.LocalDateTime;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(EcommerceException.class)
    public ResponseEntity<EcommerceErrorResponse> handleException(EcommerceException ecommerceException){

        EcommerceErrorResponse errorResponse = new EcommerceErrorResponse(
                ecommerceException.getMessage(),
                ecommerceException.getHttpStatus().value(),
                System.currentTimeMillis(),
                LocalDateTime.now()
        );

        log.error(ecommerceException.getMessage(), ecommerceException);

        return new ResponseEntity<>(errorResponse, ecommerceException.getHttpStatus());
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<EcommerceErrorResponse> handleException(MethodArgumentTypeMismatchException exception){

        EcommerceErrorResponse errorResponse = new EcommerceErrorResponse(
                exception.getMessage(),
                HttpStatus.BAD_REQUEST.value(),
                System.currentTimeMillis(),
                LocalDateTime.now()
        );

        log.error(exception.getMessage(), exception);

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<EcommerceErrorResponse> handleException(MethodArgumentNotValidException exception){

        EcommerceErrorResponse errorResponse = new EcommerceErrorResponse(
                exception.getMessage(),
                HttpStatus.BAD_REQUEST.value(),
                System.currentTimeMillis(),
                LocalDateTime.now()
        );

        log.error(exception.getMessage(), exception);

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // 500 hatalarina da uyumlu bir mesaj donmek mantikli
    @ExceptionHandler(Exception.class)
    public ResponseEntity<EcommerceErrorResponse> handle(Exception exception){

        EcommerceErrorResponse errorResponse = new EcommerceErrorResponse(
                exception.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                System.currentTimeMillis(),
                LocalDateTime.now()
        );

        log.error(exception.getMessage(), exception);

        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
