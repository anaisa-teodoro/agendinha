import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compromisso } from '../models/compromisso';

@Injectable({
  providedIn: 'root'
})
export class CompromissoService {
  private apiUrl = 'http://localhost:3000/compromissos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Compromisso[]> {
    return this.http.get<Compromisso[]>(this.apiUrl);
  }

  getById(id: number): Observable<Compromisso> {
    return this.http.get<Compromisso>(`${this.apiUrl}/${id}`);
  }

  create(compromisso: Compromisso): Observable<Compromisso> {
    return this.http.post<Compromisso>(this.apiUrl, compromisso);
  }

  update(id: number, compromisso: Compromisso): Observable<Compromisso> {
    return this.http.put<Compromisso>(`${this.apiUrl}/${id}`, compromisso);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}