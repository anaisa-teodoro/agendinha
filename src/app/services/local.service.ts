import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Local } from '../models/local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private apiUrl = 'http://localhost:3000/locais';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Local[]> {
    return this.http.get<Local[]>(this.apiUrl);
  }

  getById(id: number): Observable<Local> {
    return this.http.get<Local>(`${this.apiUrl}/${id}`);
  }

  create(local: Local): Observable<Local> {
    return this.http.post<Local>(this.apiUrl, local);
  }

  update(id: number, local: Local): Observable<Local> {
    return this.http.put<Local>(`${this.apiUrl}/${id}`, local);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}