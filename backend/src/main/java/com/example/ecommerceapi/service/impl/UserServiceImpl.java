package com.example.ecommerceapi.service.impl;

import com.example.ecommerceapi.dto.response.UserResponse;
import com.example.ecommerceapi.service.UserService;
import com.example.ecommerceapi.util.mapper.UserMapper;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final CurrentUserProvider currentUserProvider;
    private final UserMapper userMapper;

    public UserServiceImpl(CurrentUserProvider currentUserProvider, UserMapper userMapper) {
        this.currentUserProvider = currentUserProvider;
        this.userMapper = userMapper;
    }

    @Override
    public UserResponse getCurrentUser() {
        return userMapper.toResponse(currentUserProvider.getCurrentUser());
    }
}
