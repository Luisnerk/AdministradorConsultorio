import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../_services/appointment-service';
import { Appointment } from '../../_models/appointment';

@Component({
  selector: 'app-appointment-form',
  imports: [ReactiveFormsModule],
  templateUrl: 'appointment-form.html',
  styleUrl: './appointment-form.css'
})
export class AppointmentForm {
  constructor (private fb: FormBuilder, private appointmentService: AppointmentService) {}

  formGroup: FormGroup = new FormGroup({});

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      dateAndTime: ["", Validators.required],
      durationMinutes: ["", Validators.required]
    })
  }

  registerAppointment() {
    const values: any = {...this.formGroup.value, patientId: 2}
    console.log(values);
    this.appointmentService.registerAppointment(values).subscribe({
      next: (response) => console.log(response),
      error: error => console.log(error)
    })
  }

  resetForm() {
    console.log("reset")
  }
}
