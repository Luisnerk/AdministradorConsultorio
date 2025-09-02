import { Injectable } from '@angular/core';
import { Patient } from '../_models/patient';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class PatientService {
  baseUrl = environment.apiUrl;
  patients: Patient[] = [];
  patientsCache = new Map();

  constructor(private http: HttpClient) {}

  getMembers(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl + "Patient/all");
  }
}
