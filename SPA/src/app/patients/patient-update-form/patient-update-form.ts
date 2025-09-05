import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../_services/patient-service';
import { Patient } from '../../_models/patient';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-patient-update-form',
  imports: [ReactiveFormsModule],
  templateUrl: './patient-update-form.html',
  styleUrl: './patient-update-form.css'
})
export class PatientUpdateForm {
  @Input({required: true}) patient!: Patient;
  @Output() toggleEdit = new EventEmitter<void>();
  @Output() reloadPatient = new EventEmitter<void>();

  updateForm: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private patientService: PatientService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.updateForm = this.fb.group({
      name: [this.patient.name, Validators.required],
      dateOfBirth: [this.patient.dateOfBirth, Validators.required]
    });
  }

  async update() {
    const id = this.route.snapshot.paramMap.get("id");
    const values = {...this.updateForm.value, id: id};
    const response = await firstValueFrom(this.patientService.updatePatient(values));
    this.toggleEditFunc();
    this.reloadPatient.emit();
  }

  toggleEditFunc() {
    this.toggleEdit.emit();
  }
}
