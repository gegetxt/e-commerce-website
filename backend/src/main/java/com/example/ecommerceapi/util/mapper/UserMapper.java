package com.example.ecommerceapi.util.mapper;

import com.example.ecommerceapi.dto.response.UserResponse;
import com.example.ecommerceapi.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    private final RoleMapper roleMapper;
    private final StoreMapper storeMapper;

    public UserMapper(RoleMapper roleMapper, StoreMapper storeMapper) {
        this.roleMapper = roleMapper;
        this.storeMapper = storeMapper;
    }

    public UserResponse toResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRoleId(user.getRole().getId());
        response.setRole(roleMapper.toResponse(user.getRole()));
        response.setStore(storeMapper.toResponse(user.getStore()));
        return response;
    }
}
