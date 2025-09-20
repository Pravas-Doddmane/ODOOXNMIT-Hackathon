package com.techtitans.Manufacturing.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "bom_items")
public class BOMItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String componentName;

    @Column(nullable = false)
    private Double quantity;

    private String unit;

    @ManyToOne
    @JoinColumn(name = "bom_id")
    private BillOfMaterials bom;
}