package com.techtitans.Manufacturing.service;

import com.techtitans.Manufacturing.entity.StockMovement;
import com.techtitans.Manufacturing.repository.StockMovementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    @Autowired
    private StockMovementRepository stockMovementRepository;

    public List<StockMovement> getAllStockMovements() {
        return stockMovementRepository.findAll();
    }

    public Optional<StockMovement> getStockMovementById(Long id) {
        return stockMovementRepository.findById(id);
    }

    public StockMovement createStockMovement(StockMovement stockMovement) {
        return stockMovementRepository.save(stockMovement);
    }

    public List<StockMovement> getStockMovementsByProduct(String productName) {
        return stockMovementRepository.findByProductName(productName);
    }

    public List<StockMovement> getStockMovementsByType(String movementType) {
        return stockMovementRepository.findByMovementType(movementType);
    }

    public Double getCurrentStock(String productName) {
        List<StockMovement> movements = stockMovementRepository.findByProductName(productName);
        double stock = 0;
        for (StockMovement movement : movements) {
            if ("IN".equals(movement.getMovementType())) {
                stock += movement.getQuantity();
            } else if ("OUT".equals(movement.getMovementType())) {
                stock -= movement.getQuantity();
            }
        }
        return stock;
    }
}