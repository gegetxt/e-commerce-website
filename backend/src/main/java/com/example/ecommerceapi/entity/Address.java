package com.example.ecommerceapi.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "addresses")

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "id")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    @NotEmpty
    @Size(max = 150)
    private String title;

    @NotNull
    @NotBlank
    @NotEmpty
    @Size(max = 100)
    private String name;

    @NotNull
    @NotBlank
    @NotEmpty
    @Size(max = 100)
    private String surname;

    @NotNull
    @NotBlank
    @NotEmpty
    @Size(max = 20)
    private String phone;

    @NotNull
    @NotBlank
    @NotEmpty
    @Size(max = 100)
    private String city;

    @NotNull
    @NotBlank
    @NotEmpty
    @Size(max = 100)
    private String district;

    @NotNull
    @NotBlank
    @NotEmpty
    @Size(max = 1000)
    private String neighborhood;

    @Size(max = 2000)
    @ToString.Exclude
    private String address;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;
}