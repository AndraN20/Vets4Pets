import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '@appointment/data-access-appointment/models/appointment.model';
import { AppointmentRestService } from '@appointment/data-access-appointment/services/appointment-rest.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss'
})
export class AppointmentFormComponent {
  appointment!: Appointment;

  constructor(private route: ActivatedRoute,
    private appointmentService: AppointmentRestService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.appointmentService.getAppointmentById(id).subscribe(appointment => {
        this.appointment = appointment;
      })
    }

  }
}
