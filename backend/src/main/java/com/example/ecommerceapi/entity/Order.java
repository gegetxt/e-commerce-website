package com.example.ecommerceapi.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "id")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private String status;

    // Kart bilgileri snapshot olarak saklaniyor
    // Kart silinse bile siparis gecmisi korunsun diye
    // PCI-DSS gereği CVV saklanmiyor
    @Column(name = "card_no", nullable = false)
    @ToString.Exclude
    private String cardNo;

    @Column(name = "card_name", nullable = false)
    private String cardName;

    @Column(name = "card_expire_month", nullable = false)
    private Integer cardExpireMonth;

    @Column(name = "card_expire_year", nullable = false)
    private Integer cardExpireYear;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "address_id")
    private Address address;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();
}
