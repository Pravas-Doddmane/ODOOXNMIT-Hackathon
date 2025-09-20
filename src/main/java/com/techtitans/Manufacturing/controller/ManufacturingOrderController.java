package com.techtitans.Manufacturing.controller;

import com.techtitans.Manufacturing.entity.ManufacturingOrder;
import com.techtitans.Manufacturing.service.ManufacturingOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/manufacturing-orders")
@CrossOrigin(origins = "*")
public class ManufacturingOrderController {

    @Autowired
    private ManufacturingOrderService manufacturingOrderService;

    @GetMapping
    public List<ManufacturingOrder> getAllManufacturingOrders() {
        return manufacturingOrderService.getAllManufacturingOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ManufacturingOrder> getManufacturingOrderById(@PathVariable Long id) {
        Optional<ManufacturingOrder> manufacturingOrder = manufacturingOrderService.getManufacturingOrderById(id);
        return manufacturingOrder.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ManufacturingOrder createManufacturingOrder(@RequestBody ManufacturingOrder manufacturingOrder) {
        return manufacturingOrderService.createManufacturingOrder(manufacturingOrder);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ManufacturingOrder> updateManufacturingOrder(@PathVariable Long id, @RequestBody ManufacturingOrder manufacturingOrderDetails) {
        ManufacturingOrder updatedManufacturingOrder = manufacturingOrderService.updateManufacturingOrder(id, manufacturingOrderDetails);
        if (updatedManufacturingOrder != null) {
            return ResponseEntity.ok(updatedManufacturingOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteManufacturingOrder(@PathVariable Long id) {
        boolean deleted = manufacturingOrderService.deleteManufacturingOrder(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/status/{status}")
    public List<ManufacturingOrder> getManufacturingOrdersByStatus(@PathVariable String status) {
        return manufacturingOrderService.getManufacturingOrdersByStatus(status);
    }

    @GetMapping("/assignee/{assigneeId}")
    public List<ManufacturingOrder> getManufacturingOrdersByAssignee(@PathVariable Long assigneeId) {
        return manufacturingOrderService.getManufacturingOrdersByAssignee(assigneeId);
    }
}