import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);

  post<T>(url: string, body: unknown) {
    return this.http.post<T>(`${environment.apiUrl}${url}`, body);
  }

  get<T>(url: string) {
    return this.http.get<T>(`${environment.apiUrl}${url}`);
  }

  put<T>(url: string, body: unknown) {
    return this.http.put<T>(`${environment.apiUrl}${url}`, body);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(`${environment.apiUrl}${url}`);
  }
}
