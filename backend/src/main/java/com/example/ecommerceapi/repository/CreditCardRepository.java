package com.example.ecommerceapi.repository;

import com.example.ecommerceapi.entity.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {

    @Query("SELECT c FROM CreditCard c WHERE c.user.id = :userId ORDER BY c.id DESC")
    List<CreditCard> findByUserIdOrderByIdDesc(@Param("userId") Long userId);

    @Query("SELECT c FROM CreditCard c WHERE c.id = :id AND c.user.id = :userId")
    Optional<CreditCard> findByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);
}