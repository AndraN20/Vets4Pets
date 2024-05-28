import { Routes } from "@angular/router";
import { AppointmentListComponent } from "../feature-appointment-list/appointment-list/appointment-list.component";
import { AppointmentDetailsComponent } from "@appointment/feature-appointment-details/appointment-details/appointment-details.component";
import { AppointmentFormComponent } from "@appointment/feature-appointment-form/appointment-form/appointment-form.component";

const appointmentRoutes: Routes = [
    {
        path: '',
        component: AppointmentListComponent
    },
    {
        path: 'add',
        component: AppointmentFormComponent
    },
    {
        path: ':id',
        component: AppointmentDetailsComponent
    },
    {
        path: 'edit/:id',
        component: AppointmentFormComponent
    }

];

export const routes: Routes = appointmentRoutes;