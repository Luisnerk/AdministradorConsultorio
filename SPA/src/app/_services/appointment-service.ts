import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AppointmentListModel } from '../_models/appointment-list-model';
import { Observable } from 'rxjs';
import { Appointment } from '../_models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl: string = environment.apiUrl;

  constructor (private http: HttpClient) {}

  getAppointments(): Observable<AppointmentListModel[]> {
    return this.http.get<AppointmentListModel[]>(this.baseUrl + "Appointment/all");
  }

  getByDate(date: string): Observable<AppointmentListModel[]>{
    let params = new HttpParams().set("date", date);
    return this.http.get<AppointmentListModel[]>(this.baseUrl + "Appointment/byDate", {params: params})
  }

  registerAppointment(model: any) {
    return this.http.post<Appointment>(this.baseUrl + "Appointment/register", model);
  }
}
