import { Component, Input } from '@angular/core';
import { AppointmentListModel } from '../../_models/appointment-list-model';

@Component({
  selector: 'app-appointment-container',
  imports: [],
  templateUrl: './appointment-container.html',
  styleUrl: './appointment-container.css'
})
export class AppointmentContainer {
  @Input() appointment!: AppointmentListModel;
}
