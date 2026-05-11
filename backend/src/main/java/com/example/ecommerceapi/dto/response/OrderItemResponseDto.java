package com.example.ecommerceapi.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.math.BigDecimal;
import java.util.List;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record OrderItemResponseDto(
        Long id,
        String name,
        String description,
        BigDecimal price,
        Integer count,
        List<OrderItemImageDto> images
) {

    public record OrderItemImageDto(
            String url,
            Integer index
    ) {}
}