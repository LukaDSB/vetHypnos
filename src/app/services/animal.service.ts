import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Animal} from '../models/animal.model';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiUrl = 'http://localhost:8000/minhaapi';

  constructor(private http: HttpClient) {}

  // getAnimais(): Observable<Animal[]> {
  //   return this.http.get<Animal[]>(`${this.apiUrl}/animal`);
  // }

  getAnimais(filtros?: any): Observable<Animal[]> {
    let params = new HttpParams();

    if (filtros) {
      // Itera sobre as chaves do objeto de filtros (ex: 'nome')
      Object.keys(filtros).forEach(key => {
        // Adiciona o parâmetro apenas se ele tiver um valor
        if (filtros[key]) {
          params = params.append(key, filtros[key]);
        }
      });
    }

    // O objeto { params } é adicionado às opções da requisição GET
  return this.http.get<Animal[]>(`${this.apiUrl}/animal`, { params });
  }

  cadastrarAnimal(animal: Animal): Observable<Animal>{
    return this.http.post<Animal>(`${this.apiUrl}/animal`, animal);
  }

  deletarAnimal(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/animal/${id}`);
  }
  
  atualizarAnimal(animal: Animal): Observable<Animal>{
    return this.http.put<Animal>(`${this.apiUrl}/animal/${animal.id}`, animal);
  }
}
