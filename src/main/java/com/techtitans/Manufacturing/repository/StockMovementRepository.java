package com.techtitans.Manufacturing.repository;

import com.techtitans.Manufacturing.entity.StockMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StockMovementRepository extends JpaRepository<StockMovement, Long> {
    List<StockMovement> findByProductName(String productName);
    List<StockMovement> findByMovementType(String movementType);
}