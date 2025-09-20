package com.techtitans.Manufacturing.service;

import com.techtitans.Manufacturing.entity.ManufacturingOrder;
import com.techtitans.Manufacturing.repository.ManufacturingOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ManufacturingOrderService {

    @Autowired
    private ManufacturingOrderRepository manufacturingOrderRepository;

    public List<ManufacturingOrder> getAllManufacturingOrders() {
        return manufacturingOrderRepository.findAll();
    }

    public Optional<ManufacturingOrder> getManufacturingOrderById(Long id) {
        return manufacturingOrderRepository.findById(id);
    }

    public ManufacturingOrder createManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        return manufacturingOrderRepository.save(manufacturingOrder);
    }

    public ManufacturingOrder updateManufacturingOrder(Long id, ManufacturingOrder manufacturingOrderDetails) {
        Optional<ManufacturingOrder> manufacturingOrderOptional = manufacturingOrderRepository.findById(id);
        if (manufacturingOrderOptional.isPresent()) {
            ManufacturingOrder manufacturingOrder = manufacturingOrderOptional.get();
            manufacturingOrder.setProductName(manufacturingOrderDetails.getProductName());
            manufacturingOrder.setQuantity(manufacturingOrderDetails.getQuantity());
            manufacturingOrder.setStatus(manufacturingOrderDetails.getStatus());
            manufacturingOrder.setStartDate(manufacturingOrderDetails.getStartDate());
            manufacturingOrder.setDeadline(manufacturingOrderDetails.getDeadline());
            manufacturingOrder.setAssignee(manufacturingOrderDetails.getAssignee());
            manufacturingOrder.setBom(manufacturingOrderDetails.getBom());
            return manufacturingOrderRepository.save(manufacturingOrder);
        }
        return null;
    }

    public boolean deleteManufacturingOrder(Long id) {
        if (manufacturingOrderRepository.existsById(id)) {
            manufacturingOrderRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<ManufacturingOrder> getManufacturingOrdersByStatus(String status) {
        return manufacturingOrderRepository.findByStatus(status);
    }

    public List<ManufacturingOrder> getManufacturingOrdersByAssignee(Long assigneeId) {
        return manufacturingOrderRepository.findByAssigneeId(assigneeId);
    }
}