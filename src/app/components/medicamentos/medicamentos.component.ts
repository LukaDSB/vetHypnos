import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Medicamento } from 'src/app/models/medicamento.model';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { Location } from '@angular/common';
import { ModalMedicamentosComponent } from './modal-medicamentos/modal-medicamentos.component';
import { HdkDivisor } from '../hdk/divisor/hdk-divisor.component';
import { HdkButtonComponent } from '../hdk/button/hdk-button.component';
import { TabelaComponent } from '../hdk/tabela/hdk-tabela.component';
import { HdkModalFeedbackComponent } from '../hdk/hdk-modal-feedback/hdk-modal-feedback.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss'],
  standalone: true,
  imports: [ModalMedicamentosComponent, HdkDivisor, HdkButtonComponent, TabelaComponent, HdkModalFeedbackComponent],
})

export class MedicamentosComponent implements OnInit {
  dataSource: MatTableDataSource<Medicamento> = new MatTableDataSource<Medicamento>([]);
  displayedColumns: string[] = ['id', 'nome', 'concentracao', 'fabricante', 'lote', 'acoes'];
  @ViewChild('modalMedicamentos') modalMedicamentosComponent!: ModalMedicamentosComponent;
  @ViewChild(HdkModalFeedbackComponent) modalFeedback!: HdkModalFeedbackComponent;

  constructor(private location: Location, private medicamentoService: MedicamentoService) {}

    private confirmacaoSubscription?: Subscription;
  

  ngOnInit() {
    this.carregarDados();
  }

  cadastrarMedicamento(medicamento: Medicamento) {
    this.medicamentoService.cadastrarMedicamento(medicamento).subscribe({
      next: () => {
        this.carregarDados();
      },
      error: (err) => {
        console.error('Erro ao cadastrar medicamento:', err);
      }
    });
  }

  deletarMedicamento(medicamento: Medicamento) {
    this.confirmacaoSubscription?.unsubscribe();

    this.modalFeedback.open(
      'confirmacao',
      'Confirmar Exclusão',
      `Deseja realmente excluir o animal "${medicamento.nome}"? Esta ação não pode ser desfeita.`,
      'Sim, Excluir',
      'Cancelar'
    );
    this.confirmacaoSubscription = this.modalFeedback.confirmado.subscribe(() => {
      this.medicamentoService.deletarMedicamento(medicamento.id).subscribe({
        next: () => {
          this.modalFeedback.open('sucesso', 'Sucesso!', `O medicamento "${medicamento.nome}" foi excluído.`);
          this.carregarDados();
        },
        error: (err) => {
          this.modalFeedback.open('erro', 'Erro!', 'Ocorreu um erro ao tentar excluir o animal.');
          console.error(`Erro ao excluir medicamento de ${medicamento.id}`, err);
        }
      });
    });
  }

  enviarAtualizacao(medicamento: Medicamento) {
    this.medicamentoService.atualizarMedicamento(medicamento).subscribe({
      next: () => {
        console.log('Medicamento atualizado com sucesso!');
        this.carregarDados();
      },
      error: (err) => {
        console.error('Erro ao atualizar medicamento:', err);
      }
    });
  }
  
  atualizarMedicamento(medicamento: Medicamento) {
    this.modalMedicamentosComponent.openAtualizar(medicamento);
  }

  carregarDados() {
    this.medicamentoService.getMedicamentos().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  voltar(){
    this.location.back();
  }

  abrirModalCadastro(){
    this.modalMedicamentosComponent.openCadastro();
  }

  buscarMedicamentos(){}
}