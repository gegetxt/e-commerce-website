package com.example.ecommerceapi;

import com.example.ecommerceapi.dto.response.CategoryResponseDto;
import com.example.ecommerceapi.entity.Category;
import com.example.ecommerceapi.repository.CategoryRepository;
import com.example.ecommerceapi.repository.ProductRepository;
import com.example.ecommerceapi.service.impl.CategoryServiceImpl;
import com.example.ecommerceapi.util.mapper.CategoryMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CategoryServiceImplTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ProductRepository productRepository;

    @Spy
    private CategoryMapper categoryMapper;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    @Test
    void findAllUsesProductAverageRatingWithoutChangingResponseShape() {
        Category shoes = category(1L, "Ayakkabi", "e:ayakkabi", "e", 4.9);
        Category jackets = category(2L, "Ceket", "e:ceket", "e", 3.8);

        when(categoryRepository.findAll()).thenReturn(List.of(shoes, jackets));
        when(productRepository.findAverageRatingsByCategory()).thenReturn(List.of(
                average(1L, 4.255)
        ));

        List<CategoryResponseDto> result = categoryService.findAll();

        assertEquals(2, result.size());
        assertEquals(1L, result.get(0).id());
        assertEquals("e:ayakkabi", result.get(0).code());
        assertEquals("Ayakkabi", result.get(0).title());
        assertEquals(4.26, result.get(0).rating());
        assertEquals("e", result.get(0).gender());
        assertEquals(0.0, result.get(1).rating());
    }

    private Category category(Long id, String title, String code, String gender, Double rating) {
        Category category = new Category();
        category.setId(id);
        category.setTitle(title);
        category.setCode(code);
        category.setGender(gender);
        category.setRating(rating);
        category.setImg("/category.png");
        return category;
    }

    private ProductRepository.CategoryRatingAverage average(Long categoryId, Double averageRating) {
        return new ProductRepository.CategoryRatingAverage() {
            @Override
            public Long getCategoryId() {
                return categoryId;
            }

            @Override
            public Double getAverageRating() {
                return averageRating;
            }
        };
    }
}
