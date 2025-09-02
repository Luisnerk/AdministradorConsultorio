import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../_services/patient-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-form',
  imports: [ReactiveFormsModule],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.css'
})

export class PatientForm {
  registerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private patientService: PatientService, private router: Router){}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      dateOfBirth: ["", Validators.required]
    });
  }

  register() {
    const values = {...this.registerForm.value};
    this.patientService.register(values).subscribe({
      next: () => {
        this.patientService.notifyChange();
      }
    });
    this.registerForm.reset();
    this.patientService.getPatients();
  }

  resetForm() {
    console.log("aaaa")
    this.registerForm.reset();
  }
}
