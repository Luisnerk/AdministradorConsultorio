import { Injectable } from '@angular/core';
import { Patient } from '../_models/patient';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class PatientService {
  baseUrl = environment.apiUrl;
  patients: Patient[] = [];
  patientsCache = new Map();

  private formSubmitSubject = new Subject<void>();
  formSubmit$ = this.formSubmitSubject.asObservable();

  constructor(private http: HttpClient) {}

  notifyChange() {
    this.formSubmitSubject.next();
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl + "Patient/all");
  }

  register(model: any) {
    return this.http.post<Patient>(this.baseUrl + "Patient/add", model);
  }
}
