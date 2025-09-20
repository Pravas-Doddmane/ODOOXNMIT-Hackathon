package com.techtitans.Manufacturing.controller;

import com.techtitans.Manufacturing.entity.WorkCenter;
import com.techtitans.Manufacturing.service.WorkCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/work-centers")
@CrossOrigin(origins = "*")
public class WorkCenterController {

    @Autowired
    private WorkCenterService workCenterService;

    @GetMapping
    public List<WorkCenter> getAllWorkCenters() {
        return workCenterService.getAllWorkCenters();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkCenter> getWorkCenterById(@PathVariable Long id) {
        Optional<WorkCenter> workCenter = workCenterService.getWorkCenterById(id);
        return workCenter.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public WorkCenter createWorkCenter(@RequestBody WorkCenter workCenter) {
        return workCenterService.createWorkCenter(workCenter);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkCenter> updateWorkCenter(@PathVariable Long id, @RequestBody WorkCenter workCenterDetails) {
        WorkCenter updatedWorkCenter = workCenterService.updateWorkCenter(id, workCenterDetails);
        if (updatedWorkCenter != null) {
            return ResponseEntity.ok(updatedWorkCenter);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWorkCenter(@PathVariable Long id) {
        boolean deleted = workCenterService.deleteWorkCenter(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}