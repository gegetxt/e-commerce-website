package com.example.ecommerceapi.util.mapper;

import com.example.ecommerceapi.dto.response.RoleResponse;
import com.example.ecommerceapi.entity.Role;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper {

    public RoleResponse toResponse(Role role) {
        RoleResponse response = new RoleResponse();
        response.setId(role.getId());
        response.setName(role.getName());
        response.setCode(role.getCode());
        return response;
    }
}
