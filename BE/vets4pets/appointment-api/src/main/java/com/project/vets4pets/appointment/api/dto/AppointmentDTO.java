package com.project.vets4pets.appointment.api.dto;


import com.project.vets4pets.appointment.domain.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {
    private Long id;
    private String animalName;
    private String doctorName;
    private LocalDateTime dateTime;
    private List<MedicalServiceDTO> medicalServices;
    private String diagnosis;
    private Status status;
    private double totalCost;
}
