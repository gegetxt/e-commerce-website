package com.example.ecommerceapi.repository;

import com.example.ecommerceapi.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}