import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Medicamento } from 'src/app/models/medicamento.model';
import { Usuario } from 'src/app/models/usuario.model';
import { MedicamentoService } from 'src/app/services/medicamento.service';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss']
})
export class MedicamentosComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>([]);
  displayedColumns: string[] = ['id', 'nome', 'Concentracao','Fabricante','Lote','Validade','Quantidade', 'acoes'];

  constructor(private medicamentoService: MedicamentoService) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.medicamentoService.getMedicamentos().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  deleteItem(item: Usuario) {
    console.log('Deletar item:', item);
  }
}