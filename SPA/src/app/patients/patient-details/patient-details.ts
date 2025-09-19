import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../_services/patient-service';
import { Patient } from '../../_models/patient';
import { PatientUpdateForm } from "../patient-update-form/patient-update-form";
import { firstValueFrom } from 'rxjs';
import { PatientModal } from "../patient-modal/patient-modal";
import { AppointmentService } from '../../_services/appointment-service';
import { AppointmentListModel } from '../../_models/appointment-list-model';

@Component({
  selector: 'app-patient-details',
  imports: [PatientUpdateForm, PatientModal],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.css'
})
export class PatientDetails {
  private router = inject(Router);
  modalForm: string = "appointment"
  editMode: boolean = false;
  id: number = 0;
  patient!: Patient;
  appointments: AppointmentListModel[] = [];
  
  constructor (private route: ActivatedRoute, private patientService: PatientService, private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadPatient();
    this.loadUpcommingAppointments();
    this.appointmentService.reloadList$.subscribe(() => this.loadUpcommingAppointments());
  }

  loadPatient() {
    const paramId = this.route.snapshot.paramMap.get('id');
    paramId ? this.id = +paramId : this.id = 0;
    this.patientService.getPatient(this.id).subscribe({
      next: response => this.patient = response
    });
  }

  loadUpcommingAppointments() {
    const patientId = +this.id;
    this.appointmentService.getUpcomming(patientId).subscribe({
      next: response => this.appointments = response,
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
