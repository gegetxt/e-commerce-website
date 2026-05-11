package com.example.ecommerceapi.util.mapper;

import com.example.ecommerceapi.dto.request.CreditCardRequestDto;
import com.example.ecommerceapi.dto.request.CreditCardUpdateRequestDto;
import com.example.ecommerceapi.dto.response.CreditCardResponseDto;
import com.example.ecommerceapi.entity.CreditCard;
import org.springframework.stereotype.Component;

@Component
public class CreditCardMapper {


    public CreditCardResponseDto toResponseDto(CreditCard creditCard){

        return new CreditCardResponseDto(
                creditCard.getId(),
                creditCard.getUser().getId(),
                creditCard.getNameOnCard(),
                creditCard.getCardNo(),
                creditCard.getExpireMonth(),
                creditCard.getExpireYear()
        );
    }

    public CreditCard toEntity(CreditCardRequestDto creditCardRequestDto){

        CreditCard creditCard = new CreditCard();
        creditCard.setNameOnCard(creditCardRequestDto.nameOnCard());
        creditCard.setCardNo(creditCardRequestDto.cardNo());
        creditCard.setExpireMonth(creditCardRequestDto.expireMonth());
        creditCard.setExpireYear(creditCardRequestDto.expireYear());

        return creditCard;
    }

    public void updateEntity(CreditCard creditCardToUpdate, CreditCardUpdateRequestDto creditCardUpdateRequestDto){

        // Sadece null olmayan alanlari guncelliyoruz
        if(creditCardUpdateRequestDto.nameOnCard() != null)
            creditCardToUpdate.setNameOnCard(creditCardUpdateRequestDto.nameOnCard());

        if(creditCardUpdateRequestDto.cardNo() != null)
            creditCardToUpdate.setCardNo(creditCardUpdateRequestDto.cardNo());

        if(creditCardUpdateRequestDto.expireMonth() != null)
            creditCardToUpdate.setExpireMonth(creditCardUpdateRequestDto.expireMonth());

        if(creditCardUpdateRequestDto.expireYear() != null)
            creditCardToUpdate.setExpireYear(creditCardUpdateRequestDto.expireYear());
    }
}
