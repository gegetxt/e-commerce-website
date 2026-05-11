package com.example.ecommerceapi.service.impl;

import com.example.ecommerceapi.dto.response.ProductListResponseDto;
import com.example.ecommerceapi.dto.response.ProductResponseDto;
import com.example.ecommerceapi.entity.Product;
import com.example.ecommerceapi.exception.EcommerceException;
import com.example.ecommerceapi.exception.ProductNotFoundException;
import com.example.ecommerceapi.repository.ProductRepository;
import com.example.ecommerceapi.service.ProductService;
import com.example.ecommerceapi.util.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;

    // Sadece bu alanlara gore siralama yapilabilir - SQL injection korumasi
    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of("price", "rating");

    @Override
    public ProductListResponseDto findAll(Long categoryId, String filter, String sort, Integer limit, Integer offset) {

        // Default degerler
        if (limit == null || limit <= 0) limit = 25;
        if (offset == null || offset < 0) offset = 0;

        // Sort parse: "price:desc" -> Sort by price DESC
        Sort sortObj = parseSort(sort);

        // Pageable: offset/limit Spring Data tarafinda page * size mantigiyla calisir
        // Ama bizim offset bazli yontemimizi taklit etmek icin custom bir Pageable kullaniyoruz
        Pageable pageable = createPageable(offset, limit, sortObj);

        List<Product> products = productRepository.findWithFilters(categoryId, filter, pageable);
        long total = productRepository.countWithFilters(categoryId, filter);

        List<ProductResponseDto> productDtos = products.stream()
                .map(productMapper::toResponseDto)
                .toList();

        return new ProductListResponseDto(total, productDtos);
    }

    @Override
    public ProductResponseDto findById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Urun bulunamadi, id: " + id));

        return productMapper.toResponseDto(product);
    }

    // "price:asc" gibi bir stringi Spring Sort objesine cevirir
    private Sort parseSort(String sort) {

        if (sort == null || sort.isBlank()) {
            return Sort.unsorted();
        }

        String[] parts = sort.split(":");
        if (parts.length != 2) {
            throw new EcommerceException("Gecersiz sort format. Beklenen: 'field:asc' veya 'field:desc'", HttpStatus.BAD_REQUEST);
        }

        String field = parts[0].trim();
        String direction = parts[1].trim().toLowerCase();

        // Guvenlik: sadece izin verilen alanlara gore sirala
        if (!ALLOWED_SORT_FIELDS.contains(field)) {
            throw new EcommerceException("Bu alana gore siralama yapilamaz: " + field, HttpStatus.BAD_REQUEST);
        }

        if (!direction.equals("asc") && !direction.equals("desc")) {
            throw new EcommerceException("Yon 'asc' veya 'desc' olmali", HttpStatus.BAD_REQUEST);
        }

        return direction.equals("desc") ? Sort.by(field).descending() : Sort.by(field).ascending();
    }

    // Spring Data offset bazli sayfalama icin tam destek vermez
    // Bu yuzden offset/limit'ten page hesapliyoruz
    private Pageable createPageable(int offset, int limit, Sort sort) {

        int page = offset / limit;
        return PageRequest.of(page, limit, sort);
    }
}