import { Component, OnInit } from '@angular/core';
import { Patient } from '../../_models/patient';
import { PatientService } from '../../_services/patient-service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})

export class PatientList implements OnInit{
  patients: Patient[] = []

  constructor(private patientService: PatientService){}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getMembers().subscribe({
      next: response =>{
        this.patients = response;
      }
    });
  }
}
