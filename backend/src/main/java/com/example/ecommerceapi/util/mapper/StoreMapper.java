package com.example.ecommerceapi.util.mapper;

import com.example.ecommerceapi.dto.response.StoreResponse;
import com.example.ecommerceapi.entity.Store;
import org.springframework.stereotype.Component;

@Component
public class StoreMapper {

    public StoreResponse toResponse(Store store) {
        if (store == null) {
            return null;
        }

        StoreResponse response = new StoreResponse();
        response.setId(store.getId());
        response.setName(store.getName());
        response.setPhone(store.getPhone());
        response.setTaxNo(store.getTaxNo());
        response.setBankAccount(store.getBankAccount());
        response.setApproved(store.isApproved());
        return response;
    }
}
