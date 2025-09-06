import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicamento } from '../models/medicamento.model';
import { CategoriasMedicamento } from '../models/CategoriaMedicamento';

@Injectable({
  providedIn: 'root',
})
export class CategoriasMedicamentoService {
  private apiUrl = 'http://localhost:8000/minhaapi';

  constructor(private http: HttpClient) {}

  getCategoriasMedicamento(): Observable<CategoriasMedicamento[]> {
    return this.http.get<CategoriasMedicamento[]>(`${this.apiUrl}/categoria_medicamento`);
  }
}