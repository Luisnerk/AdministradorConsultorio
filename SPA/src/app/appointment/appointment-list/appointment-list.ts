import { Component } from '@angular/core';
import { AppointmentContainer } from "../appointment-container/appointment-container";
import { AppointmentService } from '../../_services/appointment-service';
import { AppointmentListModel } from '../../_models/appointment-list-model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list-container',
  imports: [AppointmentContainer],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css'
})
export class AppointmentList {
  appointments: AppointmentListModel[] = [];

  constructor (private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    console.log("asirwasd")
    this.appointmentService.getAppointments().subscribe({
      next: response => this.appointments = response,
    })
  }
}
