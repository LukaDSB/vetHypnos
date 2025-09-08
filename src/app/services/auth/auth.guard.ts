// src/app/services/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Usamos o método tokenValido() que já criamos
  if (authService.tokenValido()) {
    return true; // Permite o acesso à rota
  } else {
    // Se não estiver logado, redireciona para a página inicial (onde o modal vai aparecer)
    router.navigate(['/']);
    return false; // Bloqueia o acesso à rota
  }
};