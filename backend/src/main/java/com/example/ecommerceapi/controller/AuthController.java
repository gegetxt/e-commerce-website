package com.example.ecommerceapi.controller;

import com.example.ecommerceapi.dto.request.LoginRequest;
import com.example.ecommerceapi.dto.request.SignupRequest;
import com.example.ecommerceapi.dto.response.LoginResponseDto;
import com.example.ecommerceapi.dto.response.SignupResponseDto;
import com.example.ecommerceapi.dto.response.VerifyResponseDto;
import com.example.ecommerceapi.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping({"/signup", "/auth/signup"})
    @ResponseStatus(HttpStatus.CREATED)
    public SignupResponseDto signup(@Valid @RequestBody SignupRequest request) {
        return authService.signup(request);
    }

    @PostMapping({"/login", "/auth/login"})
    public LoginResponseDto login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping({"/verify", "/auth/verify"})
    public VerifyResponseDto verify(@RequestHeader(value = "Authorization", required = false) String token) {
        return authService.verify(token);
    }
}