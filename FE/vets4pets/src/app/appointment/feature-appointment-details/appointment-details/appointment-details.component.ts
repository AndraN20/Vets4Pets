import { Component } from '@angular/core';
import { Appointment } from '../../data-access-appointment/models/appointment.model';
import { ActivatedRoute } from '@angular/router';
import { AppointmentRestService } from '../../data-access-appointment/services/appointment-rest.service';
import { MedicalService } from '@appointment/data-access-appointment/models/medical-service.model';
import { CommonModule } from '@angular/common';
import { Status } from '@appointment/data-access-appointment/models/status.model';
import { NavigationService } from '../../../commons/navigation.service';
import { FormControl, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss'
})
export class AppointmentDetailsComponent {
  appointment!: Appointment;
  services!: MedicalService[];
  isCreated: boolean = false;
  showDiagnosisForm: boolean = false;
  diagnosis = '';


  constructor(private route: ActivatedRoute,
    private appointmentService: AppointmentRestService, private navigationService: NavigationService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.appointmentService.getAppointmentById(id).subscribe(appointment => {
        this.appointment = appointment;
        this.services = appointment.medicalServices;
        this.isCreated = appointment.status === Status.created;
        if (appointment.diagnosis) {
          this.diagnosis = appointment.diagnosis;
        }
      })
    }
  }

  confirmAppointment() {
    if (this.appointment.status !== Status.confirmed) {
      this.appointment.status = Status.confirmed;
      this.appointmentService.editAppointment(this.appointment).subscribe();
      this.isCreated = false;
    }
  }

  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe(
      () =>
        this.navigationService.navigateToAppointments()
    )
  }
  navigateToAppointmentEdit(id: number) {
    this.navigationService.navigateToAppointmentEdit(id);
  }
  navigateToAppointmentAdd() {
    this.navigationService.navigateToAppointmentAdd();
  }

  toggleDiagnosis() {
    this.showDiagnosisForm = !this.showDiagnosisForm;
  }

  saveDiagnosis() {
    const diagnosis: string = this.diagnosis;
    this.appointment.diagnosis = diagnosis;
    this.appointmentService.editAppointment(this.appointment).subscribe();
    this.toggleDiagnosis();
  }
}
