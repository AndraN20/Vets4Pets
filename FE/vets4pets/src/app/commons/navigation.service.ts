import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {


  constructor(private router: Router) { }

  navigateToAppointmentDetails(id: number) {
    this.router.navigate(["appointment", id]);
  }

  navigateToAppointments() {
    this.router.navigateByUrl("/appointment", { skipLocationChange: true });
  }

  navigateToAppointmentEdit(id: number) {
    this.router.navigate(["appointment/edit", id]);
  }

  navigateToAppointmentAdd() {
    this.router.navigate(["/appointment/add"]);
  }
}
