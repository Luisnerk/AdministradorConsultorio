import { Routes } from '@angular/router';
import { PatientList } from './patients/patient-list/patient-list';
import { Prueba } from './prueba/prueba';

export const routes: Routes = [
    {path: "patients", component: PatientList},
    {path: "prueba", component: Prueba}
];