package com.techtitans.Manufacturing.repository;

import com.techtitans.Manufacturing.entity.BillOfMaterials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BOMRepository extends JpaRepository<BillOfMaterials, Long> {
}