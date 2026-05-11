package com.example.ecommerceapi.service.impl;

import com.example.ecommerceapi.dto.request.CreditCardRequestDto;
import com.example.ecommerceapi.dto.request.CreditCardUpdateRequestDto;
import com.example.ecommerceapi.dto.response.CreditCardResponseDto;
import com.example.ecommerceapi.entity.CreditCard;
import com.example.ecommerceapi.entity.User;
import com.example.ecommerceapi.exception.CreditCardNotFoundException;
import com.example.ecommerceapi.repository.CreditCardRepository;
import com.example.ecommerceapi.service.CreditCardService;
import com.example.ecommerceapi.util.mapper.CreditCardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class CreditCardServiceImpl implements CreditCardService {

    @Autowired
    private CreditCardRepository creditCardRepository;

    @Autowired
    private CreditCardMapper creditCardMapper;

    @Autowired
    private CurrentUserProvider currentUserProvider;

    @Override
    public Map<String, CreditCardResponseDto> getAllForCurrentUser() {

        User user = currentUserProvider.getCurrentUser();

        List<CreditCard> creditCards = creditCardRepository.findByUserIdOrderByIdDesc(user.getId());

        // Workintech format: { "0": {...}, "1": {...} }
        Map<String, CreditCardResponseDto> result = new LinkedHashMap<>();
        for (int i = 0; i < creditCards.size(); i++) {
            result.put(String.valueOf(i), creditCardMapper.toResponseDto(creditCards.get(i)));
        }

        return result;
    }

    @Override
    public Map<String, CreditCardResponseDto> create(CreditCardRequestDto creditCardRequestDto) {

        User user = currentUserProvider.getCurrentUser();

        // DTO'dan entity uretiyoruz. cardCcv alani DTO'da yok, bu yuzden DB'ye gitmiyor.
        // Bu bilincli bir karar - PCI-DSS standardi CVV saklanmasini yasaklar.
        CreditCard creditCard = creditCardMapper.toEntity(creditCardRequestDto);

        creditCard.setUser(user);

        creditCardRepository.save(creditCard);

        // Tek kayit da workintech formatinda donulecek: { "0": {...} }
        return wrapAsIndexedMap(creditCardMapper.toResponseDto(creditCard));
    }

    @Override
    public Map<String, CreditCardResponseDto> update(CreditCardUpdateRequestDto creditCardUpdateRequestDto) {

        User user = currentUserProvider.getCurrentUser();

        // Once karti bul, sahiplik kontrolu yap
        CreditCard creditCardToUpdate = creditCardRepository
                .findByIdAndUserId(creditCardUpdateRequestDto.id(), user.getId())
                .orElseThrow(() -> new CreditCardNotFoundException("Kart bulunamadi, id: " + creditCardUpdateRequestDto.id()));

        creditCardMapper.updateEntity(creditCardToUpdate, creditCardUpdateRequestDto);

        creditCardRepository.save(creditCardToUpdate);

        return wrapAsIndexedMap(creditCardMapper.toResponseDto(creditCardToUpdate));
    }

    @Override
    public void deleteById(Long id) {

        User user = currentUserProvider.getCurrentUser();

        // Sadece kendi kartini silebilir
        CreditCard creditCard = creditCardRepository
                .findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new CreditCardNotFoundException("Kart bulunamadi, id: " + id));

        creditCardRepository.delete(creditCard);
    }

    // Tek kayit donen metodlar icin yardimci metod
    // Workintech format: { "0": {...} }
    private Map<String, CreditCardResponseDto> wrapAsIndexedMap(CreditCardResponseDto dto){

        Map<String, CreditCardResponseDto> result = new LinkedHashMap<>();
        result.put("0", dto);
        return result;
    }
}