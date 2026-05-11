package com.example.ecommerceapi.dto.request;

import jakarta.validation.constraints.NotNull;

public class CategoryUpdateRequest extends CategoryCreateRequest {

    @NotNull
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
