import {Status} from "./status.model";
import {MedicalService} from "./medical-service.model";

export interface Appointment {
  id: number;
  animalName: string;
  doctorName: string;
  dateTime: string; // In TypeScript, LocalDateTime is typically represented as an ISO 8601 string
  medicalServices: MedicalService[];
  diagnosis: string;
  status: Status;
  totalCost: number;
}
