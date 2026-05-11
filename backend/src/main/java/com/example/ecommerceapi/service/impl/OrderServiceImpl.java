package com.example.ecommerceapi.service.impl;

import com.example.ecommerceapi.dto.request.OrderItemRequestDto;
import com.example.ecommerceapi.dto.request.OrderRequestDto;
import com.example.ecommerceapi.dto.response.OrderResponseDto;
import com.example.ecommerceapi.entity.Address;
import com.example.ecommerceapi.entity.Order;
import com.example.ecommerceapi.entity.OrderItem;
import com.example.ecommerceapi.entity.Product;
import com.example.ecommerceapi.entity.User;
import com.example.ecommerceapi.exception.AddressNotFoundException;
import com.example.ecommerceapi.exception.EcommerceException;
import com.example.ecommerceapi.exception.InsufficientStockException;
import com.example.ecommerceapi.repository.AddressRepository;
import com.example.ecommerceapi.repository.OrderRepository;
import com.example.ecommerceapi.repository.ProductRepository;
import com.example.ecommerceapi.service.OrderService;
import com.example.ecommerceapi.util.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private CurrentUserProvider currentUserProvider;

    @Override
    public List<OrderResponseDto> getAllForCurrentUser() {

        User user = currentUserProvider.getCurrentUser();

        return orderRepository.findByUserIdOrderByIdDesc(user.getId())
                .stream()
                .map(orderMapper::toResponseDto)
                .toList();
    }

    @Override
    @Transactional
    public OrderResponseDto create(OrderRequestDto orderRequestDto) {

        User user = currentUserProvider.getCurrentUser();

        Address address = addressRepository
                .findByIdAndUserId(orderRequestDto.addressId(), user.getId())
                .orElseThrow(() -> new AddressNotFoundException("Adres bulunamadi, id: " + orderRequestDto.addressId()));

        Order order = new Order();
        order.setOrderDate(orderRequestDto.orderDate());
        order.setPrice(orderRequestDto.price());
        order.setStatus("CREATED");
        order.setCardNo(orderRequestDto.cardNo());
        order.setCardName(orderRequestDto.cardName());
        order.setCardExpireMonth(orderRequestDto.cardExpireMonth());
        order.setCardExpireYear(orderRequestDto.cardExpireYear());
        order.setAddress(address);
        order.setUser(user);

        for (OrderItemRequestDto itemDto : orderRequestDto.products()) {

            Product product = productRepository.findById(itemDto.productId())
                    .orElseThrow(() -> new EcommerceException(
                            "Urun bulunamadi, id: " + itemDto.productId(),
                            HttpStatus.NOT_FOUND));

            if (product.getStock() < itemDto.count()) {
                throw new InsufficientStockException(
                        "Yetersiz stok: " + product.getName() + " (mevcut: " + product.getStock() + ")");
            }

            product.setStock(product.getStock() - itemDto.count());
            product.setSellCount(product.getSellCount() + itemDto.count());
            productRepository.save(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(product.getId());
            orderItem.setCount(itemDto.count());
            orderItem.setDetail(itemDto.detail());
            orderItem.setName(product.getName());
            orderItem.setPrice(product.getPrice());
            orderItem.setOrder(order);

            order.getItems().add(orderItem);
        }

        orderRepository.save(order);

        return orderMapper.toResponseDto(order);
    }
}