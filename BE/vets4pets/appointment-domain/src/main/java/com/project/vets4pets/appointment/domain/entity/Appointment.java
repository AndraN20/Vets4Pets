package com.project.vets4pets.appointment.domain.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "appointment")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String animalName;
    private String doctorName;
    private LocalDateTime dateTime;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "appointment_medical_service",
            joinColumns = @JoinColumn(name = "appointment_id"),
            inverseJoinColumns = @JoinColumn(name = "medical_service_id")
    )
    private List<MedicalService> medicalServices;

    private String diagnosis;

    @Enumerated(EnumType.STRING)
    private Status status;
}
