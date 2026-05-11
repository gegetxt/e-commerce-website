package com.example.ecommerceapi.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "credit_cards")

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "id")
public class CreditCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    @NotEmpty
    @Size(max = 100)
    @Column(name = "name_on_card", nullable = false)
    private String nameOnCard;

    @NotNull
    @NotBlank
    @NotEmpty
    @Size(max = 20)
    @Column(name = "card_no", nullable = false)
    @ToString.Exclude
    private String cardNo;

    @NotNull
    @Min(1)
    @Max(12)
    @Column(name = "expire_month", nullable = false)
    private Integer expireMonth;

    @NotNull
    @Min(2024)
    @Column(name = "expire_year", nullable = false)
    private Integer expireYear;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;
}
