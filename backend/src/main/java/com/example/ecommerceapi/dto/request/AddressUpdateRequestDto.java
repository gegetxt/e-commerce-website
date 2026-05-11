package com.example.ecommerceapi.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record AddressUpdateRequestDto(

        @NotNull
        @Positive
        Long id,

        String title,
        String name,
        String surname,
        String phone,
        String city,
        String district,
        String neighborhood,
        String address

) {}