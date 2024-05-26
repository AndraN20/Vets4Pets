package com.project.vets4pets.appointment.domain.repository;

import com.project.vets4pets.appointment.domain.entity.MedicalService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalServiceRepository extends JpaRepository<MedicalService, Long> {
}
