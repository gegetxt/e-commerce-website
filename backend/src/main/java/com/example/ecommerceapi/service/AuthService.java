package com.example.ecommerceapi.service;

import com.example.ecommerceapi.dto.request.LoginRequest;
import com.example.ecommerceapi.dto.request.SignupRequest;
import com.example.ecommerceapi.dto.response.LoginResponseDto;
import com.example.ecommerceapi.dto.response.SignupResponseDto;
import com.example.ecommerceapi.dto.response.VerifyResponseDto;

public interface AuthService {

    SignupResponseDto signup(SignupRequest request);

    LoginResponseDto login(LoginRequest request);

    VerifyResponseDto verify(String token);
}