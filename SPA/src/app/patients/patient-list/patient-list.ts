import { Component, OnInit } from '@angular/core';
import { Patient } from '../../_models/patient';
import { PatientService } from '../../_services/patient-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientModal } from "../patient-modal/patient-modal";

@Component({
  selector: 'app-patient-list',
  imports: [RouterModule, CommonModule, PatientModal],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})

export class PatientList implements OnInit{
  patients: Patient[] = []

  constructor(private patientService: PatientService, private router: Router){}

  ngOnInit(): void {
    this.loadPatients();
    this.patientService.formSubmit$.subscribe(() => this.loadPatients());
  }

  onRowClick(id: number) {
    this.router.navigate(["/patient", id]);
  }

  loadPatients() {
    this.patientService.getPatients().subscribe({
      next: response =>{
        this.patients = response;
      }
    });
  }
}
