package com.techtitans.Manufacturing.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "work_orders")
public class WorkOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private String status = "PENDING"; // PENDING, IN_PROGRESS, COMPLETED, CANCELLED

    private Integer duration; // in minutes

    @ManyToOne
    @JoinColumn(name = "manufacturing_order_id")
    private ManufacturingOrder manufacturingOrder;

    @ManyToOne
    @JoinColumn(name = "work_center_id")
    private WorkCenter workCenter;

    @ManyToOne
    @JoinColumn(name = "operator_id")
    private User operator;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

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