import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoProcedimento } from '../models/tipoProcedimento.model';


@Injectable({
  providedIn: 'root',
})
export class TipoProcedimentoService {
    private apiUrl = 'http://localhost:8000/minhaapi';

    constructor(private http: HttpClient) { }

    getTipoProcedimento(): Observable<TipoProcedimento[]> {
        return this.http.get<TipoProcedimento[]>(`${this.apiUrl}/tipo_procedimento`);
    }

}
