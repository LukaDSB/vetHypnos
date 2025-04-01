import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Medicamento } from 'src/app/models/medicamento.model';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss']
})

export class MedicamentosComponent implements OnInit {
  dataSource: MatTableDataSource<Medicamento> = new MatTableDataSource<Medicamento>([]);
  displayedColumns: string[] = ['id', 'nome', 'concentracao', 'fabricante', 'lote', 'acoes'];

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
}