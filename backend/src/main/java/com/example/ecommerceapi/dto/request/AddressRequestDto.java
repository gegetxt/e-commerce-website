package com.example.ecommerceapi.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AddressRequestDto(

        @NotNull
        @NotBlank
        @NotEmpty
        @Size(max = 150)
        String title,

        @NotNull
        @NotBlank
        @NotEmpty
        @Size(max = 100)
        String name,

        @NotNull
        @NotBlank
        @NotEmpty
        @Size(max = 100)
        String surname,

        @NotNull
        @NotBlank
        @NotEmpty
        @Size(max = 20)
        String phone,

        @NotNull
        @NotBlank
        @NotEmpty
        @Size(max = 100)
        String city,

        @NotNull
        @NotBlank
        @NotEmpty
        @Size(max = 100)
        String district,

        @NotNull
        @NotBlank
        @NotEmpty
        @Size(max = 1000)
        String neighborhood,

        @Size(max = 2000)
        String address

) {}