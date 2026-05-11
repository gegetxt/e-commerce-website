package com.example.ecommerceapi.util.mapper;

import com.example.ecommerceapi.dto.response.OrderItemResponseDto;
import com.example.ecommerceapi.dto.response.OrderResponseDto;
import com.example.ecommerceapi.entity.Order;
import com.example.ecommerceapi.entity.OrderItem;
import com.example.ecommerceapi.entity.Product;
import com.example.ecommerceapi.entity.ProductImage;
import com.example.ecommerceapi.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

@Component
public class OrderMapper {

    @Autowired
    private ProductRepository productRepository;


    public OrderResponseDto toResponseDto(Order order){

        List<OrderItemResponseDto> products = order.getItems()
                .stream()
                .map(this::toItemResponseDto)
                .toList();

        return new OrderResponseDto(
                order.getId(),
                order.getUser().getId(),
                order.getAddress().getId(),
                order.getOrderDate(),
                order.getCardNo(),
                order.getCardName(),
                order.getCardExpireMonth(),
                order.getCardExpireYear(),
                order.getPrice(),
                products
        );
    }

    public OrderItemResponseDto toItemResponseDto(OrderItem orderItem){

        // Workintech format: full urun bilgisi donuyor
        // OrderItem snapshot'i + canli Product bilgisi (description, images)
        Product product = productRepository.findById(orderItem.getProductId()).orElse(null);

        String description = product != null ? product.getDescription() : "";
        List<OrderItemResponseDto.OrderItemImageDto> images = product != null
                ? product.getImages().stream()
                .map(this::toImageDto)
                .toList()
                : Collections.emptyList();

        return new OrderItemResponseDto(
                orderItem.getProductId(),         // workintech "id" = product id
                orderItem.getName(),              // snapshot - urun ismi degisse bile siparis korunuyor
                description,                      // canli - urun silindiyse bos
                orderItem.getPrice(),             // snapshot - siparis anindaki fiyat
                orderItem.getCount(),
                images                            // canli - urun silindiyse bos liste
        );
    }

    private OrderItemResponseDto.OrderItemImageDto toImageDto(ProductImage image){

        return new OrderItemResponseDto.OrderItemImageDto(
                image.getUrl(),
                image.getImageIndex()
        );
    }
}