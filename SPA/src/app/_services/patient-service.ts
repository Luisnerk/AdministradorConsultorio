import { Injectable } from '@angular/core';
import { Patient } from '../_models/patient';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(this.baseUrl + `Patient/${id}`);
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl + "Patient/all");
  }

  getPatientsByName(name: string): Observable<Patient[]> {
    const params = new HttpParams().set("name", name);
    return this.http.get<Patient[]>(this.baseUrl + "Patient/byName", {params: params})
  }

  updatePatient(model: any): Observable<any> {
    return this.http.patch(this.baseUrl + "Patient", model, {observe: 'response'});
  }

  deletePatient(model: any): Observable<any> {
    console.log(model);
    return this.http.delete(this.baseUrl + "Patient", {body: model});
  }

  register(model: any) {
    return this.http.post<Patient>(this.baseUrl + "Patient/add", model);
  }

}
