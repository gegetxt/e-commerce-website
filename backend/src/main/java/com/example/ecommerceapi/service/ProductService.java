package com.example.ecommerceapi.service;

import com.example.ecommerceapi.dto.response.ProductListResponseDto;
import com.example.ecommerceapi.dto.response.ProductResponseDto;

public interface ProductService {

    ProductListResponseDto findAll(Long categoryId, String filter, String sort, Integer limit, Integer offset);

    ProductResponseDto findById(Long id);
}
