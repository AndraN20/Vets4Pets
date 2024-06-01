import { Status } from "./status.model";
import { MedicalService } from "./medical-service.model";

export interface Appointment {
  id: number;
  animalName: string;
  doctorName: string;
  dateTime: string;
  medicalServices: MedicalService[];
  diagnosis: string | null;
  status: Status;
  totalCost: number;
}
