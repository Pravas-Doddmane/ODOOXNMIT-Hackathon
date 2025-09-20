package com.techtitans.Manufacturing.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "stock_movements")
public class StockMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private String movementType; // IN, OUT

    @Column(nullable = false)
    private Double quantity;

    private String reference; // MO number, WO number, etc.

    private LocalDateTime movementDate;

    @PrePersist
    protected void onCreate() {
        movementDate = LocalDateTime.now();
    }
}