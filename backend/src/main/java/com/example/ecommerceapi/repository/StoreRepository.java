package com.example.ecommerceapi.repository;

import com.example.ecommerceapi.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {
}
