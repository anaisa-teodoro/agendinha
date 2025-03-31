import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://api-users-gdsb.onrender.com';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/users`);
  }

  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/users/${id}`);
  }

  create(usuario: Usuario): Observable<Usuario> {
    const payload = {
      name: usuario.nome,
      email: usuario.email,
      password: usuario.senha,
      role: usuario.nivelAcesso === 'admin' ? 'adm' : 'user' 
    };
    console.log('Enviando para /register:', payload); 
    return this.http.post<Usuario>(`${this.apiUrl}/register`, payload);
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/users/${id}`, usuario);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}