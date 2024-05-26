package com.project.vets4pets.appointment.domain.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "medical_service")
public class MedicalService {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private double price;

    @ManyToMany(mappedBy = "medicalServices")
    private List<Appointment> appointments;
}
