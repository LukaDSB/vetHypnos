import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutor } from '../models/tutor.model';

@Injectable({
  providedIn: 'root',
})
export class TutorService {
  private apiUrl = 'http://localhost/minhaapi';

  constructor(private http: HttpClient) {}

  getTutores(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(`${this.apiUrl}/tutor`);
  }

  cadastrarTutor(tutor: Tutor): Observable<Tutor>{
      return this.http.post<Tutor>(`${this.apiUrl}/tutor`, tutor);
    }
  
    deletarTutor(id:number): Observable<void>{
      return this.http.delete<void>(`${this.apiUrl}/tutor/${id}`);
    }
    
    atualizarTutor(tutor: Tutor): Observable<Tutor>{
      return this.http.put<Tutor>(`${this.apiUrl}/tutor/${tutor.id}`, tutor);
    }
}
