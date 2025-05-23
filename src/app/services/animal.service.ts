import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Animal} from '../models/animal.model';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiUrl = 'http://localhost/minhaapi';

  constructor(private http: HttpClient) {}

  getAnimais(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiUrl}/animal`);
  }

  cadastrarAnimal(animal: Animal): Observable<Animal>{
    return this.http.post<Animal>(`${this.apiUrl}/animal`, animal);
  }

  deletarAnimal(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/animal/${id}`);
  }
}
