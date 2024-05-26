package com.project.vets4pets.appointment.service;

import com.project.vets4pets.appointment.api.service.MedicalServiceService;
import com.project.vets4pets.appointment.domain.entity.MedicalService;
import com.project.vets4pets.appointment.domain.repository.MedicalServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicalServiceServiceImpl implements MedicalServiceService {
    private final MedicalServiceRepository medicalServiceRepository;

    @Override
    public MedicalService saveMedicalService(MedicalService medicalService) {
        return this.medicalServiceRepository.save(medicalService);
    }

    @Override
    public List<MedicalService> getAllMedicalServices() {
        return this.medicalServiceRepository.findAll().stream().toList();
    }

    @Override
    public void deleteMedicalServiceById(Long id) {
        this.medicalServiceRepository.deleteById(id);
    }
}
