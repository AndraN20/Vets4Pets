import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { apiUrl } from "../../../environment/environment";
import { Observable } from "rxjs";
import { Appointment } from "../models/appointment.model";
import { Page } from "../models/appointment-page.model";

@Injectable({
  providedIn: 'root'
})
export class AppointmentRestService {

  constructor(private http: HttpClient) { }

  getAppointments(page: number): Observable<Page<Appointment>> {
    const params = new HttpParams()
      .set('page', page.toString());

    return this.http.get<Page<Appointment>>(apiUrl + "/appointment", { params: params });
  }

  getAppointmentById(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(apiUrl + '/appointment/' + id);
  }

  editAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(apiUrl + "/appointment/" + appointment.id, appointment);
  }

  saveAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(apiUrl + "/appointment", appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(apiUrl + "/appointment/" + id);
  }


}
