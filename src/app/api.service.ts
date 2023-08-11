import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {

  }

  private createHeaders(): HttpHeaders {
    const firebaseToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNmM2I1YWRhM2NhMzkxNTQ4ZDM1OTJiMzU5MjkyM2UzNjAxMmI5MTQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUiBQIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBY0hUdGMxbzZkSWZScEQtcTVnZTYyTFFjc3RCOWYtYi11WjhjMndhMzlLaW9HVj1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9sZWFybmFueXRoaW5nLTE4N2M0IiwiYXVkIjoibGVhcm5hbnl0aGluZy0xODdjNCIsImF1dGhfdGltZSI6MTY5MTY1OTE5MiwidXNlcl9pZCI6IkZUTnhYQXZXUDlONDlka3dmT3hYMXZhRVJ4MDMiLCJzdWIiOiJGVE54WEF2V1A5TjQ5ZGt3Zk94WDF2YUVSeDAzIiwiaWF0IjoxNjkxNjYzMjMwLCJleHAiOjE2OTE2NjY4MzAsImVtYWlsIjoicm9icGVyY2l2YWw4MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMjU1Mzk5MzcxNzY5Nzk2MzE1OCJdLCJlbWFpbCI6WyJyb2JwZXJjaXZhbDgxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.DfGd5LyslJWp8GsB9KodcZ_UjaBSHGalrQDoxAFN43Wm5bXNBU9XZA7wiYNbqq4YDlaNFiahZEHZmkuuhrnPykUMTPgJcxJyhBkvUhBluComi9P5UgFo2R_U6hcgxBfaXHG4npk8ai3elcwS9m60vt9DTY6IByHhg3bdRO713ZjtkYddqhQ2Oir6-3b2i0inBIomOQdQrhNRUKm-dg7xzFibzsrw_WLRoFJRqn7sWv_TEXKufMkOPWU9PDf1Ku4UDXbxiauOi0T5WUhnWTF-iR2cahEKp1Mk3-RI9fKR9qr9AYNqwezwIoB7k3HF3XYKM60Acb2txCAMk8YHMVFPFA";
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'idToken': `${firebaseToken}`
    });
  }

  private baseUrl = environment.apiUrl;


  get<T>(resource: string): Observable<T> {
    const headers = this.createHeaders();
    return this.http.get<T>(`${this.baseUrl}/${resource}`, { headers });
  }

  post<T>(resource: string, data: any): Observable<T> {
    const headers = this.createHeaders();
    return this.http.post<T>(`${this.baseUrl}/${resource}`, data, { headers });
  }

  put<T>(resource: string, data: any): Observable<T> {
    const headers = this.createHeaders();
    return this.http.put<T>(`${this.baseUrl}/${resource}`, data, { headers });
  }

  delete<T>(resource: string): Observable<T> {
    const headers = this.createHeaders();
    return this.http.delete<T>(`${this.baseUrl}/${resource}`, { headers });
  }

}


