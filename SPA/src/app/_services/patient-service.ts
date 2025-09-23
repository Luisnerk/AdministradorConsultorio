import { Injectable } from '@angular/core';
import { Patient } from '../_models/patient';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/user-params';

@Injectable({
  providedIn: 'root'
})


export class PatientService {
  baseUrl = environment.apiUrl;
  patients: Patient[] = [];
  patientsCache = new Map();
  paginatedResult: PaginatedResult<Patient[]> = new PaginatedResult<Patient[]>

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

  getPaginatedPatients(userParams: UserParams): Observable<PaginatedResult<Patient[]>> {
    let params = new HttpParams();
    const url = this.baseUrl + "Patient/list";

    params = params.set("pageNumber", userParams.pageNumber)
                    .set("pageSize", userParams.pageSize);

    return this.getPaginatedResults<Patient[]>(url, params);
  }

  getPatientsByName(name: string): Observable<Patient[]> {
    const params = new HttpParams().set("name", name);
    return this.http.get<Patient[]>(this.baseUrl + "Patient/byName", {params: params});
  }

  getPaginatedPatientsByName(name: string, userParams: UserParams): Observable<PaginatedResult<Patient[]>> {
    const url = this.baseUrl + "Patient/listByName";
    const params = new HttpParams().set("name", name)
                                    .set("pageNumber", userParams.pageNumber)
                                    .set("pageSize", userParams.pageSize);
    return this.getPaginatedResults<Patient[]>(url, params);
  }
  
  getPatientsByNameLimit(name: string, limit: number = 5): Observable<Patient[]> {
    const params = new HttpParams().set("name", name).set("limit", limit);
    return this.http.get<Patient[]>(this.baseUrl + "Patient/byNameLimit", {params: params});
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


  private getPaginatedResults<T>(url: string, params: HttpParams): Observable<PaginatedResult<T>> {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>;
    return this.http.get<T>(url, {observe: "response", params:params}).pipe(
      map(response => {
        if (response.body) {
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get("Pagination");
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    )
  }
}
