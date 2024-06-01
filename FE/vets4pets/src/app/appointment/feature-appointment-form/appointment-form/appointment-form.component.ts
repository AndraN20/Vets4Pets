import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicalService, Status } from '@appointment/data-access-appointment';
import { Appointment } from '@appointment/data-access-appointment/models/appointment.model';
import { AppointmentRestService } from '@appointment/data-access-appointment/services/appointment-rest.service';
import { MedicalServiceRestService } from '@appointment/data-access-appointment/services/medical-service-rest.service';
import { NavigationService } from '../../../commons/navigation.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss'
})
export class AppointmentFormComponent {
  appointment: Appointment = {
    id: -1,
    animalName: "",
    doctorName: '',
    dateTime: '',
    medicalServices: [],
    diagnosis: null,
    status: Status.created,
    totalCost: 0
  };
  services!: MedicalService[];
  selectedServices: MedicalService[] = [];
  appointmentForm!: FormGroup;
  total: number = 0;
  showServiceForm: boolean = false;
  newServiceForm!: FormGroup;

  constructor(private route: ActivatedRoute,
    private appointmentService: AppointmentRestService,
    private medicalServiceRestService: MedicalServiceRestService,
    private navigationService: NavigationService) {
    this.appointmentForm = new FormGroup({
      patient: new FormControl('', [Validators.required, Validators.min(2), Validators.max(30)]),
      doctor: new FormControl('', [Validators.required, Validators.min(5), Validators.max(30)]),
      date: new FormControl('', [Validators.required]),
      service: new FormControl(null)
    });

    this.newServiceForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.appointmentService.getAppointmentById(id).subscribe(appointment => {
        this.appointment = appointment;
        const originalDate = new Date(appointment.dateTime);
        const formattedDateStr = originalDate.toISOString().slice(0, 16);
        this.appointmentForm.patchValue({
          patient: appointment.animalName,
          doctor: appointment.doctorName,
          date: formattedDateStr,
        });
        this.selectedServices = appointment.medicalServices;
        this.total = appointment.totalCost;
        this.initMedicalServices();
      });
    }
    this.initMedicalServices();
  }

  initMedicalServices() {
    this.medicalServiceRestService.getAllMedicalServices().subscribe(
      services => this.services = services.filter(service => {
        const id = service.id;
        return !this.selectedServices.find(service => service.id === id);
      }
      )
    );
  }

  addSelectedService() {
    const id: number = this.appointmentForm.value.service;
    const index = this.findService(id);
    const service = this.services.splice(index, 1)[0];
    this.selectedServices.push(service);
    this.total += service.price;
  }

  findService(id: number): number {
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  onSubmit() {
    const appointment: Appointment = {
      id: this.appointment.id,
      animalName: this.appointmentForm.value.patient,
      doctorName: this.appointmentForm.value.doctor,
      dateTime: this.appointmentForm.value.date,
      medicalServices: this.selectedServices,
      status: this.appointment.status,
      diagnosis: this.appointment.diagnosis || null,
      totalCost: 0
    }
    if (this.appointmentForm.valid) {
      if (this.appointment.id !== -1) {
        this.appointmentService.editAppointment(appointment).subscribe();
        this.navigationService.navigateToAppointments();
      }
      else {
        this.appointmentService.saveAppointment(appointment).subscribe();
        this.navigationService.navigateToAppointments();
      }
    }
  }

  toggleServiceForm() {
    this.showServiceForm = !this.showServiceForm;
  }

  onServiceSubmit() {
    const newService: MedicalService = {
      id: -1,
      name: this.newServiceForm.value.name,
      price: this.newServiceForm.value.price
    }
    this.medicalServiceRestService.addMedicalService(newService).subscribe();
    this.toggleServiceForm();
    this.initMedicalServices();
  }

}