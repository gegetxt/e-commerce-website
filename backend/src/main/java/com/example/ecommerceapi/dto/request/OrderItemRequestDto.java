package com.example.ecommerceapi.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.*;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record OrderItemRequestDto(

        @NotNull
        @Positive
        Long productId,

        @NotNull
        @Min(1)
        Integer count,

        String detail

) {}
