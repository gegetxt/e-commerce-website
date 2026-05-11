package com.example.ecommerceapi.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record OrderResponseDto(
        Long id,
        Long userId,
        Long addressId,
        LocalDateTime orderDate,
        String cardNo,
        String cardName,
        Integer cardExpireMonth,
        Integer cardExpireYear,
        BigDecimal price,
        List<OrderItemResponseDto> products
) {}