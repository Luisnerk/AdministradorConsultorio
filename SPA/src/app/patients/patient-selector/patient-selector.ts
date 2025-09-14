import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PatientService } from '../../_services/patient-service';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../_models/patient';
import { NgLabelTemplateDirective, NgOptionComponent, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-patient-selector',
  imports: [FormsModule, NgSelectComponent],
  templateUrl: './patient-selector.html',
  styleUrl: './patient-selector.css'
})
export class PatientSelector {
  @Output() idEvent = new EventEmitter<number>();
  patients: Patient[] = [];
  id: number = 0;

  constructor (private patientservice: PatientService) {}

  loadPatients(name: string) {
    name = name.trim();
    name
        ? this.patientservice.getPatientsByName(name).subscribe({
            next: response => this.patients = response
          })
        : console.log("Blank Search");
  }

  setId() {
    this.idEvent.emit(this.id);
  }
}
