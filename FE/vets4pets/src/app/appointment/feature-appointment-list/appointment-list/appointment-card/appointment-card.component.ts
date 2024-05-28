import { Component, Input } from '@angular/core';
import { Appointment } from "../../../data-access-appointment/models/appointment.model";
import { Status } from '../../../data-access-appointment/models/status.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss'
})

export class AppointmentCardComponent {
  @Input() appointment!: Appointment;

}
