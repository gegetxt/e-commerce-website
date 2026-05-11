package com.example.ecommerceapi.service;

import com.example.ecommerceapi.dto.request.OrderRequestDto;
import com.example.ecommerceapi.dto.response.OrderResponseDto;

import java.util.List;

public interface OrderService {

    List<OrderResponseDto> getAllForCurrentUser();

    OrderResponseDto create(OrderRequestDto orderRequestDto);
}