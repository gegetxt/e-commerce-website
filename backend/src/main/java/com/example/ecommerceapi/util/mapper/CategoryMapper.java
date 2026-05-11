package com.example.ecommerceapi.util.mapper;

import com.example.ecommerceapi.dto.response.CategoryResponseDto;
import com.example.ecommerceapi.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {


    public CategoryResponseDto toResponseDto(Category category){
        return toResponseDto(category, category.getRating());
    }

    public CategoryResponseDto toResponseDto(Category category, Double rating){

        return new CategoryResponseDto(
                category.getId(),
                category.getCode(),
                category.getTitle(),
                category.getImg(),
                rating,
                category.getGender()
        );
    }
}
