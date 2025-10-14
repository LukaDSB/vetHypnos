import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tutor } from 'src/app/models/tutor.model';
import { TutorService } from 'src/app/services/tutor.service';
import { HdkButtonComponent } from '../hdk/button/hdk-button.component';
import { HdkDivisor } from '../hdk/divisor/hdk-divisor.component';
import { TabelaComponent } from '../hdk/tabela/hdk-tabela.component';
import { HdkModalFeedbackComponent } from '../hdk/hdk-modal-feedback/hdk-modal-feedback.component';
import { ModalTutoresComponent } from './modal-tutores/modal-tutores.component';

@Component({
  selector: 'app-tutores',
  templateUrl: './tutores.component.html',
  styleUrls: ['./tutores.component.scss'],
  standalone: true,
  imports: [HdkButtonComponent, HdkDivisor, TabelaComponent, HdkModalFeedbackComponent, ModalTutoresComponent],
})
export class TutoresComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Tutor> = new MatTableDataSource<Tutor>([]);
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'endereco', 'acoes'];
  
  @ViewChild('modalTutor') modalTutorComponent!: ModalTutoresComponent;
  @ViewChild(HdkModalFeedbackComponent) modalFeedback!: HdkModalFeedbackComponent;
  private confirmacaoSubscription?: Subscription; 

  constructor(
    private tutorService: TutorService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.tutorService.getTutores().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  cadastrarTutor(tutor: Tutor) {
    this.tutorService.cadastrarTutor(tutor).subscribe({
      next: () => {
        this.carregarDados();
        this.modalFeedback.open('sucesso', 'Sucesso', 'Tutor cadastrado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao cadastrar tutor:', err);
        this.modalFeedback.open('erro', 'Erro', 'Erro ao cadastrar tutor.');
      }
    });
  }

  editarTutor(tutor: Tutor) {
    this.modalTutorComponent.openAtualizar(tutor);
  }

  atualizarTutor(tutor: Tutor) {
    this.tutorService.atualizarTutor(tutor).subscribe({
      next: () => {
        this.carregarDados();
        this.modalFeedback.open('sucesso', 'Sucesso', 'Tutor atualizado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao atualizar tutor:', err);
        this.modalFeedback.open('erro', 'Erro', 'Erro ao atualizar tutor.');
      }
    });
  }

  visualizarDetalhes(tutor: Tutor) {
    const rotaDestino = '/tutores/detalhes';
    
    console.log('Redirecionando para detalhes do tutor:', tutor);
    
    this.router.navigate([rotaDestino], {
      state: { dadosSelecionados: [tutor] }
    });
  }

  deletarTutor(tutor: Tutor) {
      if (confirm(`Deseja realmente excluir "${tutor.nome}"?`)) {
        this.tutorService.deletarTutor(tutor.id).subscribe({
          next: () => {
            console.log(`Tutor com ID ${tutor.id} excluído.`);
            this.carregarDados();
          },
          error: (err) => {
            console.error('Erro ao excluir tutor:', err);
          }
        });
      }
    }

  abrirModalCadastro() {
    this.modalTutorComponent.openCadastro();
  }

  voltar() {
    this.location.back();
  }

  ngOnDestroy() {
    this.confirmacaoSubscription?.unsubscribe();
  }
}
