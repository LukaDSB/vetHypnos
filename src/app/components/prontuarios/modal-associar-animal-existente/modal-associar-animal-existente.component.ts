import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { TabelaComponent } from '../../hdk/tabela/hdk-tabela.component';
import { MatTableDataSource } from '@angular/material/table';
import { Animal } from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal.service';



@Component({
  selector: 'app-modal-associar-animal-existente',
  templateUrl: './modal-associar-animal-existente.component.html',
  styleUrls: ['./modal-associar-animal-existente.component.scss'],
  standalone: true,
  imports: [HdkButtonComponent, TabelaComponent, CommonModule],
})
export class ModalAssociarAnimalExistenteComponent {
  isAssociarAnimalExistenteModalOpen = false;
  dataSource: MatTableDataSource<Animal> = new MatTableDataSource<Animal>([]);
   displayedColumns: string[] = ['id', 'nome', 'especie_id', 'data_nascimento', 'tutor_id', 'peso', 'sexo', 'selecionar'];

  constructor(private animalService: AnimalService){}

   ngOnInit() {
    this.carregarDadosAnimais();
  }

  carregarDadosAnimais(){
      this.animalService.getAnimais().subscribe((data) => {
       this.dataSource = new MatTableDataSource(data);
    });
  }

   openModal() {
    this.isAssociarAnimalExistenteModalOpen = true;
  }

  closeModal(){
    this.isAssociarAnimalExistenteModalOpen = false;
  }
}
