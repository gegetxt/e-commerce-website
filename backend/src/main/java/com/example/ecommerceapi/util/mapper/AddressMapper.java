package com.example.ecommerceapi.util.mapper;

import com.example.ecommerceapi.dto.request.AddressRequestDto;
import com.example.ecommerceapi.dto.request.AddressUpdateRequestDto;
import com.example.ecommerceapi.dto.response.AddressResponseDto;
import com.example.ecommerceapi.entity.Address;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {


    public AddressResponseDto toResponseDto(Address address){

        return new AddressResponseDto(
                address.getId(),
                address.getTitle(),
                address.getName(),
                address.getSurname(),
                address.getPhone(),
                address.getCity(),
                address.getDistrict(),
                address.getNeighborhood(),
                address.getAddress()
        );
    }

    public Address toEntity(AddressRequestDto addressRequestDto){

        Address address = new Address();
        address.setTitle(addressRequestDto.title());
        address.setName(addressRequestDto.name());
        address.setSurname(addressRequestDto.surname());
        address.setPhone(addressRequestDto.phone());
        address.setCity(addressRequestDto.city());
        address.setDistrict(addressRequestDto.district());
        address.setNeighborhood(addressRequestDto.neighborhood());
        address.setAddress(addressRequestDto.address());

        return address;
    }

    public void updateEntity(Address addressToUpdate, AddressUpdateRequestDto addressUpdateRequestDto){

        // Sadece null olmayan alanlari guncelliyoruz
        // Boylece istemci sadece degistirmek istedigi alanlari gonderebilir
        if(addressUpdateRequestDto.title() != null)
            addressToUpdate.setTitle(addressUpdateRequestDto.title());

        if(addressUpdateRequestDto.name() != null)
            addressToUpdate.setName(addressUpdateRequestDto.name());

        if(addressUpdateRequestDto.surname() != null)
            addressToUpdate.setSurname(addressUpdateRequestDto.surname());

        if(addressUpdateRequestDto.phone() != null)
            addressToUpdate.setPhone(addressUpdateRequestDto.phone());

        if(addressUpdateRequestDto.city() != null)
            addressToUpdate.setCity(addressUpdateRequestDto.city());

        if(addressUpdateRequestDto.district() != null)
            addressToUpdate.setDistrict(addressUpdateRequestDto.district());

        if(addressUpdateRequestDto.neighborhood() != null)
            addressToUpdate.setNeighborhood(addressUpdateRequestDto.neighborhood());

        if(addressUpdateRequestDto.address() != null)
            addressToUpdate.setAddress(addressUpdateRequestDto.address());
    }
}