import { Routes } from '@angular/router';
import { PatientList } from './patients/patient-list/patient-list';
import { Prueba } from './prueba/prueba';
import { PatientDetails } from './patients/patient-details/patient-details';
import { authGuard } from './_guards/auth-guard';
import { AppointmentList } from './appointment/appointment-list/appointment-list';
import { AccountSettings } from './account/account-settings/account-settings';

export const routes: Routes = [
    // {path: "",
    //     runGuardsAndResolvers: 'always',
    //     canActivate: [authGuard],
    //     children:[
    //     ]
    // },
    {path: "appointments", component: AppointmentList},
    {path: "patients", component: PatientList},
    {path: "patients/:name", component: PatientList},
    {path: "patient/:id", component: PatientDetails},
    {path: "account", component: AccountSettings},
    {path: "prueba", component: Prueba}
];