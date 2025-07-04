import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HdkButtonComponent } from "../../../hdk/button/hdk-button.component";
import { ModalAssociarAnimalExistenteComponent } from '../../modal-associar-animal-existente/modal-associar-animal-existente.component';
import { ModalAnimalComponent } from 'src/app/components/animais/modal-animal/modal-animal.component';
import { Animal } from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'associar-animal-modal',
  templateUrl: './associar-animal-modal.component.html',
  styleUrls: ['./associar-animal-modal.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, HdkButtonComponent, ModalAnimalComponent, ModalAssociarAnimalExistenteComponent]
})

export class AssociarAnimalModalComponent {
  modalAssociar = true;
  modalNovoAnimal = false
  modalSelecionarPaciete = false;
  email = '';
  senha = '';
  nome = '';
  dataSource: MatTableDataSource<Animal> = new MatTableDataSource<Animal>([]);
  @ViewChild ('modalAssociarAnimalExistente') modalAssociarAnimalExistenteComponent! : ModalAssociarAnimalExistenteComponent
  @ViewChild('modalAnimal') modalAnimalComponent!: ModalAnimalComponent;

  constructor(private animalService: AnimalService) {}

  isModalNovoAnimal(){
    this.modalNovoAnimal = true;
    this.modalAssociar = false;
  }

  isModalSelecionarAnimal(){
    this.modalSelecionarPaciete = true;
    this.modalAssociar = false;
  }

  abrirModalCadastro() {
    this.modalAnimalComponent.openCadastro();
  }

  fecharModalCadastro(){
    this.modalAssociar = false;
  }

  abrirModalAssociarAnimalExistente() {
    this.modalAssociarAnimalExistenteComponent.openModal();
  }

  cadastrarAnimal(animal: Animal) {
    console.log(animal);
    this.animalService.cadastrarAnimal(animal).subscribe({
      error: (err) => {
        console.error('Erro ao cadastrar animal:', err);
      }
    })
  }
}
