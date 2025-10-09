/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { CommonModule, Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Tutor } from 'src/app/models/tutor.model';

interface ParametroRow {
  parametro_nome: string;
  [horario: string]: any;
}

@Component({
  selector: 'app-detalhes-tutor',
  templateUrl: './detalhes-tutor.component.html',
  styleUrls: ['./detalhes-tutor.component.scss'],
  standalone: true,
  
  imports: [HdkButtonComponent, CommonModule],
})
export class DetalhesTutorComponent implements OnInit {
  dadosRecebidos: Tutor | undefined;
  telefoneTutor: string = 'Não informado';
  
  dataSourceClinicos: ParametroRow[] = [];
  displayedColumnsClinicos: string[] = ['parametro_nome'];
  
  mockProcedimentoData = {
    medicoes_clinicas: [
        { parametro_nome: "FC", horario: "2025-10-09 08:26:00", valor: "1" },
        { parametro_nome: "FR", horario: "2025-10-09 08:26:00", valor: "2" },
        { parametro_nome: "SPO2", horario: "2025-10-09 08:26:00", valor: "3" },
        { parametro_nome: "ETCO2", horario: "2025-10-09 08:26:00", valor: "4" },
        { parametro_nome: "PA", horario: "2025-10-09 08:26:00", valor: "5" },
        { parametro_nome: "Globo Ocular", horario: "2025-10-09 08:26:00", valor: "6" },
        { parametro_nome: "Ref Palpebral", horario: "2025-10-09 08:26:00", valor: "7" },
        { parametro_nome: "SPO2", horario: "2025-10-09 08:28:00", valor: "9" },
        { parametro_nome: "Ref Palpebral", horario: "2025-10-09 08:30:00", valor: "10" },
        { parametro_nome: "FC", horario: "2025-10-09 08:30:00", valor: "1.5" },
        { parametro_nome: "FR", horario: "2025-10-09 08:30:00", valor: "2.1" },
    ]
  };

  historicoDataSource = new MatTableDataSource<any>();
  historicoDisplayedColumns: string[] = ['id', 'tipo', 'data', 'nomeMedico'];
  
  historicoProcedimentos = [
    { id: 1, tipo: 'Cirurgia', data: '2025-07-01', nomeMedico: 'Dra. Ana' },
    { id: 2, tipo: 'Consulta', data: '2025-06-15', nomeMedico: 'Dr. João' },
    { id: 3, tipo: 'Exame', data: '2025-06-01', nomeMedico: 'Dra. Carla' }
  ];

  constructor(private router: Router, private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { dadosSelecionados: Tutor[] };
    
    if (state && state.dadosSelecionados && state.dadosSelecionados.length > 0) {
        this.dadosRecebidos = state.dadosSelecionados[0];
        this.extrairTelefone(); 
    }
  }

  private processarMedicoesClinicas(medicoes: any[]): void {
    const agrupamentoPorHorario = medicoes.reduce((acc, medicao) => {
        const horario = medicao.horario.substring(11, 16); 
        
        if (!acc[horario]) {
            acc[horario] = {};
        }
        
        acc[horario][medicao.parametro_nome] = medicao.valor;
        
        return acc;
    }, {} as { [horario: string]: { [parametro: string]: any } });

    const horariosUnicos = Object.keys(agrupamentoPorHorario).sort();
    
    const parametrosUnicos = new Set<string>();
    horariosUnicos.forEach(horario => {
        Object.keys(agrupamentoPorHorario[horario]).forEach(param => parametrosUnicos.add(param));
    });

    const linhasDaTabela: ParametroRow[] = [];
    
    Array.from(parametrosUnicos).forEach((parametroNome: string) => {
        const row: ParametroRow = { parametro_nome: parametroNome };
        
        horariosUnicos.forEach(horario => {
            row[horario] = agrupamentoPorHorario[horario][parametroNome] || '—'; 
        });
        
        linhasDaTabela.push(row);
    });

    this.dataSourceClinicos = linhasDaTabela;
    this.displayedColumnsClinicos = ['parametro_nome', ...horariosUnicos];
  }


   private extrairTelefone(): void {
    if (this.dadosRecebidos?.contatos) {
      const contatoTelefone = this.dadosRecebidos.contatos.find(
        (contato) => contato.tipo_contato?.descricao.toLowerCase() === 'telefone'
      );

      if (contatoTelefone) {
        this.telefoneTutor = contatoTelefone.descricao;
      }
    }
  }

  ngOnInit(): void {
    console.log('Dados recebidos na página de detalhes:', this.dadosRecebidos);
    
    this.historicoDataSource.data = this.historicoProcedimentos;
    
    this.processarMedicoesClinicas(this.mockProcedimentoData.medicoes_clinicas);
  }

  voltar() {
    this.location.back();
  }

  novaPrescricao() {
    
  }

  editarTutor() {
    
  }
}
