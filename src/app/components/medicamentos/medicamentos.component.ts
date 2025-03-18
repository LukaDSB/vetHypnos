import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss']
})
export class MedicamentosComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>([]);
  displayedColumns: string[] = ['id', 'nome', 'email', 'especialidade', 'acoes'];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  deleteItem(item: Usuario) {
    console.log('Deletar item:', item);
  }
}