import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  private baseUrl = environment.apiUrl;

  get<T>(resource: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${resource}`);
  }

  post<T>(resource: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${resource}`, data);
  }

  put<T>(resource: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${resource}`, data);
  }

  delete<T>(resource: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${resource}`);
  }

}


