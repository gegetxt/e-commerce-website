package com.example.ecommerceapi.service.impl;

import com.example.ecommerceapi.dto.request.AddressRequestDto;
import com.example.ecommerceapi.dto.request.AddressUpdateRequestDto;
import com.example.ecommerceapi.dto.response.AddressResponseDto;
import com.example.ecommerceapi.entity.Address;
import com.example.ecommerceapi.entity.User;
import com.example.ecommerceapi.exception.AddressNotFoundException;
import com.example.ecommerceapi.repository.AddressRepository;
import com.example.ecommerceapi.service.AddressService;
import com.example.ecommerceapi.util.mapper.AddressMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private AddressMapper addressMapper;

    @Autowired
    private CurrentUserProvider currentUserProvider;

    @Override
    public Map<String, AddressResponseDto> getAllForCurrentUser() {

        User user = currentUserProvider.getCurrentUser();

        List<Address> addresses = addressRepository.findByUserIdOrderByIdDesc(user.getId());

        // Hocanin istegi uzerine workintech format: { "0": {...}, "1": {...} }
        // List yerine indekslenmis bir Map donuyoruz
        Map<String, AddressResponseDto> result = new LinkedHashMap<>();
        for (int i = 0; i < addresses.size(); i++) {
            result.put(String.valueOf(i), addressMapper.toResponseDto(addresses.get(i)));
        }

        return result;
    }

    @Override
    public AddressResponseDto create(AddressRequestDto addressRequestDto) {

        User user = currentUserProvider.getCurrentUser();

        // DTO'dan entity uretiyoruz
        Address address = addressMapper.toEntity(addressRequestDto);

        // Hangi kullaniciya ait oldugunu set ediyoruz
        address.setUser(user);

        // Veritabanina kayit
        addressRepository.save(address);

        return addressMapper.toResponseDto(address);
    }

    @Override
    public AddressResponseDto update(AddressUpdateRequestDto addressUpdateRequestDto) {

        User user = currentUserProvider.getCurrentUser();

        // Once adresi bul, sahiplik kontrolu yap
        Address addressToUpdate = addressRepository
                .findByIdAndUserId(addressUpdateRequestDto.id(), user.getId())
                .orElseThrow(() -> new AddressNotFoundException("Adres bulunamadi, id: " + addressUpdateRequestDto.id()));

        // Mapper null olmayan alanlari kopyaliyor
        addressMapper.updateEntity(addressToUpdate, addressUpdateRequestDto);

        addressRepository.save(addressToUpdate);

        return addressMapper.toResponseDto(addressToUpdate);
    }

    @Override
    public void deleteById(Long id) {

        User user = currentUserProvider.getCurrentUser();

        // Sadece kendi adresini silebilir
        Address address = addressRepository
                .findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new AddressNotFoundException("Adres bulunamadi, id: " + id));

        addressRepository.delete(address);
    }
}