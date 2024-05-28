import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authorizedSubject: Subject<boolean> = new Subject();
  constructor(
    public http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string
  ) { }
  public isLoggedIn(): boolean {
    return localStorage.getItem("auth_token") != null;
  }

  public login(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'account/login', data);
  }

  public logout() {
    localStorage.clear();
    window.location.reload();
  }

  public register(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'account/register', data);
  }
}
