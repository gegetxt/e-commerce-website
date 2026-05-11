package com.example.ecommerceapi.dto.request;

import jakarta.validation.constraints.NotNull;

public class ProductUpdateRequest {

    @NotNull
    private Long id;

    @NotNull
    private ProductCreateRequest payload;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductCreateRequest getPayload() {
        return payload;
    }

    public void setPayload(ProductCreateRequest payload) {
        this.payload = payload;
    }
}
