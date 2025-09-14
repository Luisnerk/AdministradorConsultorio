import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppointmentForm } from "../appointment/appointment-form/appointment-form";

@Component({
  selector: 'app-prueba',
  imports: [AppointmentForm ],
  templateUrl: './prueba.html',
  styleUrl: './prueba.css'
})
export class Prueba {
  constructor (private toastr: ToastrService) {}

  showToast() {
    this.toastr.success("AAAAAAAAA", "Tiutlop");
  }
}
