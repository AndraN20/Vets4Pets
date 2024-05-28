import { Component } from '@angular/core';
import { Appointment } from '../../data-access-appointment/models/appointment.model';
import { ActivatedRoute } from '@angular/router';
import { AppointmentRestService } from '../../data-access-appointment/services/appointment-rest.service';
import { MedicalService } from '@appointment/data-access-appointment/models/medical-service.model';
import { CommonModule } from '@angular/common';
import { Status } from '@appointment/data-access-appointment/models/status.model';
import { NavigationService } from '../../../commons/navigation.service';

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss'
})
export class AppointmentDetailsComponent {
  appointment!: Appointment;
  services!: MedicalService[];
  isConfirmed: boolean = false;
  isClicked: boolean = false;

  constructor(private route: ActivatedRoute,
    private appointmentService: AppointmentRestService, private navigationService: NavigationService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.appointmentService.getAppointmentById(id).subscribe(appointment => {
        this.appointment = appointment;
        this.services = appointment.medicalServices;
        if (this.appointment.status === Status.confirmed) { this.isConfirmed = true; }
      })
    }
  }

  confirmAppointment() {
    if (this.appointment.status !== Status.confirmed) {
      this.isClicked = true;
      this.appointment.status = Status.confirmed;
      this.appointmentService.editAppointment(this.appointment).subscribe();
    }
    else {
      this.isConfirmed = true;
    }
  }

  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe();
    this.navigationService.navigateToAppointments();
  }
  navigateToAppointmentEdit(id: number) {
    this.navigationService.navigateToAppointmentEdit(id);
  }

}
