package com.techtitans.Manufacturing.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@Table(name = "work_centers")
public class WorkCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private Double costPerHour;

    private Boolean active = true;

    @OneToMany(mappedBy = "workCenter")
    private List<WorkOrder> workOrders;
}