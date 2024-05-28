package com.project.vets4pets.appointment.controller;

import com.project.vets4pets.appointment.api.dto.MedicalServiceDTO;
import com.project.vets4pets.appointment.api.mapper.MedicalServiceMapper;
import com.project.vets4pets.appointment.api.service.MedicalServiceService;
import com.project.vets4pets.appointment.domain.entity.MedicalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/medicalService")
public class MedicalServiceController {
    private final MedicalServiceService medicalServiceService;
    private final MedicalServiceMapper medicalServiceMapper;

    @GetMapping
    public List<MedicalServiceDTO> getMedicalServices() {
        return this.medicalServiceService.getAllMedicalServices().stream()
                .map(medicalServiceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    public void deleteMedicalService(@PathVariable Long id) {
        this.medicalServiceService.deleteMedicalServiceById(id);
    }

    @PostMapping
    public MedicalServiceDTO addMedicalService(@RequestBody MedicalServiceDTO medicalServiceDTO) {
        MedicalService medicalService = this.medicalServiceMapper.toEntity(medicalServiceDTO);
        MedicalService savedMedicalService = this.medicalServiceService.saveMedicalService(medicalService);
        return this.medicalServiceMapper.toDTO(savedMedicalService);
    }
}
