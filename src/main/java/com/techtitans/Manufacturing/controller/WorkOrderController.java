package com.techtitans.Manufacturing.controller;

import com.techtitans.Manufacturing.entity.WorkOrder;
import com.techtitans.Manufacturing.service.WorkOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/work-orders")
@CrossOrigin(origins = "*")
public class WorkOrderController {

    @Autowired
    private WorkOrderService workOrderService;

    @GetMapping
    public List<WorkOrder> getAllWorkOrders() {
        return workOrderService.getAllWorkOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkOrder> getWorkOrderById(@PathVariable Long id) {
        Optional<WorkOrder> workOrder = workOrderService.getWorkOrderById(id);
        return workOrder.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public WorkOrder createWorkOrder(@RequestBody WorkOrder workOrder) {
        return workOrderService.createWorkOrder(workOrder);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkOrder> updateWorkOrder(@PathVariable Long id, @RequestBody WorkOrder workOrderDetails) {
        WorkOrder updatedWorkOrder = workOrderService.updateWorkOrder(id, workOrderDetails);
        if (updatedWorkOrder != null) {
            return ResponseEntity.ok(updatedWorkOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWorkOrder(@PathVariable Long id) {
        boolean deleted = workOrderService.deleteWorkOrder(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/manufacturing-order/{manufacturingOrderId}")
    public List<WorkOrder> getWorkOrdersByManufacturingOrder(@PathVariable Long manufacturingOrderId) {
        return workOrderService.getWorkOrdersByManufacturingOrder(manufacturingOrderId);
    }

    @GetMapping("/operator/{operatorId}")
    public List<WorkOrder> getWorkOrdersByOperator(@PathVariable Long operatorId) {
        return workOrderService.getWorkOrdersByOperator(operatorId);
    }

    @GetMapping("/status/{status}")
    public List<WorkOrder> getWorkOrdersByStatus(@PathVariable String status) {
        return workOrderService.getWorkOrdersByStatus(status);
    }

    @PostMapping("/{id}/start")
    public ResponseEntity<WorkOrder> startWorkOrder(@PathVariable Long id) {
        WorkOrder workOrder = workOrderService.startWorkOrder(id);
        if (workOrder != null) {
            return ResponseEntity.ok(workOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<WorkOrder> completeWorkOrder(@PathVariable Long id) {
        WorkOrder workOrder = workOrderService.completeWorkOrder(id);
        if (workOrder != null) {
            return ResponseEntity.ok(workOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}