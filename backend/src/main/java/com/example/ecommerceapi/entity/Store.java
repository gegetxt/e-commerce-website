package com.example.ecommerceapi.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "stores")

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "id")
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    @Column(name = "tax_no", nullable = false, unique = true)
    private String taxNo;

    @Column(name = "bank_account", nullable = false)
    private String bankAccount;

    @Column(nullable = false)
    private boolean approved;

    @OneToOne(mappedBy = "store")
    @ToString.Exclude  // Sirkuler ToString'i engelliyoruz - Store -> User -> Store sonsuz dongu olur
    private User user;
}