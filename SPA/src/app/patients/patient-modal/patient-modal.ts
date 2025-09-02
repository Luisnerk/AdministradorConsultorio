import { Component } from '@angular/core';
import { PatientForm } from "../patient-form/patient-form";

@Component({
  selector: 'app-patient-modal',
  imports: [PatientForm],
  templateUrl: './patient-modal.html',
  styleUrl: './patient-modal.css'
})
export class PatientModal {

}
