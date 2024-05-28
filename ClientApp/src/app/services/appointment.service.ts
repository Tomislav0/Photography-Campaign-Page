import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(
    public http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string
  ) { }

  public getAppointments(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'Appointment');
  }

  public getDates(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'Appointment/dates');
  }

  public createAppointment(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Appointment', data);
  }

  public approveAppointment(id: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `Appointment/approve`, { id: id });
  }

  public declineAppointment(id: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `Appointment/decline`, { id: id });
  }

  public deleteAppointment(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `Appointment/${id}`);
  }
}
