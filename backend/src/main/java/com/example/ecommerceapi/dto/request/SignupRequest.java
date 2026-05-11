package com.example.ecommerceapi.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record SignupRequest(

        @NotNull
        @NotBlank
        @NotEmpty
        @Size(min = 3, max = 100)
        String name,

        @NotNull
        @NotBlank
        @NotEmpty
        @Email
        String email,

        @NotNull
        @NotBlank
        @NotEmpty
        @Size(min = 6, max = 100)
        String password,

        @NotNull
        Long roleId,

        @Valid
        StoreSignupRequest store

) {}