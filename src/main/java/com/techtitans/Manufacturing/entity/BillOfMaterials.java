package com.techtitans.Manufacturing.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@Table(name = "bill_of_materials")
public class BillOfMaterials {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String productName;

    private String description;

    @OneToMany(mappedBy = "bom", cascade = CascadeType.ALL)
    private List<BOMItem> items;

    @OneToMany(mappedBy = "bom")
    private List<ManufacturingOrder> manufacturingOrders;
}