/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HdkDivisor } from '../../hdk/divisor/hdk-divisor.component';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { ProntuarioParcialModalAdicionarMedicamentosComponent } from './prontuario-parcial-modal-adicionar-medicamentos/prontuario-parcial-modal-adicionar-medicamentos.component';
import { Animal } from 'src/app/models/animal.model';
import { Router } from '@angular/router';
import { Medicamento } from 'src/app/models/medicamento.model';
import { ProntuarioService } from 'src/app/services/prontuario.service';
import { MedicoesClinicas } from 'src/app/models/MedicoesClinicas.model';
import { AuthService } from 'src/app/services/auth.service';

// NOVO: Importe o serviço e o modelo de TipoProcedimento
import { TipoProcedimento } from 'src/app/models/tipoProcedimento.model';
import { TipoProcedimentoService } from 'src/app/services/tipoProcedimento.service';


interface MedicamentoCalculado extends Medicamento {
  volume_min: number;
  volume_max: number;
}

@Component({
  selector: 'app-prontuario-parcial',
  templateUrl: './prontuario-parcial.component.html',
  styleUrls: ['./prontuario-parcial.component.scss'],
  standalone: true,
  imports: [MatTableModule, NgFor, NgIf, FormsModule, HdkDivisor, HdkButtonComponent, ProntuarioParcialModalAdicionarMedicamentosComponent, CommonModule],
})
export class ProntuarioParcialComponent implements OnInit {
  displayedColumns: string[] = ['parametro', 'col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8', 'col9', 'col10'];
  parametros: string[] = ['FC', 'FR', 'SPO2', 'ETCO2', 'PA', 'Globo Ocular', 'Ref.Palpebral'];
  dataSource: any[];
  medicamentosRecebidos: Medicamento[] = [];
  medicamentosAgrupados = new Map<string, MedicamentoCalculado[]>();
  
  tiposDeProcedimento: TipoProcedimento[] = [];
  
  dadosRecebidos: Animal | undefined;
  horarios: string[] = Array(10).fill('');
  animal: Animal | undefined;
  observacoes = '';
  medicoResponsavel = '';
  tipo_procedimento_id: number | null = null;
  dataProcedimento = new Date().toISOString().split('T')[0];
  animalIdade: number | null = null;
  duracaoProcedimento = '4 horas';
  usuarioLogado: { id: number, nome: string } | null = null;

  @ViewChild('modalAdicionarMedicamentos') modalAdicionarMedicamentos!: ProntuarioParcialModalAdicionarMedicamentosComponent;
  
  constructor(
    private router: Router, 
    private prontuarioService: ProntuarioService, 
    private authService: AuthService,
    private tipoProcedimentoService: TipoProcedimentoService 
  ) {
    this.dataSource = this.parametros.map(param => {
      const row: any = { parametro: param };
      for (let i = 1; i <= 10; i++) {
        row['col' + i] = '';
      }
      return row;
    });

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { animal: Animal, medicamentos: Medicamento[] };
    
    if (state && state.animal && state.animal.peso) { 
        this.dadosRecebidos = state.animal; 
        this.medicamentosRecebidos = state.medicamentos;
        this.agruparECalcularMedicamentos(this.dadosRecebidos.peso);
    }
  }

  ngOnInit(): void {
    this.carregarTiposDeProcedimento();

    this.usuarioLogado = this.authService.getDadosUsuario();
    if (this.dadosRecebidos) {
      if (this.usuarioLogado) {
        this.medicoResponsavel = this.usuarioLogado.nome;
      }
      this.animal = this.dadosRecebidos;
      const dataNascimento = this.animal.data_nascimento ? new Date(this.animal.data_nascimento) : null;
      this.animalIdade = this.calcularIdade(dataNascimento);
    } else {
      console.error("Dados do animal não foram recebidos. Considere redirecionar o usuário.");
    }
  }

  carregarTiposDeProcedimento(): void {
    this.tipoProcedimentoService.getTipoProcedimento().subscribe({
      next: (data) => {
        this.tiposDeProcedimento = data;
        if (this.tiposDeProcedimento.length > 0) {
          this.tipo_procedimento_id = this.tiposDeProcedimento[0].id;
        }
      },
      error: (err) => console.error('Erro ao carregar tipos de procedimento', err)
    });
  }

  private agruparECalcularMedicamentos(pesoAnimal: number): void {
    for (const med of this.medicamentosRecebidos) {
      if (med.categoria_medicamento?.descricao) {
        const categoria = med.categoria_medicamento.descricao;

        if (!this.medicamentosAgrupados.has(categoria)) {
          this.medicamentosAgrupados.set(categoria, []);
        }

        const concentracaoMgMl = (med.concentracao ?? 0);
        let volume_min = 0;
        let volume_max = 0;

        if (concentracaoMgMl > 0 && med.dose_min) {
            volume_min = (pesoAnimal * med.dose_min) / concentracaoMgMl;
            volume_max = med.dose_max ? (pesoAnimal * med.dose_max) / concentracaoMgMl : volume_min;
        }

        const medCalculado: MedicamentoCalculado = {
          ...med, 
          volume_min: volume_min,
          volume_max: volume_max
        };

        this.medicamentosAgrupados.get(categoria)!.push(medCalculado);
      }
    }
  }

  onValorChange(columnIndex: number): void {
    if (!this.horarios[columnIndex]) {
      const agora = new Date();
      const horas = agora.getHours().toString().padStart(2, '0');
      const minutos = agora.getMinutes().toString().padStart(2, '0');
      this.horarios[columnIndex] = `${horas}:${minutos}`;
    }
  }

  abrirModalCadastro() {
    this.modalAdicionarMedicamentos.openCadastro();
  }

  finalizarProntuario() {
    if (!this.usuarioLogado) {
      alert('Erro: Usuário não identificado. Por favor, faça login novamente.');
      return;
    }
    if (!this.dadosRecebidos || !this.dadosRecebidos.peso || !this.animal) {
      alert('Não é possível finalizar o prontuário sem os dados do animal.');
      return;
    }

    const medicoes_clinicas: MedicoesClinicas[] = [];
    const parametroMap: { [key: string]: number } = {
      'FC': 1, 'FR': 2, 'SPO2': 3, 'ETCO2': 4, 'PA': 5, 'Globo Ocular': 6, 'Ref.Palpebral': 7
    };

    this.dataSource.forEach(row => {
      for (let i = 0; i < 10; i++) {
        const valor = row['col' + (i + 1)];
        const horarioStr = this.horarios[i];
        if (valor) {
          medicoes_clinicas.push({
            parametro_id: parametroMap[row.parametro],
            valor: valor.toString(),
            horario: `${this.dataProcedimento} ${horarioStr}:00`
          });
        }
      }
    });

    const todosMedicamentosCalculados = Array.from(this.medicamentosAgrupados.values()).flat();
    
    const medicamentosParaEnviar = todosMedicamentosCalculados.map(med => ({
        medicamento_id: med.id, 
        volume_min: med.volume_min,
        volume_max: med.volume_max
    }));

    const prontuarioParaEnviar: any = {
      animal_id: this.animal.id,
      usuario_id: this.usuarioLogado.id,
      data_prontuario: this.dataProcedimento,
      observacoes: this.observacoes,
      statusProntuario: 1,
      tipo_procedimento_id: this.tipo_procedimento_id,
      medicamentos: medicamentosParaEnviar,
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