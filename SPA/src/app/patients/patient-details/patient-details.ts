import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../_services/patient-service';
import { Patient } from '../../_models/patient';
import { PatientUpdateForm } from "../patient-update-form/patient-update-form";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-patient-details',
  imports: [ PatientUpdateForm],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.css'
})
export class PatientDetails {
  private router = inject(Router);
  editMode: boolean = false;
  id: number = 0;
  patient!: Patient;
  
  constructor (private route: ActivatedRoute, private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatient();
  }

  loadPatient() {
    const paramId = this.route.snapshot.paramMap.get('id');
    paramId ? this.id = +paramId : this.id = 0;
    this.patientService.getPatient(this.id).subscribe({
      next: response => this.patient = response
    });
  }

  async deletePatient() {
    try {
      await firstValueFrom( this.patientService.deletePatient(this.patient));
      this.router.navigate(["/"]);
    } catch(error){
      console.log(error);
    }
  }

  changeMode() {
    this.editMode = !this.editMode;
    console.log(this.editMode);
  }
}
