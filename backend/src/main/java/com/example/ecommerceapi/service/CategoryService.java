package com.example.ecommerceapi.service;

import com.example.ecommerceapi.dto.response.CategoryResponseDto;

import java.util.List;

public interface CategoryService {

    List<CategoryResponseDto> findAll();

    CategoryResponseDto findById(Long id);
}
