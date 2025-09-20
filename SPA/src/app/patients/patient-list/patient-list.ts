import { Component, OnInit } from '@angular/core';
import { Patient } from '../../_models/patient';
import { PatientService } from '../../_services/patient-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientModal } from "../patient-modal/patient-modal";
import { HttpParams } from '@angular/common/http';
import { Pagination } from '../../_models/pagination';
import { UserParams } from '../../_models/user-params';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-list',
  imports: [RouterModule, CommonModule, PatientModal, PaginationModule, FormsModule],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})

export class PatientList implements OnInit{
  patients: Patient[] = [];
  nameSearch: string | null = null;
  modalForm: string = "patient";
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;

  constructor(private patientService: PatientService, private router: Router, private route: ActivatedRoute){
    this.userParams = new UserParams;
    this.userParams.pageNumber = 1;
    this.userParams.pageSize = 10;
  }

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
    this.patientService.getPaginatedPatients(this.userParams!).subscribe({
      next: response => {
        if (response.result && response.pagination){
          this.patients = response.result;
          this.pagination = response.pagination;
          this.pagination.totalItems = this.pagination.itemsPerPage * this.pagination.totalPages;
        }
      },
    })
  }

  loadPatientsByName() {
    this.patientService.getPatientsByName(this.nameSearch!).subscribe({
      next: response => {
        this.patients = response;
      }
    })
  }

  pageChanged(event: any) {
    if (this.userParams && this.userParams.pageNumber !== event.page){
      this.userParams.pageNumber = event.page;
      this.loadPatients();
    }
  }
}
