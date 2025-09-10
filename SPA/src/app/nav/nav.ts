import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AccountService } from '../_services/account-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})

export class Nav {
  model: any = {};

  constructor (public accountService: AccountService, private router: Router, private toastr: ToastrService) {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.model.password = "";
        this.model.username = "";
        this.router.navigateByUrl("/patients");
      },
      error: error => {
        this.toastr.error("Credenciales inválidas", "Error");
        this.model.password = "";
        console.log("error");
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}
