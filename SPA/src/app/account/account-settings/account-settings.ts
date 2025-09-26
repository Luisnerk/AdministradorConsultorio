import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../../_services/account-service';
import { User } from '../../_models/user';
import { map, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-settings',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './account-settings.html',
  styleUrl: './account-settings.css'
})
export class AccountSettings {
  private destroy$ = new Subject<void>();
  currentUser: User | undefined;
  userForm: FormGroup = new FormGroup([]);
  

  constructor (private accountService: AccountService, private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.initForm();
    this.accountService.currentUser$.pipe(
      map(user => {
        if (user) {
          this.currentUser = user;
          this.userForm.patchValue({newUsername: this.currentUser.username})
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm() {
    this.userForm = this.fb.group({
      newUsername: ["", Validators.required],
      newPassword: [""],
      currentPassword: ["", Validators.required],
    })
  }

  updateUser() {
    if (!this.userForm.valid){
      this.toastr.error("Formulario inválido", "Error");
      return;
    }
    const model = {...this.userForm.value};
    this.accountService.updateUser(model).subscribe({
      error: () => this.toastr.error("Información inválida", "Ocurrió un error"),
      next: () => {
        this.toastr.success("Infomación Actualizada", "",{positionClass:  "toast-top-right"});
        this.userForm.patchValue({currentPassword: "", newPassword: ""});
      }
    });
  }
}
