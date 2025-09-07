import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Animal } from 'src/app/models/animal.model';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { CommonModule, Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { TabelaComponent } from '../../hdk/tabela/hdk-tabela.component';

@Component({
  selector: 'app-detalhes-animal',
  standalone: true,
  
  imports: [ HdkButtonComponent, CommonModule, TabelaComponent ],
  templateUrl: './detalhes-animal.component.html',
  styleUrls: ['./detalhes-animal.component.scss'],
})
export class DetalhesAnimalComponent implements OnInit {
  dadosRecebidos: Animal | undefined;

  
  historicoDataSource = new MatTableDataSource<any>();
  historicoDisplayedColumns: string[] = ['id', 'tipo', 'data', 'nomeMedico'];

  
  historicoProcedimentos = [
    { id: 1, tipo: 'Cirurgia', data: '2025-07-01', nomeMedico: 'Dra. Ana' },
    { id: 2, tipo: 'Consulta', data: '2025-06-15', nomeMedico: 'Dr. João' },
    { id: 3, tipo: 'Exame', data: '2025-06-01', nomeMedico: 'Dra. Carla' }
  ];

  constructor(private router: Router, private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { dadosSelecionados: Animal[] };
    
    if (state && state.dadosSelecionados && state.dadosSelecionados.length > 0) {
        this.dadosRecebidos = state.dadosSelecionados[0]; 
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

  editarAnimal() {
    
  }
}

