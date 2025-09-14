import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../_services/appointment-service';
import { Appointment } from '../../_models/appointment';
import { PatientSelector } from "../../patients/patient-selector/patient-selector";
import { ToastrService } from 'ngx-toastr';
import { Patient } from '../../_models/patient';

@Component({
  selector: 'app-appointment-form',
  imports: [ReactiveFormsModule, PatientSelector],
  templateUrl: 'appointment-form.html',
  styleUrl: './appointment-form.css'
})
export class AppointmentForm {
  @Output() formSubmit = new EventEmitter();
  @Input() patientInput: Patient | null = null;
  constructor (private fb: FormBuilder, private appointmentService: AppointmentService, private toastr: ToastrService) {}

  formGroup: FormGroup = new FormGroup({});

  ngOnInit() {
    this.initForm();
    console.log(this.formGroup.value)
  }

  initForm() {
    this.formGroup = this.fb.group({
      patientId: ["", Validators.required],
      dateAndTime: ["", Validators.required],
      durationMinutes: ["", Validators.required]
    });
    
  }
  
  registerAppointment() {
    if (this.patientInput)
      this.formGroup.patchValue({patientId: this.patientInput.id});
    if (this.formGroup.valid){
      const values: any = {...this.formGroup.value}
      this.appointmentService.registerAppointment(values).subscribe({
        next: () => this.formSubmit.emit(0),
        error: error => console.log(error)
      });
    } else {
      this.toastr.error("Valores del formulario inválidos", "Datos inválidos");
    }
    
  }

  setPatientId(patientId: number | null) {
    if (patientId){
      this.formGroup.patchValue({patientId: patientId});
    }
  }

  resetForm() {
    console.log("reset")
  }
}
