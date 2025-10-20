/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from '../models/tutor.model';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private apiUrl = 'http://localhost:8000/minhaapi';

  constructor(private http: HttpClient) { }

  getTutores(): Observable<Tutor[]> {
      return this.http.get<Tutor[]>(`${this.apiUrl}/tutor`);
  }

  deletarTutor(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/tutor/${id}`);
  }

  cadastrarTutor(tutor: Tutor): Observable<Tutor> {
    console.log('Objeto Tutor sendo enviado para cadastro:', tutor);
    return this.http.post<Tutor>(`${this.apiUrl}/tutor/`, tutor);
  }

  atualizarTutor(tutor: Tutor): Observable<Tutor> {
    console.log('Objeto Tutor sendo enviado para atualização:', tutor);
    return this.http.put<Tutor>(`${this.apiUrl}/tutor/${tutor.id}`, tutor);
  }
}