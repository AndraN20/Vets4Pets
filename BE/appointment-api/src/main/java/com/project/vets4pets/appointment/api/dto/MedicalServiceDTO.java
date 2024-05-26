package com.project.vets4pets.appointment.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicalServiceDTO {
    private Long id;

    private String name;
    private double price;
}
