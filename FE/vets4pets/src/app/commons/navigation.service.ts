import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from '@appointment/data-access-appointment/models/search.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {


  constructor(private router: Router) { }

  navigateToAppointmentDetails(id: number) {
    this.router.navigate(["appointment", id]);
  }

  navigateToAppointments() {
    this.router.navigate(["appointment"]);
  }

  navigateToAppointmentEdit(id: number) {
    this.router.navigate(["appointment/edit", id]);
  }

  navigateToAppointmentAdd() {
    this.router.navigate(["appointment/add"]);
  }

  navigateToFilteredPage(search: Search) {
    const queryParams = createConditionalObject(search);
    this.router.navigate(["appointment"], {
      queryParams: queryParams
    });
  }


}

function createConditionalObject(obj: any) {
  let newObj: any = {};
  if (obj.name !== "") {
    newObj.name = obj.name;
  }
  if (obj.animalName !== "") {
    newObj.animalName = obj.animalName;
  }
  if (obj.doctorName !== "") {
    newObj.doctorName = obj.doctorName;
  }
  if (obj.date !== "") {
    newObj.date = obj.date;
  }
  if (obj.medicalService !== "") {
    newObj.medicalService = obj.medicalService;
  }
  if (obj.diagnosis !== "") {
    newObj.diagnosis = obj.diagnosis;
  }
  if (obj.status !== "") {
    newObj.status = obj.status;
  }
  if (obj.sortField !== "") {
    newObj.sortField = obj.sortField;
  }
  if (obj.direction !== "") {
    newObj.direction = obj.direction;
  }
  return newObj;
}