package com.example.ecommerceapi.service.impl;

import com.example.ecommerceapi.dto.request.LoginRequest;
import com.example.ecommerceapi.dto.request.SignupRequest;
import com.example.ecommerceapi.dto.response.LoginResponseDto;
import com.example.ecommerceapi.dto.response.SignupResponseDto;
import com.example.ecommerceapi.dto.response.VerifyResponseDto;
import com.example.ecommerceapi.entity.Role;
import com.example.ecommerceapi.entity.Store;
import com.example.ecommerceapi.entity.User;
import com.example.ecommerceapi.exception.DuplicateResourceException;
import com.example.ecommerceapi.exception.EcommerceException;
import com.example.ecommerceapi.exception.InvalidCredentialsException;
import com.example.ecommerceapi.repository.RoleRepository;
import com.example.ecommerceapi.repository.UserRepository;
import com.example.ecommerceapi.security.JwtService;
import com.example.ecommerceapi.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private static final String STORE_ROLE_CODE = "store";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Override
    @Transactional
    public SignupResponseDto signup(SignupRequest request) {

        // Email zaten kayitli mi kontrol
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new DuplicateResourceException("Bu email adresi zaten kullaniliyor");
        }

        // Rol bulunamazsa hata
        Role role = roleRepository.findById(request.roleId())
                .orElseThrow(() -> new EcommerceException("Secilen rol bulunamadi", HttpStatus.NOT_FOUND));

        // Yeni user olustur
        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(role);
        user.setActive(true);

        // STORE rolu ise magaza bilgilerini de ekle
        if (STORE_ROLE_CODE.equalsIgnoreCase(role.getCode())) {
            user.setStore(buildStoreFromRequest(request));
        }

        userRepository.save(user);

        return new SignupResponseDto("User created. Check your email for activation instructions.");
    }

    @Override
    public LoginResponseDto login(LoginRequest request) {

        User user = userRepository.findByEmailIgnoreCase(request.email())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponseDto(
                token,
                user.getName(),
                user.getEmail(),
                String.valueOf(user.getRole().getId())
        );
    }

    @Override
    public VerifyResponseDto verify(String token) {

        if (token == null || token.isBlank() || !jwtService.isTokenValid(token)) {
            throw new InvalidCredentialsException("Token is invalid");
        }

        String email = jwtService.extractEmail(token);
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new InvalidCredentialsException("User could not be found"));

        // Yeni token urettik (refresh)
        String newToken = jwtService.generateToken(user.getEmail());

        return new VerifyResponseDto(
                user.getName(),
                user.getEmail(),
                String.valueOf(user.getRole().getId()),
                newToken
        );
    }

    // Magaza signup'unda magaza objesi olustur
    private Store buildStoreFromRequest(SignupRequest request) {

        if (request.store() == null) {
            throw new EcommerceException("Magaza bilgileri zorunludur", HttpStatus.BAD_REQUEST);
        }

        Store store = new Store();
        store.setName(request.store().name());
        store.setPhone(request.store().phone());
        store.setTaxNo(request.store().taxNo());
        store.setBankAccount(request.store().bankAccount());
        store.setApproved(true);

        return store;
    }
}