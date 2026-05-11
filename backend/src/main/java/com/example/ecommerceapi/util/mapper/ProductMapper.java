package com.example.ecommerceapi.util.mapper;

import com.example.ecommerceapi.dto.response.ProductImageResponseDto;
import com.example.ecommerceapi.dto.response.ProductResponseDto;
import com.example.ecommerceapi.entity.Product;
import com.example.ecommerceapi.entity.ProductImage;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductMapper {


    public ProductResponseDto toResponseDto(Product product){

        List<ProductImageResponseDto> images = product.getImages()
                .stream()
                .map(this::toImageDto)
                .toList();

        return new ProductResponseDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getStore().getId(),
                product.getCategory().getId(),
                product.getRating(),
                product.getSellCount(),
                images
        );
    }

    private ProductImageResponseDto toImageDto(ProductImage image){

        return new ProductImageResponseDto(
                image.getUrl(),
                image.getImageIndex()
        );
    }
}