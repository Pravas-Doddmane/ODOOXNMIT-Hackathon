package com.techtitans.Manufacturing.service;

import com.techtitans.Manufacturing.entity.BillOfMaterials;
import com.techtitans.Manufacturing.repository.BOMRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BOMService {

    @Autowired
    private BOMRepository bomRepository;

    public List<BillOfMaterials> getAllBOMs() {
        return bomRepository.findAll();
    }

    public Optional<BillOfMaterials> getBOMById(Long id) {
        return bomRepository.findById(id);
    }

    public BillOfMaterials createBOM(BillOfMaterials bom) {
        return bomRepository.save(bom);
    }

    public BillOfMaterials updateBOM(Long id, BillOfMaterials bomDetails) {
        Optional<BillOfMaterials> bomOptional = bomRepository.findById(id);
        if (bomOptional.isPresent()) {
            BillOfMaterials bom = bomOptional.get();
            bom.setProductName(bomDetails.getProductName());
            bom.setDescription(bomDetails.getDescription());
            return bomRepository.save(bom);
        }
        return null;
    }

    public boolean deleteBOM(Long id) {
        if (bomRepository.existsById(id)) {
            bomRepository.deleteById(id);
            return true;
        }
        return false;
    }
}