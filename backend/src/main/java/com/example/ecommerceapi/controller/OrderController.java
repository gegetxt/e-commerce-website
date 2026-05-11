package com.example.ecommerceapi.controller;

import com.example.ecommerceapi.dto.request.OrderRequestDto;
import com.example.ecommerceapi.dto.response.OrderResponseDto;
import com.example.ecommerceapi.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<OrderResponseDto> getAll(){

        return orderService.getAllForCurrentUser();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponseDto create(@Validated @RequestBody OrderRequestDto orderRequestDto){

        return orderService.create(orderRequestDto);
    }
}