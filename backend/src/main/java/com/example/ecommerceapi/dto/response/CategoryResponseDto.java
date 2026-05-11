package com.example.ecommerceapi.dto.response;

public record CategoryResponseDto(
        Long id,
        String code,
        String title,
        String img,
        Double rating,
        String gender
) {}