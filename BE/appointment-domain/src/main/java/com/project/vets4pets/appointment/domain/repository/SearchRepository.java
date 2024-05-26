package com.project.vets4pets.appointment.domain.repository;

import com.project.vets4pets.appointment.domain.entity.Search;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchRepository extends JpaRepository<Search, Long> {
}
