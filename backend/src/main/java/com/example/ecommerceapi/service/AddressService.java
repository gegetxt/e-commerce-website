package com.example.ecommerceapi.service;

import com.example.ecommerceapi.dto.request.AddressRequestDto;
import com.example.ecommerceapi.dto.request.AddressUpdateRequestDto;
import com.example.ecommerceapi.dto.response.AddressResponseDto;

import java.util.Map;

public interface AddressService {

    Map<String, AddressResponseDto> getAllForCurrentUser();

    AddressResponseDto create(AddressRequestDto addressRequestDto);

    AddressResponseDto update(AddressUpdateRequestDto addressUpdateRequestDto);

    void deleteById(Long id);
}
