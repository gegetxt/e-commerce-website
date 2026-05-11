package com.example.ecommerceapi.controller;

import com.example.ecommerceapi.dto.request.AddressRequestDto;
import com.example.ecommerceapi.dto.request.AddressUpdateRequestDto;
import com.example.ecommerceapi.dto.response.AddressResponseDto;
import com.example.ecommerceapi.service.AddressService;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping
    public Map<String, AddressResponseDto> getAll(){
        return addressService.getAllForCurrentUser();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)  // 201
    public AddressResponseDto create(@Validated @RequestBody AddressRequestDto addressRequestDto){

        return addressService.create(addressRequestDto);
    }

    @PutMapping
    public AddressResponseDto update(@Validated @RequestBody AddressUpdateRequestDto addressUpdateRequestDto){

        return addressService.update(addressUpdateRequestDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)  // 204
    public void deleteById(@Positive @PathVariable("id") Long id){

        addressService.deleteById(id);
    }
}