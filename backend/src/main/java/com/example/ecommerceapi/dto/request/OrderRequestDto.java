package com.example.ecommerceapi.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record OrderRequestDto(

        @NotNull
        @Positive
        Long addressId,

        @NotNull
        LocalDateTime orderDate,

        @NotNull
        @NotBlank
        String cardNo,

        @NotNull
        @NotBlank
        String cardName,

        @NotNull
        @Min(1)
        @Max(12)
        Integer cardExpireMonth,

        @NotNull
        @Min(2024)
        Integer cardExpireYear,

        // CVV kabul ediyoruz ama saklamiyoruz (PCI-DSS)
        @NotNull
        Integer cardCcv,

        @NotNull
        @DecimalMin("0.01")
        BigDecimal price,

        @NotNull
        @NotEmpty
        @Valid
        List<OrderItemRequestDto> products

) {}