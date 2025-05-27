import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { TabelaComponent } from '../../hdk/tabela/hdk-tabela.component';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-modal-associar-animal-existente',
  templateUrl: './modal-associar-animal-existente.component.html',
  styleUrls: ['./modal-associar-animal-existente.component.scss'],
  standalone: true,
  imports: [HdkButtonComponent, TabelaComponent, CommonModule],
})
export class ModalAssociarAnimalExistenteComponent {
  isAssociarPacienteExistenteModalOpen = false;
  //dataSource: MatTableDataSource<Animal> = new MatTableDataSource<Animal>([]);
  displayedColumns: string[] = ['id', 'nome_animal', 'especie', 'idade', 'peso', 'sexo'];


   openModal() {
    console.log('teste aaaaaaa');
    this.isAssociarPacienteExistenteModalOpen = true;
  }

  closeModal(){
    this.isAssociarPacienteExistenteModalOpen = false;
  }
}
