package com.example.ecommerceapi.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.*;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record CreditCardUpdateRequestDto(

        @NotNull
        @Positive
        Long id,

        String nameOnCard,
        String cardNo,
        Integer expireMonth,
        Integer expireYear

) {}