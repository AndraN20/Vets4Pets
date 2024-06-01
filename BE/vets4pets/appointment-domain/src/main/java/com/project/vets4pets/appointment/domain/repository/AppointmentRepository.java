package com.project.vets4pets.appointment.domain.repository;

import com.project.vets4pets.appointment.domain.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long>, JpaSpecificationExecutor<Appointment> {
}
