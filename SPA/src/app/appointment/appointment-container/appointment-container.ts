import { Component, Input } from '@angular/core';
import { AppointmentListModel } from '../../_models/appointment-list-model';
import { AppointmentService } from '../../_services/appointment-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment-container',
  imports: [],
  templateUrl: './appointment-container.html',
  styleUrl: './appointment-container.css'
})
export class AppointmentContainer {
  @Input() appointment!: AppointmentListModel;

  constructor (private appointmentService: AppointmentService, private toastr: ToastrService) {}

  deleteAppointment(): void {
    console.log(this.appointment);
    this.appointmentService.deleteAppointment(this.appointment).subscribe({
      next: (response) => {
        this.toastr.success(response.statusText, ""+response.status);
        this.appointmentService.listChange();
      },
      error: () => this.toastr.error("Error al eliminar", "Error"),
    });
  }
}
