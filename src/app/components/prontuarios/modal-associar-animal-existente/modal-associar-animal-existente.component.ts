// modal-associar-animal-existente.component.ts

import { Component, EventEmitter, Output } from '@angular/core'; // 1. Importar EventEmitter e Output
import { CommonModule } from '@angular/common';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { TabelaComponent } from '../../hdk/tabela/hdk-tabela.component';
import { MatTableDataSource } from '@angular/material/table';
import { Animal } from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-associar-animal-existente',
  templateUrl: './modal-associar-animal-existente.component.html',
  styleUrls: ['./modal-associar-animal-existente.component.scss'],
  standalone: true,
  imports: [HdkButtonComponent, TabelaComponent, CommonModule],
})
export class ModalAssociarAnimalExistenteComponent {
  @Output() onNavigateAndClose = new EventEmitter<void>();

  isAssociarAnimalExistenteModalOpen = false;
  dataSource: MatTableDataSource<Animal> = new MatTableDataSource<Animal>([]);
  displayedColumns: string[] = ['id', 'nome', 'especie_id', 'data_nascimento', 'tutor_id', 'peso', 'sexo', 'selecionar'];
  selecionados: Animal[] = [];

  constructor(private animalService: AnimalService, private router: Router) {}

  ngOnInit() {
    this.carregarDadosAnimais();
  }

  receberSelecionados(animaisSelecionados: Animal[]) {
    this.selecionados = animaisSelecionados;
    console.log('Modal recebeu:', this.selecionados);
  }

  carregarDadosAnimais() {
    this.animalService.getAnimais().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  irParaAdicionarMedicamentos() {
    if (this.selecionados && this.selecionados.length > 0) {
      console.log(`Enviando para detalhes:`, this.selecionados);
      
      this.router.navigate(['/prontuarios/selecionarMedicamentos'], {
        state: { dadosSelecionados: this.selecionados } 
      });

      this.onNavigateAndClose.emit();

    } else {
      console.log('Nenhum animal selecionado.');
    }
  }

  openModal() {
    this.isAssociarAnimalExistenteModalOpen = true;
  }

  closeModal() {
    this.isAssociarAnimalExistenteModalOpen = false;
  }
}
