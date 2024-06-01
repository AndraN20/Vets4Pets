import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentRestService, MedicalService } from '@appointment/data-access-appointment';
import { Search } from '@appointment/data-access-appointment/models/search.model';
import { MedicalServiceRestService } from '@appointment/data-access-appointment/services/medical-service-rest.service';
import { NavigationService } from '../../../../commons/navigation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  @Output() filterApplied = new EventEmitter<void>();
  filterForm!: FormGroup;
  search: Search = {
    name: ''
  };
  services!: MedicalService[];

  constructor(private route: ActivatedRoute, private medicalServiceRestService: MedicalServiceRestService, private navigationService: NavigationService) {
    this.initForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.search = params;
      this.filterForm.patchValue({
        animalName: this.search.animalName,
        doctorName: this.search.doctorName,
        date: this.search.date,
        medicalService: this.search.medicalService,
        diagnosis: this.search.diagnosis,
        status: this.search.status,
        sortField: this.search.sortField,
        direction: this.search.direction,
      });
    });
    this.medicalServiceRestService.getAllMedicalServices().subscribe(
      services => this.services = services
    );
  }

  initForm() {
    this.filterForm = new FormGroup({
      animalName: new FormControl(''),
      doctorName: new FormControl(""),
      date: new FormControl(""),
      medicalService: new FormControl(""),
      diagnosis: new FormControl(""),
      status: new FormControl(""),
      sortField: new FormControl(""),
      direction: new FormControl("")
    });
  }

  togglePopUp() {
    this.filterApplied.emit();
  }

  onSubmit() {
    this.search = {
      name: this.search.name,
      animalName: this.filterForm.value.animalName,
      doctorName: this.filterForm.value.doctorName,
      date: this.filterForm.value.date,
      medicalService: this.filterForm.value.medicalService,
      status: this.filterForm.value.status,
      diagnosis: this.filterForm.value.diagnosis,
      sortField: this.filterForm.value.sortField,
      direction: this.filterForm.value.direction
    }

    if (this.filterForm.valid) {
      this.navigationService.navigateToFilteredPage(this.search);
      this.filterApplied.emit();
    }
  }

  removeFilters() {
    this.search = {};
    this.navigationService.navigateToFilteredPage(this.search);
  }
}
