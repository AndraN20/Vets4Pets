import { Direction } from "./direction.model";
import { SortField } from "./sort-field.model";
import { Status } from "./status.model";

export interface Search {
    name?: string,
    animalName?: string,
    doctorName?: string,
    date?: string,
    medicalService?: string,
    diagnosis?: string,
    status?: Status,
    sortField?: SortField,
    direction?: Direction
}