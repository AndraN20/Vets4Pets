package com.project.vets4pets.appointment.controller;


import com.project.vets4pets.appointment.api.dto.AppointmentDTO;
import com.project.vets4pets.appointment.api.mapper.AppointmentMapper;
import com.project.vets4pets.appointment.api.service.AppointmentService;
import com.project.vets4pets.appointment.domain.entity.Appointment;
import com.project.vets4pets.appointment.domain.entity.Status;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/appointment")
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final AppointmentMapper appointmentMapper;

    @PostMapping
    public AppointmentDTO saveAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        Appointment appointment = this.appointmentMapper.toEntity(appointmentDTO);
        Appointment savedAppointment = this.appointmentService.saveAppointment(appointment);
        return this.appointmentMapper.toDTO(savedAppointment);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        this.appointmentService.deleteAppointmentById(id);
    }

    @PutMapping("/{id}")
    public AppointmentDTO editAppointment(@PathVariable Long id, @RequestBody AppointmentDTO appointmentDTO) {
        Appointment appointment = this.appointmentMapper.toEntity(appointmentDTO);
        appointment.setId(id);
        Appointment savedAppointment = this.appointmentService.editAppointment(appointment);
        return appointmentMapper.toDTO(savedAppointment);
    }

    @GetMapping("/{id}")
    public AppointmentDTO getAppointmentById(@PathVariable Long id) {
        return this.appointmentMapper.toDTO(this.appointmentService.getAppointmentById(id));
    }

    @GetMapping
    public Page<AppointmentDTO> getAppointments(
            @RequestParam(required = false) String animalName,
            @RequestParam(required = false) String doctorName,
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) String dateTime,
            @RequestParam(required = false) String diagnosis,
            @RequestParam(required = false) String medicalService,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "dateTime") String sortField,
            @RequestParam(defaultValue = "DESC") Sort.Direction direction) {

        LocalDateTime newDateTime = null;
        if (dateTime != null) {
            newDateTime = LocalDateTime.parse(dateTime);
        }
        return this.appointmentService.getFilteredAppointments(animalName, doctorName, status, newDateTime, diagnosis, medicalService, page, size, sortField, direction).map(
                this.appointmentMapper::toDTO
        );
    }
}
