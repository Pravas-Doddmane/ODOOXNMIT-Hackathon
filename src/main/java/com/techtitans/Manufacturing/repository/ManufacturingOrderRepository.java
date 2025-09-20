package com.techtitans.Manufacturing.repository;

import com.techtitans.Manufacturing.entity.ManufacturingOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ManufacturingOrderRepository extends JpaRepository<ManufacturingOrder, Long> {
    List<ManufacturingOrder> findByStatus(String status);
    List<ManufacturingOrder> findByAssigneeId(Long assigneeId);
}