/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { CommonModule, Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Tutor } from 'src/app/models/tutor.model';

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
  }

  voltar() {
    this.location.back();
  }

  novaPrescricao() {
    
  }

  editarTutor() {
    
  }
}

