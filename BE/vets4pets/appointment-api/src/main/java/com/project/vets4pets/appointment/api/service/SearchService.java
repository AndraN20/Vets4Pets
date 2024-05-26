package com.project.vets4pets.appointment.api.service;

import com.project.vets4pets.appointment.domain.entity.Search;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SearchService {
    void saveSearch(Search search);

    List<Search> getAllSearches();

    Search getSearchById(String id);

    void deleteSearchById(String id);

    void editSearch(Search search);
}
