package com.example.ecommerceapi.service;

import com.example.ecommerceapi.dto.request.CreditCardRequestDto;
import com.example.ecommerceapi.dto.request.CreditCardUpdateRequestDto;
import com.example.ecommerceapi.dto.response.CreditCardResponseDto;

import java.util.Map;

public interface CreditCardService {

    Map<String, CreditCardResponseDto> getAllForCurrentUser();

    Map<String, CreditCardResponseDto> create(CreditCardRequestDto creditCardRequestDto);

    Map<String, CreditCardResponseDto> update(CreditCardUpdateRequestDto creditCardUpdateRequestDto);

    void deleteById(Long id);
}
