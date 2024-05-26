package com.project.vets4pets.appointment.api.mapper;

import com.project.vets4pets.appointment.api.dto.MedicalServiceDTO;
import com.project.vets4pets.appointment.domain.entity.MedicalService;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MedicalServiceMapper {
    MedicalServiceDTO toDTO(MedicalService medicalService);
    MedicalService toEntity(MedicalServiceDTO medicalServiceDTO);
}
