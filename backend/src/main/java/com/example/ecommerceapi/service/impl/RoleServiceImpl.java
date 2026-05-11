package com.example.ecommerceapi.service.impl;

import com.example.ecommerceapi.dto.response.RoleResponse;
import com.example.ecommerceapi.repository.RoleRepository;
import com.example.ecommerceapi.service.RoleService;
import com.example.ecommerceapi.util.mapper.RoleMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    public RoleServiceImpl(RoleRepository roleRepository, RoleMapper roleMapper) {
        this.roleRepository = roleRepository;
        this.roleMapper = roleMapper;
    }

    @Override
    public List<RoleResponse> getAllRoles() {
        return roleRepository.findAll().stream().map(roleMapper::toResponse).toList();
    }
}
