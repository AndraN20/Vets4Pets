import { Component, OnInit } from '@angular/core';
import { AppointmentCardComponent } from "./appointment-card/appointment-card.component";
import { AppointmentRestService } from "../../data-access-appointment/services/appointment-rest.service";
import { Appointment } from "../../data-access-appointment/models/appointment.model";
import { NavigationService } from '../../../commons/navigation.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [AppointmentCardComponent],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  pages: number[] = [];
  selectedPage = 0;

  constructor(private navigationService: NavigationService, private appointmentService: AppointmentRestService) { }

  ngOnInit(): void {
    this.getAppointments(0);
  }

  getAppointments(page: number): void {
    this.appointmentService.getAppointments(page)
      .subscribe(appointments => {
        this.appointments = appointments.content;
        this.selectedPage = appointments.pageable.pageNumber;
        for (let i = 0; i < appointments.totalPages; i++) {
          this.pages[i] = i;
        }
      });
  }

  navigateToAppointmentDetails(id: number) {
    this.navigationService.navigateToAppointmentDetails(id);
  }

}
