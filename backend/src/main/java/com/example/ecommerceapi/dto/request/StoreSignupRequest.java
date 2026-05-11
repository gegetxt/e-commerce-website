package com.example.ecommerceapi.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record StoreSignupRequest(

        @NotNull
        @NotBlank
        @NotEmpty
        @Size(min = 3, max = 100)
        String name,

        @NotNull
        @NotBlank
        @NotEmpty
        String phone,

        @NotNull
        @NotBlank
        @NotEmpty
        String taxNo,

        @NotNull
        @NotBlank
        @NotEmpty
        String bankAccount

) {}
