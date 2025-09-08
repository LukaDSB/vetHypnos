import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/minhaapi';

  private loggedIn = new BehaviorSubject<boolean>(this.tokenValido());
  public isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  login(dadosLogin: any): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, dadosLogin).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true); 
        }
      })
    );
  }

  registrar(dadosCadastro: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, dadosCadastro);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

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
      const expiracao = decodedToken.exp * 1000;
      return Date.now() < expiracao;
    } catch (e) {
      return false; 
    }
  }

  public getDadosUsuario(): { id: number, nome: string } | null {
    const token = this.getToken();
    if (!token || !this.tokenValido()) {
      return null;
    }
    const decodedToken: { data: { id: number, nome: string } } = jwtDecode(token);
    return decodedToken.data;
  }
}