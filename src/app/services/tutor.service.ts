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

  deletarTutor(id: number): Observable<Tutor[]> {
      return this.http.delete<Tutor[]>(`${this.apiUrl}/tutor/${id}`);
  }

  cadastrarTutor(tutor: Tutor): Observable<Tutor> {
    return this.http.post<Tutor>(`${this.apiUrl}/tutor/`, tutor);
  }
}