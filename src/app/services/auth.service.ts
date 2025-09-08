// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/minhaapi'; // URL base da sua API PHP

  // BehaviorSubject para gerenciar o estado de login de forma reativa
  private loggedIn = new BehaviorSubject<boolean>(this.tokenValido());
  // Observable público para que os componentes possam se inscrever e reagir às mudanças
  public isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  // --- MÉTODOS DE COMUNICAÇÃO COM API ---

  login(dadosLogin: any): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, dadosLogin).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true); // Emite o novo estado de login
        }
      })
    );
  }

  registrar(dadosCadastro: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, dadosCadastro);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false); // Emite o novo estado de logout
    // Opcional: Redirecionar para a página inicial
    // window.location.href = '/';
  }

  // --- MÉTODOS AUXILIARES DE TOKEN ---

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public tokenValido(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const expiracao = decodedToken.exp * 1000; // Converte para milissegundos
      return Date.now() < expiracao;
    } catch (e) {
      return false; // Token inválido ou mal formatado
    }
  }

  // Método para obter os dados do usuário do token
  public getDadosUsuario(): { id: number, nome: string } | null {
    const token = this.getToken();
    if (!token || !this.tokenValido()) {
      return null;
    }
    const decodedToken: { data: { id: number, nome: string } } = jwtDecode(token);
    return decodedToken.data;
  }
}