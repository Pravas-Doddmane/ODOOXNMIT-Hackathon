package com.techtitans.Manufacturing.controller;

import com.techtitans.Manufacturing.entity.BillOfMaterials;
import com.techtitans.Manufacturing.service.BOMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/boms")
@CrossOrigin(origins = "*")
public class BOMController {

    @Autowired
    private BOMService bomService;

    @GetMapping
    public List<BillOfMaterials> getAllBOMs() {
        return bomService.getAllBOMs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BillOfMaterials> getBOMById(@PathVariable Long id) {
        Optional<BillOfMaterials> bom = bomService.getBOMById(id);
        return bom.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public BillOfMaterials createBOM(@RequestBody BillOfMaterials bom) {
        return bomService.createBOM(bom);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BillOfMaterials> updateBOM(@PathVariable Long id, @RequestBody BillOfMaterials bomDetails) {
        BillOfMaterials updatedBOM = bomService.updateBOM(id, bomDetails);
        if (updatedBOM != null) {
            return ResponseEntity.ok(updatedBOM);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBOM(@PathVariable Long id) {
        boolean deleted = bomService.deleteBOM(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}