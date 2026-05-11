package com.example.ecommerceapi.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record CreditCardResponseDto(
        Long id,
        Long userId,
        String nameOnCard,
        String cardNo,
        Integer expireMonth,
        Integer expireYear
) {}