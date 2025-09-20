package com.techtitans.Manufacturing.service;

import com.techtitans.Manufacturing.entity.WorkOrder;
import com.techtitans.Manufacturing.repository.WorkOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class WorkOrderService {

    @Autowired
    private WorkOrderRepository workOrderRepository;

    public List<WorkOrder> getAllWorkOrders() {
        return workOrderRepository.findAll();
    }

    public Optional<WorkOrder> getWorkOrderById(Long id) {
        return workOrderRepository.findById(id);
    }

    public WorkOrder createWorkOrder(WorkOrder workOrder) {
        return workOrderRepository.save(workOrder);
    }

    public WorkOrder updateWorkOrder(Long id, WorkOrder workOrderDetails) {
        Optional<WorkOrder> workOrderOptional = workOrderRepository.findById(id);
        if (workOrderOptional.isPresent()) {
            WorkOrder workOrder = workOrderOptional.get();
            workOrder.setName(workOrderDetails.getName());
            workOrder.setDescription(workOrderDetails.getDescription());
            workOrder.setStatus(workOrderDetails.getStatus());
            workOrder.setDuration(workOrderDetails.getDuration());
            workOrder.setManufacturingOrder(workOrderDetails.getManufacturingOrder());
            workOrder.setWorkCenter(workOrderDetails.getWorkCenter());
            workOrder.setOperator(workOrderDetails.getOperator());
            workOrder.setStartTime(workOrderDetails.getStartTime());
            workOrder.setEndTime(workOrderDetails.getEndTime());
            return workOrderRepository.save(workOrder);
        }
        return null;
    }

    public boolean deleteWorkOrder(Long id) {
        if (workOrderRepository.existsById(id)) {
            workOrderRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<WorkOrder> getWorkOrdersByManufacturingOrder(Long manufacturingOrderId) {
        return workOrderRepository.findByManufacturingOrderId(manufacturingOrderId);
    }

    public List<WorkOrder> getWorkOrdersByOperator(Long operatorId) {
        return workOrderRepository.findByOperatorId(operatorId);
    }

    public List<WorkOrder> getWorkOrdersByStatus(String status) {
        return workOrderRepository.findByStatus(status);
    }

    public WorkOrder startWorkOrder(Long id) {
        Optional<WorkOrder> workOrderOptional = workOrderRepository.findById(id);
        if (workOrderOptional.isPresent()) {
            WorkOrder workOrder = workOrderOptional.get();
            workOrder.setStatus("IN_PROGRESS");
            workOrder.setStartTime(java.time.LocalDateTime.now());
            return workOrderRepository.save(workOrder);
        }
        return null;
    }

    public WorkOrder completeWorkOrder(Long id) {
        Optional<WorkOrder> workOrderOptional = workOrderRepository.findById(id);
        if (workOrderOptional.isPresent()) {
            WorkOrder workOrder = workOrderOptional.get();
            workOrder.setStatus("COMPLETED");
            workOrder.setEndTime(java.time.LocalDateTime.now());
            return workOrderRepository.save(workOrder);
        }
        return null;
    }
}