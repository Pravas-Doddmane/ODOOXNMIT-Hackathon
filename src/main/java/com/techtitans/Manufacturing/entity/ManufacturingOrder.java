package com.techtitans.Manufacturing.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "manufacturing_orders")
public class ManufacturingOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private String status = "PLANNED"; // PLANNED, IN_PROGRESS, COMPLETED, CANCELLED

    private LocalDateTime startDate;

    private LocalDateTime deadline;

    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private User assignee;

    @ManyToOne
    @JoinColumn(name = "bom_id")
    private BillOfMaterials bom;

    @OneToMany(mappedBy = "manufacturingOrder", cascade = CascadeType.ALL)
    private List<WorkOrder> workOrders;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}