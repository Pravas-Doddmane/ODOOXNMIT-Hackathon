package com.techtitans.Manufacturing.controller;

import com.techtitans.Manufacturing.entity.StockMovement;
import com.techtitans.Manufacturing.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stock")
@CrossOrigin(origins = "*")
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping("/movements")
    public List<StockMovement> getAllStockMovements() {
        return stockService.getAllStockMovements();
    }

    @GetMapping("/movements/{id}")
    public ResponseEntity<StockMovement> getStockMovementById(@PathVariable Long id) {
        Optional<StockMovement> stockMovement = stockService.getStockMovementById(id);
        return stockMovement.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/movements")
    public StockMovement createStockMovement(@RequestBody StockMovement stockMovement) {
        return stockService.createStockMovement(stockMovement);
    }

    @GetMapping("/movements/product/{productName}")
    public List<StockMovement> getStockMovementsByProduct(@PathVariable String productName) {
        return stockService.getStockMovementsByProduct(productName);
    }

    @GetMapping("/movements/type/{movementType}")
    public List<StockMovement> getStockMovementsByType(@PathVariable String movementType) {
        return stockService.getStockMovementsByType(movementType);
    }

    @GetMapping("/current/{productName}")
    public Double getCurrentStock(@PathVariable String productName) {
        return stockService.getCurrentStock(productName);
    }
}