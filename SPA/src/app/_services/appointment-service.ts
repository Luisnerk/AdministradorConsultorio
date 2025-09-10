import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AppointmentListModel } from '../_models/appointment-list-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseUrl: string = environment.apiUrl;

  constructor (private http: HttpClient) {}

  getAppointments(): Observable<AppointmentListModel[]> {
    return this.http.get<AppointmentListModel[]>(this.baseUrl + "Appointment/all");
  }
}
