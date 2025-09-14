import { Component, Input, ViewChild } from '@angular/core';
import { PatientForm } from "../patient-form/patient-form";
import { AppointmentForm } from '../../appointment/patient-detail-form/appointment-form';

@Component({
  selector: 'app-patient-modal',
  imports: [PatientForm,  AppointmentForm],
  templateUrl: './patient-modal.html',
  styleUrl: './patient-modal.css'
})
export class PatientModal {
  @ViewChild(PatientForm) formComponent!: PatientForm;
  @Input() modalForm: string = "";
  modalTitle: string = "";

  ngOnInit() {
    if (this.modalForm == "appointment") {
      this.modalTitle = "Agendar Cita"
    } else {
      this.modalTitle = "Agregar paciente"
    }
  }

  resetForm() {
    this.formComponent.resetForm();
  }
}
