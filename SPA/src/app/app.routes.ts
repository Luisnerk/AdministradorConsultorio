import { Routes } from '@angular/router';
import { PatientList } from './patients/patient-list/patient-list';
import { Prueba } from './prueba/prueba';
import { PatientDetails } from './patients/patient-details/patient-details';

export const routes: Routes = [
    {path: "patients", component: PatientList},
    {path: "patient/:id", component: PatientDetails},
    {path: "prueba", component: Prueba}
];