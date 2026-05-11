package com.example.ecommerceapi.service.impl;

import com.example.ecommerceapi.dto.response.CategoryResponseDto;
import com.example.ecommerceapi.entity.Category;
import com.example.ecommerceapi.exception.CategoryNotFoundException;
import com.example.ecommerceapi.repository.CategoryRepository;
import com.example.ecommerceapi.repository.ProductRepository;
import com.example.ecommerceapi.service.CategoryService;
import com.example.ecommerceapi.util.mapper.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryMapper categoryMapper;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<CategoryResponseDto> findAll() {
        Map<Long, Double> averageRatingsByCategory = productRepository.findAverageRatingsByCategory()
                .stream()
                .collect(Collectors.toMap(
                        ProductRepository.CategoryRatingAverage::getCategoryId,
                        average -> normalizeRating(average.getAverageRating())
                ));

        return categoryRepository.findAll()
                .stream()
                .map(category -> categoryMapper.toResponseDto(
                        category,
                        averageRatingsByCategory.getOrDefault(category.getId(), 0.0)
                ))
                .toList();
    }

    @Override
    public CategoryResponseDto findById(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Kategori bulunamadi, id: " + id));

        Double averageRating = productRepository.findAverageRatingByCategoryId(id);
        return categoryMapper.toResponseDto(category, normalizeRating(averageRating));
    }

    private Double normalizeRating(Double rating) {
        if (rating == null || rating.isNaN() || rating.isInfinite()) {
            return 0.0;
        }

        return Math.round(rating * 100.0) / 100.0;
    }
}
