import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../_services/account-service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);
  const router = inject(Router);


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        switch (error.status){
          case (401):
            accountService.logout();
            router.navigate([""]);
            toastr.error("Debes iniciar sesión", "Error de autenticación");
            break;
          default:
            toastr.error("Ha ocurrido un error inesperado", "Error");
            break;
        }
      }
      throw error;
    })
  );
};
