package com.project.vets4pets.appointment.domain.specification;

import com.project.vets4pets.appointment.domain.entity.Appointment;
import com.project.vets4pets.appointment.domain.entity.MedicalService;
import com.project.vets4pets.appointment.domain.entity.Status;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class AppointmentSpecification {
    public static Specification<Appointment> filterByAnimalName(String name) {
        return (Root<Appointment> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (name == null) {
                return cb.conjunction();
            }
            return cb.like(root.get("animalName"), "%" + name + "%");
        };
    }

    public static Specification<Appointment> filterByDoctorName(String name) {
        return (Root<Appointment> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (name == null) {
                return cb.conjunction();
            }
            return cb.like(root.get("doctorName"), "%" + name + "%");
        };
    }

    public static Specification<Appointment> filterByStatus(Status status) {
        return (Root<Appointment> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (status == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("status"), status);
        };
    }

    public static Specification<Appointment> filterByDateTime(LocalDateTime dateTime) {
        return (Root<Appointment> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (dateTime == null) {
                return cb.conjunction();
            }
            LocalDateTime startOfDay = dateTime.toLocalDate().atStartOfDay();
            LocalDateTime endOfDay = dateTime.toLocalDate().atTime(23, 59, 59);
            Predicate greaterOrEqual = cb.greaterThanOrEqualTo(root.get("dateTime"), startOfDay);
            Predicate lessOrEqual = cb.lessThanOrEqualTo(root.get("dateTime"), endOfDay);
            return cb.and(greaterOrEqual,lessOrEqual);
        };
    }

    public static Specification<Appointment> filterByDiagnosis(String diagnosis) {
        return (Root<Appointment> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (diagnosis == null) {
                return cb.conjunction();
            }
            return cb.like(root.get("diagnosis"), "%" + diagnosis + "%");
        };
    }

    public static Specification<Appointment> filterByMedicalService(String medicalServiceName) {
        return (Root<Appointment> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (medicalServiceName == null) {
                return cb.conjunction();
            }

            Join<Appointment, MedicalService> AppointmentMedicalService = root.join("medicalServices");
            System.out.println(medicalServiceName);
            System.out.println(AppointmentMedicalService.get("name"));
            return cb.like(AppointmentMedicalService.get("name"), "%" + medicalServiceName + "%");
        };
    }



}
