import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalService } from '../models/medical-service.model';
import { apiUrl } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalServiceRestService {

  constructor(private http: HttpClient) { }

  getAllMedicalServices(): Observable<MedicalService[]> {
    return this.http.get<MedicalService[]>(apiUrl + "/medicalService");
  }

  addMedicalService(medicalService: MedicalService): Observable<MedicalService> {
    return this.http.post<MedicalService>(apiUrl + "/medicalService", medicalService);
  }
}
