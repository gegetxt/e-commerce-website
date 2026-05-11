package com.example.ecommerceapi.controller;

import com.example.ecommerceapi.dto.response.RoleResponse;
import com.example.ecommerceapi.service.RoleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/roles")
    public List<RoleResponse> getRoles() {
        return roleService.getAllRoles();
    }
}
