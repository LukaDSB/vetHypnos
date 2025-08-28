/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HdkDivisor } from '../../hdk/divisor/hdk-divisor.component';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { ProntuarioParcialModalAdicionarMedicamentosComponent } from './prontuario-parcial-modal-adicionar-medicamentos/prontuario-parcial-modal-adicionar-medicamentos.component';
import { Animal } from 'src/app/models/animal.model';
import { Router } from '@angular/router';
import { Medicamento } from 'src/app/models/medicamento.model';
import { ProntuarioService } from 'src/app/services/prontuario.service';
import { MedicoesClinicas } from 'src/app/models/MedicoesClinicas.model';

@Component({
  selector: 'app-prontuario-parcial',
  templateUrl: './prontuario-parcial.component.html',
  styleUrls: ['./prontuario-parcial.component.scss'],
  standalone: true,
  imports: [MatTableModule, NgFor, NgIf, FormsModule, HdkDivisor, HdkButtonComponent, ProntuarioParcialModalAdicionarMedicamentosComponent],
})
export class ProntuarioParcialComponent implements OnInit {
  displayedColumns: string[] = ['parametro', 'col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8', 'col9', 'col10'];
  parametros: string[] = ['FC', 'FR', 'SPO2', 'ETCO2', 'PA', 'Globo Ocular', 'Ref.Palpebral'];
  dataSource: any[];
  medicamentosRecebidos: Medicamento[] = [];
  
  dadosRecebidos: Animal | undefined;
  
  horarios: string[] = Array(10).fill('');

  animal: Animal | undefined;
  medicamentos: Medicamento[] = [];
  
  observacoes = '';
  medicoResponsavel = 'Paulo';
  tipo_procedimento_id = 2;
  dataProcedimento = new Date().toISOString().split('T')[0];
  animalIdade: number | null = null;
  duracaoProcedimento = '4 horas';

  @ViewChild('modalAdicionarMedicamentos') modalAdicionarMedicamentos!: ProntuarioParcialModalAdicionarMedicamentosComponent;
  
  constructor(private router: Router, private prontuarioService: ProntuarioService) {
    this.dataSource = this.parametros.map((param) => {
      const row: any = { parametro: param };
      for (let i = 1; i <= 10; i++) {
        row['col' + i] = '';
      }
      return row;
    });

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { animal: Animal, medicamentos: Medicamento[] };
    
    if (state && state.animal) {
        this.dadosRecebidos = state.animal; 
        this.medicamentosRecebidos = state.medicamentos;
        
        console.log('Animal Recebido:', this.dadosRecebidos);
        console.log('Medicamentos Recebidos:', this.medicamentosRecebidos);
    }
  }

  ngOnInit(): void {
  if (this.dadosRecebidos) {
    this.animal = this.dadosRecebidos;

    const dataNascimento = this.converterDataIntParaDate(this.animal.data_nascimento);

    this.animalIdade = this.calcularIdade(dataNascimento);
  } else {
    console.error("Dados do animal não foram recebidos. Considere redirecionar o usuário.");
  }
}

  abrirModalCadastro() {
    this.modalAdicionarMedicamentos.openCadastro();
  }

  finalizarProntuario() {

    if (!this.dadosRecebidos || !this.dadosRecebidos.peso) {
      alert('Não é possível finalizar o prontuário sem os dados e o peso do animal.');
      return;
    }
    if (!this.animal) {
      alert('Não é possível finalizar o prontuário sem os dados de um animal.');
      return;
    }

    const pesoAnimal = this.dadosRecebidos?.peso;

    const medicoes_clinicas: MedicoesClinicas[] = [];
    const parametroMap: { [key: string]: number } = {
      'FC': 1, 'FR': 2, 'SPO2': 3, 'ETCO2': 4, 'PA': 5, 'Globo Ocular': 6, 'Ref.Palpebral': 7
    };

    this.dataSource.forEach(row => {
      for (let i = 0; i < 10; i++) {
        const valor = row['col' + (i + 1)];
        const horarioStr = this.horarios[i];
        if (valor && horarioStr) {
          medicoes_clinicas.push({
            parametro_id: parametroMap[row.parametro],
            valor: valor.toString(),
            horario: `${this.dataProcedimento} ${horarioStr}:00` 
          });
        }
      }
    });

    const usuarioLogado = { id: 1, nome: this.medicoResponsavel };

    const prontuarioParaEnviar: any = {
      animal_id: this.animal.id,
      usuario_id: usuarioLogado.id,
      data_prontuario: this.dataProcedimento,
      observacoes: this.observacoes,
      statusProntuario: 1,
      tipo_procedimento_id: this.tipo_procedimento_id,
      
      medicamentos: this.medicamentosRecebidos.map(med => {
        if (!med.concentracao || med.concentracao === 0 || !med.dose_min) {
            console.error(`Medicamento "${med.nome}" sem concentração ou dose. Não será adicionado.`);
            return null;
        }

        const concentracaoMgMl = med.concentracao * 10;

        const volume_min = (pesoAnimal * med.dose_min) / concentracaoMgMl;
        
        const volume_max = med.dose_max 
            ? (pesoAnimal * med.dose_max) / concentracaoMgMl
            : volume_min;

        return {
            medicamento_id: med.id, 
            volume_min: volume_min,
            volume_max: volume_max
        };
      }).filter(m => m !== null),

      medicoes_clinicas: medicoes_clinicas
    };
    
    console.log('✅ Objeto pronto para ser enviado:', prontuarioParaEnviar);

    this.prontuarioService.criarProntuario(prontuarioParaEnviar).subscribe({
      next: () => {
        alert('Prontuário cadastrado com sucesso!');
        this.router.navigate(['/prontuarios']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar prontuário:', err);
        alert(`Erro ao cadastrar prontuário: ${err.message}`);
      }
    });
  }

  obterDataAtualDDMMAAAA(): string {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();

    return `${dia}${mes}${ano}`;
  }

  converterDataIntParaDate(dataInt: number | null | undefined): Date | null {
    if (!dataInt) return null;

    const dataStr = dataInt.toString().padStart(8, '0');
    const dia = parseInt(dataStr.substring(0, 2), 10);
    const mes = parseInt(dataStr.substring(2, 4), 10) - 1;
    const ano = parseInt(dataStr.substring(4, 8), 10);

    return new Date(ano, mes, dia);
  }

  calcularIdade(dataNascimento: Date | null): number | null {
    if (!dataNascimento) return null;

    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mesDiferenca = hoje.getMonth() - dataNascimento.getMonth();

    if (mesDiferenca < 0 || (mesDiferenca === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }

    return idade;
  }
}