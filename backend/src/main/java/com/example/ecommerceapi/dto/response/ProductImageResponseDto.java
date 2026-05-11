package com.example.ecommerceapi.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ProductImageResponseDto(

        String url,

        // Workintech format'inda "index" diye geliyor, "image_index" degil
        @JsonProperty("index")
        Integer imageIndex

) {}