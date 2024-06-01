import { Component, OnInit } from '@angular/core';
import { AppointmentCardComponent } from "./appointment-card/appointment-card.component";
import { AppointmentRestService } from "../../data-access-appointment/services/appointment-rest.service";
import { Appointment } from "../../data-access-appointment/models/appointment.model";
import { NavigationService } from '../../../commons/navigation.service';
import { FiltersComponent } from './filters/filters.component';
import { Search } from '@appointment/data-access-appointment/models/search.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchService } from '@appointment/data-access-appointment/services/search.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [AppointmentCardComponent, FiltersComponent, ReactiveFormsModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  pages: number[] = [];
  selectedPage = 0;
  filterPopUp = false;
  search: Search = {
  };
  searchPopUp = false;
  searchForm!: FormGroup;
  searches!: { key: string, search: Search }[];
  savedSearchForm!: FormGroup;

  constructor(private route: ActivatedRoute, private navigationService: NavigationService,
    private appointmentService: AppointmentRestService, private searchService: SearchService) {
    this.searchForm = new FormGroup({
      searchName: new FormControl('', Validators.required)
    });
    this.savedSearchForm = new FormGroup({
      savedSearch: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getFilteredAppointments(0);
    this.searches = this.searchService.getAllSavedSearches();
  }

  navigateToAppointmentDetails(id: number) {
    this.navigationService.navigateToAppointmentDetails(id);
  }

  navigateToAppointmentAdd() {
    this.navigationService.navigateToAppointmentAdd();
  }

  toggleFilterPopUp() {
    this.filterPopUp = !this.filterPopUp;
  }

  toggleSearchPopUp() {
    this.searchPopUp = !this.searchPopUp;
  }

  onFilterApplied() {
    this.toggleFilterPopUp();
    this.getFilteredAppointments(0);
  }

  getFilteredAppointments(page: number) {
    this.route.queryParams.subscribe(params => {
      this.search = params;
      this.getAppointments(page);
    });
  }

  getAppointments(page: number) {
    this.appointmentService.getFilteredAppointments(this.search, page)
      .subscribe(appointments => {
        this.appointments = appointments.content;
        this.selectedPage = appointments.pageable.pageNumber;
        this.pages = [];
        for (let i = 0; i < appointments.totalPages; i++) {
          this.pages[i] = i;
        }
      });
  }

  onSubmit() {
    this.toggleSearchPopUp();
    this.route.queryParams.subscribe(params => {
      this.search = params;
    });
    this.searchService.saveSearch(this.search, this.searchForm.value.searchName);
  }

  saveSearchSubmit() {
    const searchKey = this.savedSearchForm.value.savedSearch;
    const search = this.searches.find(
      search => {
        return search.key === searchKey;
      }
    )
    this.navigationService.navigateToFilteredPage(search!.search);
  }

}
