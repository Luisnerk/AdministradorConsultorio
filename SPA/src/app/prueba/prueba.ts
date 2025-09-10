import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prueba',
  imports: [],
  templateUrl: './prueba.html',
  styleUrl: './prueba.css'
})
export class Prueba {
  constructor (private toastr: ToastrService) {}

  showToast() {
    this.toastr.success("AAAAAAAAA", "Tiutlop");
  }
}
