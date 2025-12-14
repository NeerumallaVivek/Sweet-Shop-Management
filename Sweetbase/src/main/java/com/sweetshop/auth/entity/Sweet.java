package com.sweetshop.auth.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Sweet Entity
 * Represents a sweet item in the inventory
 */
@Entity
@Table(name = "sweets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sweet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sweetId")
    private Integer sweetId;

    @Column(name = "sweetName", nullable = false)
    private String sweetName;

    @Column(name = "sweetCategory")
    private String sweetCategory;

    @Column(name = "sweetPrice", nullable = false)
    private Double sweetPrice;

    @Column(name = "stockQuantity", nullable = false)
    private Integer stockQuantity;

    // Optional: for storing icon/image url since used in frontend
    @Column(name = "sweetImage")
    private String sweetImage;
}
