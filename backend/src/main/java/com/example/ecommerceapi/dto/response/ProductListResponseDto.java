package com.example.ecommerceapi.dto.response;

import java.util.List;

public record ProductListResponseDto(
        Long total,
        List<ProductResponseDto> products
) {}