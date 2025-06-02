import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prontuario } from '../models/prontuario';

@Injectable({
  providedIn: 'root',
})
export class ProntuarioService {
  private apiUrl = 'http://localhost/minhaapi';

  constructor(private http: HttpClient) {}

  getProntuarios(): Observable<Prontuario[]> {
    return this.http.get<Prontuario[]>(`${this.apiUrl}/prontuario`);
  }

  criarProntuario(prontuario:Prontuario):Observable<Prontuario>{
    return this.http.post<Prontuario>(`${this.apiUrl}/prontuario`, prontuario);
  }

  deletarProntuario(id: number):Observable<Prontuario>{
    return this.http.delete<Prontuario>(`${this.apiUrl}/prontuario/${id}`);
  }

  atualizarProntuario(prontuario: Prontuario): Observable<Prontuario>{
    return this.http.put<Prontuario>(`${this.apiUrl}/prontuario/${prontuario.id}`, prontuario);
  }
}
