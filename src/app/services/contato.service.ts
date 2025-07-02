import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from '../models/contato.model';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  private apiUrl = 'http://localhost/minhaapi';

  constructor(private http: HttpClient) {}

  getContato(): Observable<Contato[]> {
    return this.http.get<Contato[]>(`${this.apiUrl}/contato`);
  }

  cadastrarContato(contato: Contato): Observable<Contato>{
    return this.http.post<Contato>(`${this.apiUrl}/contato`, contato);
  }

  deletarContato(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/contato/${id}`);
  }
  
  atualizarContato(contato: Contato): Observable<Contato>{
    return this.http.put<Contato>(`${this.apiUrl}/contato/${contato.id}`, contato);
  }
}
