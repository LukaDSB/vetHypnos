import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';
import { AppPrincipal } from './components/principal/app.principal';
import { ProntuariosComponent } from './components/prontuarios/prontuarios.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { TutoresComponent } from './components/tutores/tutores.component';
import { DetalhesAnimalComponent } from './components/animais/detalhes-animal/detalhes-animal.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PageProntuarioComponent } from './components/page-prontuario/page-prontuario.component';
import { ProntuarioParcialComponent } from './components/prontuarios/prontuario-parcial/prontuario-parcial.component';
import { AnimaisComponent } from './components/animais/animais.component';
import { ProntuarioProvisorioComponent } from './components/prontuario-provisorio/prontuario-provisorio.component';
import { SelecionarMedicamentosComponent } from './components/prontuarios/selecionar-medicamentos/selecionar-medicamentos.component';


const routes: Routes = [
  { path: 'animais', component: AnimaisComponent },
  { path: 'animais/detalhes', component: DetalhesAnimalComponent},
  { path: 'medicamentos', component: MedicamentosComponent },
  { path: 'principal', component: AppPrincipal },
  { path: 'prontuarios', component: ProntuariosComponent },
  { path: 'prontuarios/prontuarioParcial', component: ProntuarioParcialComponent},
  { path: 'prontuarios/finalizarProntuario', component: PageProntuarioComponent},
  { path: 'prontuarios/selecionarMedicamentos', component: SelecionarMedicamentosComponent},
  { path: 'pageProntuario', component: PageProntuarioComponent },
  { path: 'prontuarios/gerarProntuario', component: ProntuarioProvisorioComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  { path: 'tutores', component: TutoresComponent },
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'usuario', component: UsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
