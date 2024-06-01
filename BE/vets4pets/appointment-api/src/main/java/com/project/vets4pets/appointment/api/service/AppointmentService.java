package com.project.vets4pets.appointment.api.service;

import com.project.vets4pets.appointment.domain.entity.Appointment;
import com.project.vets4pets.appointment.domain.entity.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public interface AppointmentService {
    Appointment saveAppointment(Appointment appointment);

    List<Appointment> getAllAppointments();

    Appointment getAppointmentById(Long id);

    void deleteAppointmentById(Long id);

    Appointment editAppointment(Appointment appointment);

    Page<Appointment> getFilteredAppointments(String animalName, String doctorName, Status status, LocalDateTime dateTime, String diagnosis, String serviceName, int page, int size, String sortField, Sort.Direction direction);
}
