import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especie } from '../models/especie.model';

@Injectable({
  providedIn: 'root',
})
export class EspecieService {
  private apiUrl = 'http://localhost:8000/minhaapi';

  constructor(private http: HttpClient) {}

  getEspecie(): Observable<Especie[]> {
    return this.http.get<Especie[]>(`${this.apiUrl}/especie`);
  }
}
