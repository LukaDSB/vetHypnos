import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';
import { AppPrincipal } from './components/principal/app.principal';
import { ProntuariosComponent } from './components/prontuarios/prontuarios.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { TutoresComponent } from './components/tutores/tutores.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PageProntuarioComponent } from './components/page-prontuario/page-prontuario.component';






const routes: Routes = [
  { path: 'pacientes', component: PacientesComponent },
  { path: 'medicamentos', component: MedicamentosComponent },
  { path: 'principal', component: AppPrincipal },
  { path: 'prontuarios', component: ProntuariosComponent },
  { path: 'pageProntuario', component: PageProntuarioComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  { path: 'tutores', component: TutoresComponent },
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'usuario', component: UsuariosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
