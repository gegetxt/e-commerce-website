package com.example.ecommerceapi.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EcommerceErrorResponse {

    private String message;
    private Integer status;
    private Long timestamp;
    private LocalDateTime localDateTime;
}