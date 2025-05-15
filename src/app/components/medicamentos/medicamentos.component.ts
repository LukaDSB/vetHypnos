import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Medicamento } from 'src/app/models/medicamento.model';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { Location } from '@angular/common';
import { ModalMedicamentosComponent } from './modal-medicamentos/modal-medicamentos.component';
import { HdkDivisor } from '../hdk/divisor/hdk-divisor.component';
import { HdkButtonComponent } from '../hdk/button/hdk-button.component';
import { TabelaComponent } from '../hdk/tabela/hdk-tabela.component';


@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss'],
  standalone: true,
  imports: [ModalMedicamentosComponent, HdkDivisor, HdkButtonComponent, TabelaComponent],
})

export class MedicamentosComponent implements OnInit {
  dataSource: MatTableDataSource<Medicamento> = new MatTableDataSource<Medicamento>([]);
  displayedColumns: string[] = ['id', 'nome', 'concentracao', 'fabricante', 'lote', 'acoes'];
  @ViewChild('modalMedicamentos') modalMedicamentosComponent!: ModalMedicamentosComponent;

  constructor(private location: Location, private medicamentoService: MedicamentoService) {}

  ngOnInit() {
    this.carregarDados();
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
}