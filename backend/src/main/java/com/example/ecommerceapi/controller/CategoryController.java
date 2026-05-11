package com.example.ecommerceapi.controller;

import com.example.ecommerceapi.dto.response.CategoryResponseDto;
import com.example.ecommerceapi.service.CategoryService;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<CategoryResponseDto> findAll(){

        return categoryService.findAll();
    }

    @GetMapping("/{id}")
    public CategoryResponseDto findById(@Positive @PathVariable("id") Long id){

        return categoryService.findById(id);
    }
}