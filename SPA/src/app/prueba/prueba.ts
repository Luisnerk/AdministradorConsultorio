import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppointmentForm } from "../appointment/appointment-form/appointment-form";
import { PatientSelector } from "../patients/patient-selector/patient-selector";
import { PatientService } from '../_services/patient-service';
import { Patient } from '../_models/patient';
import { PaginatedResult } from '../_models/pagination';

@Component({
  selector: 'app-prueba',
  imports: [AppointmentForm, PatientSelector],
  templateUrl: './prueba.html',
  styleUrl: './prueba.css'
})
export class Prueba {
  pagination: PaginatedResult<Patient[]> | null = null;
  patients: Patient[] | undefined = [];

  constructor (private toastr: ToastrService, private patientService: PatientService) {}

  ngOnInit() {
  }

  showToast() {
    this.toastr.success("AAAAAAAAA", "Tiutlop");
  }
}
