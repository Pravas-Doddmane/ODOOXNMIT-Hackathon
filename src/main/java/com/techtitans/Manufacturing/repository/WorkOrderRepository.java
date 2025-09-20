package com.techtitans.Manufacturing.repository;

import com.techtitans.Manufacturing.entity.WorkOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {
    List<WorkOrder> findByManufacturingOrderId(Long manufacturingOrderId);
    List<WorkOrder> findByOperatorId(Long operatorId);
    List<WorkOrder> findByStatus(String status);
}