import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicamento } from '../models/medicamento.model';

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  private apiUrl = 'http://localhost/minhaapi';

  constructor(private http: HttpClient) {}

  getMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(`${this.apiUrl}/medicamento`);
  }

  atualizarMedicamento(medicamento: Medicamento): Observable<Medicamento>{
    return this.http.put<Medicamento>(`${this.apiUrl}/medicamento/${medicamento.id}`, medicamento);
  }

  cadastrarMedicamento(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(`${this.apiUrl}/medicamento`, medicamento);
  }

  deletarMedicamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/medicamento/${id}`);
  }
}