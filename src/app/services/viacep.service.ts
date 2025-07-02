import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViaCep } from '../models/viacep.model';

@Injectable({
  providedIn: 'root',
})
export class ViaCepService {
  private apiUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

    getEnderecosViaCEP(cep: string): Observable<ViaCep> {
    return this.http.get<ViaCep>(`${this.apiUrl}/${cep}/json/`);
  }

   getEnderecosViaCidade(endereco: ViaCep): Observable<ViaCep> {
    return this.http.get<ViaCep>(`${this.apiUrl}/${endereco.cidade}/json/`);
  }

  getEnderecosViaEstado(endereco: ViaCep): Observable<ViaCep[]> {
    return this.http.get<ViaCep[]>(`${this.apiUrl}/${endereco.estado}/json/`);
  }

}
