import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalPacientesComponent } from './modal-pacientes/modal-pacientes.component';
import { HdkButtonComponent } from '../hdk/button/hdk-button.component';
import { HdkDivisor } from '../hdk/divisor/hdk-divisor.component';
import { TabelaComponent } from '../hdk/tabela/hdk-tabela.component';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  standalone: true,
   imports: [ModalPacientesComponent, HdkButtonComponent, HdkDivisor, TabelaComponent],
})
export class PacientesComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>([]);
  displayedColumns: string[] = ['id', 'nome', 'email', 'especialidade', 'acoes'];
  @ViewChild('modalPacientes') modalPacientesComponent!: ModalPacientesComponent;


  constructor(private usuarioService: UsuarioService, private location: Location) {}
  
  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  voltar(){
    this.location.back();
  }

  abrirModalCadastro() {
  this.modalPacientesComponent.openCadastro();
}
}