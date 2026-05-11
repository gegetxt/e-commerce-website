package com.example.ecommerceapi.controller;

import com.example.ecommerceapi.dto.response.ProductListResponseDto;
import com.example.ecommerceapi.dto.response.ProductResponseDto;
import com.example.ecommerceapi.service.ProductService;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ProductListResponseDto findAll(
            @RequestParam(value = "category", required = false) Long categoryId,
            @RequestParam(value = "filter", required = false) String filter,
            @RequestParam(value = "sort", required = false) String sort,
            @RequestParam(value = "limit", required = false) Integer limit,
            @RequestParam(value = "offset", required = false) Integer offset
    ){
        return productService.findAll(categoryId, filter, sort, limit, offset);
    }

    @GetMapping("/{id}")
    public ProductResponseDto findById(@Positive @PathVariable("id") Long id){

        return productService.findById(id);
    }
}