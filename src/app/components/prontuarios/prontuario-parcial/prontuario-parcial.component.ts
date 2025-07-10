/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HdkDivisor } from '../../hdk/divisor/hdk-divisor.component';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { ProntuarioParcialModalAdicionarMedicamentosComponent } from './prontuario-parcial-modal-adicionar-medicamentos/prontuario-parcial-modal-adicionar-medicamentos.component';
import { Animal } from 'src/app/models/animal.model';
import { Router } from '@angular/router';
// 1. Importe a interface Medicamento
import { Medicamento } from 'src/app/models/medicamento.model';

@Component({
  selector: 'app-prontuario-parcial',
  templateUrl: './prontuario-parcial.component.html',
  styleUrls: ['./prontuario-parcial.component.scss'],
  standalone: true,
  imports: [MatTableModule, NgFor, NgIf, FormsModule, HdkDivisor, HdkButtonComponent, ProntuarioParcialModalAdicionarMedicamentosComponent],
})
export class ProntuarioParcialComponent {
  displayedColumns: string[] = ['parametro', 'col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8', 'col9', 'col10'];
  parametros: string[] = ['FC', 'FR', 'SPO2', 'ETCO2', 'PA', 'Globo Ocular', 'Ref.Palpebral'];
  
  // --- DADOS RECEBIDOS ---
  dadosRecebidos: Animal | undefined;
  // 2. Adicione uma propriedade para armazenar os medicamentos recebidos
  medicamentosRecebidos: Medicamento[] = [];
  
  @ViewChild('modalAdicionarMedicamentos') modalAdicionarMedicamentos!: ProntuarioParcialModalAdicionarMedicamentosComponent;
  
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    // 3. Atualize a tipagem do state para incluir os novos dados
    const state = navigation?.extras.state as { animal: Animal, medicamentos: Medicamento[] };
    
    // 4. Atribua os dados do animal e dos medicamentos às propriedades da classe
    if (state) {
        this.dadosRecebidos = state.animal; 
        this.medicamentosRecebidos = state.medicamentos;

        // Log para confirmar o recebimento dos dados
        console.log('Animal Recebido:', this.dadosRecebidos);
        console.log('Medicamentos Recebidos:', this.medicamentosRecebidos);
    }
  }

  // O restante da sua classe permanece exatamente igual
  dataSource = this.parametros.map((param) => {
    const row: any = { parametro: param };
    for (let i = 1; i <= 10; i++) {
      row['col' + i] = '';
    }
    return row;
  });

  abrirModalCadastro() {
    this.modalAdicionarMedicamentos.openCadastro();
  } 
}