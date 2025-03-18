import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicamento } from '../models/medicamento.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  private apiUrl = 'http://localhost/minhaapi';

  constructor(private http: HttpClient) {}

  getMedicamentos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/getMedicamentos`);
  }
}
