package com.project.vets4pets.appointment.api.mapper;

import com.project.vets4pets.appointment.api.dto.AppointmentDTO;
import com.project.vets4pets.appointment.domain.entity.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {
    @Mappings({
            @Mapping(target = "totalCost", expression = "java(calculateTotalCost(appointment))")
    })
    AppointmentDTO toDTO(Appointment appointment);

    Appointment toEntity(AppointmentDTO appointmentDTO);

    @Named("calculateTotalCost")
    default double calculateTotalCost(Appointment appointment) {
        if (appointment == null || appointment.getMedicalServices() == null) {
            return 0.0;
        }
        return appointment.getMedicalServices().stream()
                .mapToDouble(service -> service != null ? service.getPrice() : 0.0)
                .sum();
    }
}
