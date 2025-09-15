import { Component } from '@angular/core';
import { AppointmentContainer } from "../appointment-container/appointment-container";
import { AppointmentService } from '../../_services/appointment-service';
import { AppointmentListModel } from '../../_models/appointment-list-model';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { PatientModal } from "../../patients/patient-modal/patient-modal";

@Component({
  selector: 'app-appointment-list-container',
  imports: [AppointmentContainer, FormsModule, PatientModal],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css'
})
export class AppointmentList {
  modalForm: string = "appointment"
  appointments: AppointmentListModel[] = [];
  model: any = {};

  constructor (private appointmentService: AppointmentService, private fb: FormBuilder) {}

  ngOnInit() {
    const currentDate = new Date();
    const currentDateStr = this.getDateString(currentDate);
    this.model.date = currentDateStr;
    console.log(this.model.date)
    this.loadAppointments();
  }

  getDateString(date: Date): string {
    const month = (date.getMonth()+1).toString().padStart(2,"0")
    const dateString = date.getFullYear() + "-" + month + "-" + date.getDate();
    return dateString;
  }

  loadAppointments() {
    this.appointmentService.getByDate(this.model.date).subscribe({
      next: response => this.appointments = response,
    })
  }
}
