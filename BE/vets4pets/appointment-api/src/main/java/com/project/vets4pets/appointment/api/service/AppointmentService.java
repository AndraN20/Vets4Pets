package com.project.vets4pets.appointment.api.service;

import com.project.vets4pets.appointment.domain.entity.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AppointmentService {
    Appointment saveAppointment(Appointment appointment);

    List<Appointment> getAllAppointments();

    Appointment getAppointmentById(Long id);

    void deleteAppointmentById(Long id);

    Appointment editAppointment(Appointment appointment);

    Page<Appointment> getAppointmentsOnPage(Pageable pageable);

}
