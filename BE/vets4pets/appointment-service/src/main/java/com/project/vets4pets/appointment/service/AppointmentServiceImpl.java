package com.project.vets4pets.appointment.service;

import com.project.vets4pets.appointment.api.service.AppointmentService;
import com.project.vets4pets.appointment.api.service.MedicalServiceService;
import com.project.vets4pets.appointment.domain.entity.Appointment;
import com.project.vets4pets.appointment.domain.entity.MedicalService;
import com.project.vets4pets.appointment.domain.entity.Status;
import com.project.vets4pets.appointment.domain.repository.AppointmentRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final MedicalServiceService medicalServiceService;


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
        Appointment existingAppointment = this.getAppointmentById(appointment.getId());

        if (existingAppointment == null) {
            throw new IllegalStateException("Appointment not found with id: " + appointment.getId());
        }

        if (appointment.getDiagnosis() != null && appointment.getStatus() == Status.created) {
                throw new IllegalStateException("Diagnosis can only be set for confirmed appointments.");
        }
        else if ( appointment.getDiagnosis() != null && appointment.getStatus() == Status.confirmed && existingAppointment.getDiagnosis() ==null) {
            appointment.setStatus(Status.closed);
        }
        return this.appointmentRepository.save(appointment);
    }

    @Override
    public Page<Appointment> getAppointmentsOnPage(Pageable pageable){
        Pageable pageableSorted = PageRequest.of(
                pageable.getPageNumber(),
                5,
                Sort.by(Sort.Direction.DESC, "dateTime")
        );

        return this.appointmentRepository.findAll(pageableSorted);
    }

    @PostConstruct
    private void initDatabase() {
       try{ saveInitialAppointments();
    }catch(Exception e){
           System.out.println("Error on init");
       }
    }

    private void saveInitialAppointments() {
        MedicalService service1 = new MedicalService(null, "Vaccination", 50.0);
        MedicalService service2 = new MedicalService(null, "Checkup", 30.0);
        MedicalService service3 = new MedicalService(null, "Surgery", 200.0);

        service1 = this.medicalServiceService.saveMedicalService(service1);
        service2 = this.medicalServiceService.saveMedicalService(service2);
        service3 = this.medicalServiceService.saveMedicalService(service3);

        List<MedicalService> servicesList1 = Arrays.asList(service1, service2);
        List<MedicalService> servicesList2 = Arrays.asList(service2, service3);
        List<MedicalService> servicesList3 = Arrays.asList(service1, service3);
        List<MedicalService> servicesList4 = Arrays.asList(service1, service2, service3);

        Appointment appointment1 = new Appointment(null, "Lilo", "Jessica Brown", LocalDateTime.now().plusDays(1), servicesList1, null, null);
        saveAppointment(appointment1);

        Appointment appointment2 = new Appointment(null, "Max", "Jessica Brown", LocalDateTime.now().plusDays(2), servicesList2, null, null);
        saveAppointment(appointment2);
        saveAppointment(new Appointment(null, "Puffy", "Jessica Brown", LocalDateTime.now().plusDays(3), servicesList4, null, null));
        saveAppointment(new Appointment(null, "Charlie", "Elisabeth Taylor", LocalDateTime.now().plusDays(4), servicesList3, null, null));
        saveAppointment(new Appointment(null, "Cleo", "John Anderson", LocalDateTime.now().plusDays(5), servicesList2, null, null));
        saveAppointment(new Appointment(null, "Daisy", "Elisabeth Taylor", LocalDateTime.now().plusDays(6), servicesList3, null, null));
    }
}
