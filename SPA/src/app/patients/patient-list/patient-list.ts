import { Component, OnInit } from '@angular/core';
import { Patient } from '../../_models/patient';
import { PatientService } from '../../_services/patient-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientModal } from "../patient-modal/patient-modal";
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-patient-list',
  imports: [RouterModule, CommonModule, PatientModal],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})

export class PatientList implements OnInit{
  patients: Patient[] = [];
  nameSearch: string | null = null;
  modalForm: string = "patient";

  constructor(private patientService: PatientService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nameSearch = params["name"];
      this.nameSearch ? this.loadPatientsByName()
                      : this.loadPatients();
    })
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

  loadPatientsByName() {
    this.patientService.getPatientsByName(this.nameSearch!).subscribe({
      next: respone => {
        this.patients = respone;
      }
    })
  }
}
