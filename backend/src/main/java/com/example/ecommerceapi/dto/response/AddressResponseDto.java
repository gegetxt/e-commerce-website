package com.example.ecommerceapi.dto.response;

public record AddressResponseDto(
        Long id,
        String title,
        String name,
        String surname,
        String phone,
        String city,
        String district,
        String neighborhood,
        String address
) {}