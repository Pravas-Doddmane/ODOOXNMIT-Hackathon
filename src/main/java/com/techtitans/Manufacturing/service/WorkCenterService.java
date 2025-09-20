package com.techtitans.Manufacturing.service;

import com.techtitans.Manufacturing.entity.WorkCenter;
import com.techtitans.Manufacturing.repository.WorkCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class WorkCenterService {

    @Autowired
    private WorkCenterRepository workCenterRepository;

    public List<WorkCenter> getAllWorkCenters() {
        return workCenterRepository.findAll();
    }

    public Optional<WorkCenter> getWorkCenterById(Long id) {
        return workCenterRepository.findById(id);
    }

    public WorkCenter createWorkCenter(WorkCenter workCenter) {
        return workCenterRepository.save(workCenter);
    }

    public WorkCenter updateWorkCenter(Long id, WorkCenter workCenterDetails) {
        Optional<WorkCenter> workCenterOptional = workCenterRepository.findById(id);
        if (workCenterOptional.isPresent()) {
            WorkCenter workCenter = workCenterOptional.get();
            workCenter.setName(workCenterDetails.getName());
            workCenter.setDescription(workCenterDetails.getDescription());
            workCenter.setCostPerHour(workCenterDetails.getCostPerHour());
            workCenter.setActive(workCenterDetails.getActive());
            return workCenterRepository.save(workCenter);
        }
        return null;
    }

    public boolean deleteWorkCenter(Long id) {
        if (workCenterRepository.existsById(id)) {
            workCenterRepository.deleteById(id);
            return true;
        }
        return false;
    }
}