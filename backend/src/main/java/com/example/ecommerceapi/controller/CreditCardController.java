package com.example.ecommerceapi.controller;

import com.example.ecommerceapi.dto.request.CreditCardRequestDto;
import com.example.ecommerceapi.dto.request.CreditCardUpdateRequestDto;
import com.example.ecommerceapi.dto.response.CreditCardResponseDto;
import com.example.ecommerceapi.service.CreditCardService;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user/card")
public class CreditCardController {

    @Autowired
    private CreditCardService creditCardService;

    @GetMapping
    public Map<String, CreditCardResponseDto> getAll(){

        return creditCardService.getAllForCurrentUser();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, CreditCardResponseDto> create(@Validated @RequestBody CreditCardRequestDto creditCardRequestDto){

        return creditCardService.create(creditCardRequestDto);
    }

    @PutMapping
    public Map<String, CreditCardResponseDto> update(@Validated @RequestBody CreditCardUpdateRequestDto creditCardUpdateRequestDto){

        return creditCardService.update(creditCardUpdateRequestDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@Positive @PathVariable("id") Long id){

        creditCardService.deleteById(id);
    }
}