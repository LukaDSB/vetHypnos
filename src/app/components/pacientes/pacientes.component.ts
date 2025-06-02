import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AnimalService } from 'src/app/services/animal.service';
import { Location } from '@angular/common';
import {Animal} from 'src/app/models/animal.model';
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
  dataSource: MatTableDataSource<Animal> = new MatTableDataSource<Animal>([]);
  displayedColumns: string[] = ['id', 'nome', 'especie_id', 'data_nascimento', 'tutor_id', 'peso', 'sexo', 'acoes'];
  @ViewChild('modalPacientes') modalPacientesComponent!: ModalPacientesComponent;


  constructor(private animalService: AnimalService, private location: Location) {}
  
  ngOnInit() {
    this.carregarDados();
  }

  cadastrarAnimal(animal: Animal) {
    console.log(animal);
    this.animalService.cadastrarAnimal(animal).subscribe({
      next: () => {
        this.carregarDados();
      },
      error: (err) => {
        console.error('Erro ao cadastrar animal:', err);
      }
    })
  }

  deletarAnimal(animal: Animal){
    if (confirm(`Deseja realmente excluir "${animal.nome}"?`)){
      this.animalService.deletarAnimal(animal.id).subscribe({
        next: () => {
          console.log(`Animal com ID ${animal.id} excluído.`);
          this.carregarDados();
        },
        error: (err) => {
          console.error(`Erro ao excluir animal de ${animal.id}`, err);
        }
      });
    }
  }

  atualizarAnimal(animal: Animal){
    this.modalPacientesComponent.openAtualizar(animal);
  }

  enviarAtualizacao(animal: Animal){
    this.animalService.atualizarAnimal(animal).subscribe({
      next: () => {
        console.log('Animal atualizado com sucesso.');
        this.carregarDados();
      },
      error: (err) => {
        console.log('Erro ao atualizar animal: ', err);
      }
    })
  }

  carregarDados() {
     this.animalService.getAnimais().subscribe((data) => {
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