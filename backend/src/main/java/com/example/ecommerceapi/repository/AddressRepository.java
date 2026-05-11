package com.example.ecommerceapi.repository;

import com.example.ecommerceapi.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {

    @Query("SELECT a FROM Address a WHERE a.user.id = :userId ORDER BY a.id DESC")
    List<Address> findByUserIdOrderByIdDesc(@Param("userId") Long userId);

    @Query("SELECT a FROM Address a WHERE a.id = :id AND a.user.id = :userId")
    Optional<Address> findByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);
}