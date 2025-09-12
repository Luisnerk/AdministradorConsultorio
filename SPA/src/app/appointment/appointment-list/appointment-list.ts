import { Component } from '@angular/core';
import { AppointmentContainer } from "../appointment-container/appointment-container";
import { AppointmentService } from '../../_services/appointment-service';
import { AppointmentListModel } from '../../_models/appointment-list-model';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-list-container',
  imports: [AppointmentContainer, FormsModule],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css'
})
export class AppointmentList {
  appointments: AppointmentListModel[] = [];
  model: any = {};

  constructor (private appointmentService: AppointmentService, private fb: FormBuilder) {}

  ngOnInit() {
    const currentDate = new Date();
    const currentDateStr = currentDate.toISOString().slice(0, 10);
    this.model.date = currentDateStr;
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getByDate(this.model.date).subscribe({
      next: response => this.appointments = response,
    })
  }
}
