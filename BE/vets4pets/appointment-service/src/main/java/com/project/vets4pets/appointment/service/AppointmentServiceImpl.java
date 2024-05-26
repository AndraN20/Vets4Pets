package com.project.vets4pets.appointment.service;

import com.project.vets4pets.appointment.api.service.AppointmentService;
import com.project.vets4pets.appointment.domain.entity.Appointment;
import com.project.vets4pets.appointment.domain.entity.Status;
import com.project.vets4pets.appointment.domain.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;


    @Override
    public Appointment saveAppointment(Appointment appointment) {
        if (appointment.getId() == null) {
            appointment.setStatus(Status.created);
        }
        this.appointmentRepository.save(appointment);
        return appointment;
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return this.appointmentRepository.findAll().stream().toList();
    }

    @Override
    public Appointment getAppointmentById(Long id) {
        return this.appointmentRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteAppointmentById(Long id) {
        this.appointmentRepository.deleteById(id);
    }

    @Override
    public Appointment editAppointment(Appointment appointment) {
        this.appointmentRepository.save(appointment);
        return appointment;
    }

    @Override
    public Page<Appointment> getAppointmentsOnPage(int page, int size) {
        return this.appointmentRepository.findAll(PageRequest.of(page, size));
    }
}
