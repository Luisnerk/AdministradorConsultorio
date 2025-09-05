import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../_services/patient-service';
import { Patient } from '../../_models/patient';
import { PatientUpdateForm } from "../patient-update-form/patient-update-form";

@Component({
  selector: 'app-patient-details',
  imports: [ PatientUpdateForm],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.css'
})
export class PatientDetails {
  editMode: boolean = false;
  id: number = 0;
  patient!: Patient;

  ngOnInit(): void {
    this.loadPatient();
  }

  constructor (private route: ActivatedRoute, private patientService: PatientService) {}

  loadPatient() {
    const paramId = this.route.snapshot.paramMap.get('id');
    paramId ? this.id = +paramId : this.id = 0;
    this.patientService.getPatient(this.id).subscribe({
      next: response => this.patient = response
    });
  }

  changeMode() {
    this.editMode = !this.editMode;
    console.log(this.editMode);
  }
}
