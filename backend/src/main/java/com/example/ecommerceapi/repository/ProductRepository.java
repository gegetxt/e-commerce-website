package com.example.ecommerceapi.repository;

import com.example.ecommerceapi.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    interface CategoryRatingAverage {
        Long getCategoryId();

        Double getAverageRating();
    }

    @Query("SELECT p.category.id AS categoryId, AVG(p.rating) AS averageRating " +
            "FROM Product p GROUP BY p.category.id")
    List<CategoryRatingAverage> findAverageRatingsByCategory();

    @Query("SELECT COALESCE(AVG(p.rating), 0.0) FROM Product p WHERE p.category.id = :categoryId")
    Double findAverageRatingByCategoryId(@Param("categoryId") Long categoryId);

    @Query("SELECT p FROM Product p WHERE " +
            "(:categoryId IS NULL OR p.category.id = :categoryId) AND " +
            "(:filter IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', CAST(:filter AS string), '%')) " +
            "OR LOWER(p.description) LIKE LOWER(CONCAT('%', CAST(:filter AS string), '%')))")
    List<Product> findWithFilters(
            @Param("categoryId") Long categoryId,
            @Param("filter") String filter,
            Pageable pageable
    );

    @Query("SELECT COUNT(p) FROM Product p WHERE " +
            "(:categoryId IS NULL OR p.category.id = :categoryId) AND " +
            "(:filter IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', CAST(:filter AS string), '%')) " +
            "OR LOWER(p.description) LIKE LOWER(CONCAT('%', CAST(:filter AS string), '%')))")
    long countWithFilters(
            @Param("categoryId") Long categoryId,
            @Param("filter") String filter
    );

    Optional<Product> findById(Long id);
}
