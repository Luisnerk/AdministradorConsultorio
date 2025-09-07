import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AccountService } from '../_services/account-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})

export class Nav {
  model: any = {};

  constructor (public accountService: AccountService, private router: Router) {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => this.router.navigateByUrl("/patients"),
      error: error => console.log("error")
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}
