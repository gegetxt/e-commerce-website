package com.example.ecommerceapi.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.*;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record CreditCardRequestDto(

        @NotNull
        @NotBlank
        @NotEmpty
        @Size(max = 100)
        String nameOnCard,

        @NotNull
        @NotBlank
        @NotEmpty
        @Size(max = 20)
        String cardNo,

        @NotNull
        @Min(1)
        @Max(12)
        Integer expireMonth,

        @NotNull
        @Min(2024)
        Integer expireYear

) {}