import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map, Observable, Observer } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;

  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor (private http: HttpClient) {}

  login(model: User) {
    return this.http.post<User>(this.baseUrl + "Account/login", model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  updateUser(model: any): Observable<void> {
    console.log("fun")
    return this.http.patch<User>(this.baseUrl + "Account", model).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          this.setCurrentUser(response);
        }
      })
    );
  }
}
