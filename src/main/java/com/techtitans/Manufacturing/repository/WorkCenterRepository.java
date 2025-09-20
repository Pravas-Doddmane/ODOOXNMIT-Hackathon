package com.techtitans.Manufacturing.repository;

import com.techtitans.Manufacturing.entity.WorkCenter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkCenterRepository extends JpaRepository<WorkCenter, Long> {
}