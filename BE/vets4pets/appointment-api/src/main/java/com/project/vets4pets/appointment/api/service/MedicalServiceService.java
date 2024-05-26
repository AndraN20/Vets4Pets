package com.project.vets4pets.appointment.api.service;

import com.project.vets4pets.appointment.domain.entity.MedicalService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MedicalServiceService {
    MedicalService saveMedicalService(MedicalService medicalService);

    List<MedicalService> getAllMedicalServices();

    void deleteMedicalServiceById(Long id);


}
