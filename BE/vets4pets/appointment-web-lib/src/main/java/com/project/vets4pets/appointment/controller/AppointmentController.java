package com.project.vets4pets.appointment.controller;


import com.project.vets4pets.appointment.api.dto.AppointmentDTO;
import com.project.vets4pets.appointment.api.mapper.AppointmentMapper;
import com.project.vets4pets.appointment.api.service.AppointmentService;
import com.project.vets4pets.appointment.domain.entity.Appointment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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

//    @GetMapping
//    public List<AppointmentDTO> getAppointments(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "5") int size) {
//        return appointmentService.getAppointmentsOnPage(page, size).stream()
//                .map(appointmentMapper::toDTO)
//                .collect(Collectors.toList());
//    }

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
    public Page<AppointmentDTO> getAppointmentsPaged(@RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "dateTime") String sortBy) {
        Pageable pageable = PageRequest.of(page, 5, Sort.by(Sort.Direction.DESC, sortBy));
        Page<Appointment> appointmentPage = appointmentService.getAppointmentsOnPage(pageable);
        return appointmentPage.map(this.appointmentMapper::toDTO);
    }

}
