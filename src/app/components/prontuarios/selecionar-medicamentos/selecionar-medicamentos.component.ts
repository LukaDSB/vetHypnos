import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MedicamentoService} from 'src/app/services/medicamento.service';
import {Medicamento} from 'src/app/models/medicamento.model';
import { Animal } from 'src/app/models/animal.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-selecionar-medicamentos',
  templateUrl: './selecionar-medicamentos.component.html',
  styleUrls: ['./selecionar-medicamentos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class SelecionarMedicamentosComponent implements OnInit {
  items = [
    'Medicação pré anestésica',
    'Indução anestésica',
  ];

  expandedIndex = 0;
  dadosRecebidos: Animal | undefined;

  medicamentosAgrupados = new Map<string, Medicamento[]>();
  
  medicamentosSelecionados = new Set<number>();

  private todosMedicamentos: Medicamento[] = [];

  constructor(private medicamentoService: MedicamentoService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { dadosSelecionados: Animal[] };
    
    if (state && state.dadosSelecionados && state.dadosSelecionados.length > 0) {
        this.dadosRecebidos = state.dadosSelecionados[0]; 
    }
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  // carregarDados(): void {
  //   this.medicamentoService.getMedicamentos().subscribe((data: Medicamento[]) => {
  //     // Filtra medicamentos que não possuem categoria para evitar erros
  //     const medicamentosValidos = data.filter(med => med.categoria_medicamento && med.categoria_medicamento.descricao);
  //     this.agruparMedicamentos(medicamentosValidos);
  //     console.log('Medicamentos Agrupados:', this.medicamentosAgrupados);
  //   });
  // }

  carregarDados(): void {
    this.medicamentoService.getMedicamentos().subscribe((data: Medicamento[]) => {
      // 2. Armazene a lista completa aqui
      this.todosMedicamentos = data; 
      
      const medicamentosValidos = data.filter(med => med.categoria_medicamento?.descricao);
      this.agruparMedicamentos(medicamentosValidos);
    });
  }

  private agruparMedicamentos(medicamentos: Medicamento[]): void {
    this.medicamentosAgrupados.clear(); // Limpa o mapa antes de preencher

    for (const med of medicamentos) {
      // Garante que categoria_medicamento e descricao existem
      const categoria = med.categoria_medicamento!.descricao;
      
      if (!this.medicamentosAgrupados.has(categoria)) {
        this.medicamentosAgrupados.set(categoria, []);
      }
      
      this.medicamentosAgrupados.get(categoria)!.push(med);
    }
  }
  
  // Função para lidar com a seleção/desseleção de um checkbox
  onSelectionChange(event: MatCheckboxChange, medId: number): void {
    if (event.checked) {
      this.medicamentosSelecionados.add(medId);
    } else {
      this.medicamentosSelecionados.delete(medId);
    }
    console.log('IDs Selecionados:', Array.from(this.medicamentosSelecionados));
  }

  salvarSelecao(): void {
    // Filtra a lista 'todosMedicamentos' para obter os objetos completos
    // dos medicamentos cujos IDs estão no Set 'medicamentosSelecionados'.
    const medicamentosParaEnviar = this.todosMedicamentos.filter(med => 
      this.medicamentosSelecionados.has(med.id)
    );

    if (medicamentosParaEnviar.length === 0) {
      alert('Nenhum medicamento foi selecionado.');
      return;
    }

    console.log('Enviando para a próxima tela:', medicamentosParaEnviar);

    // Navega para uma nova rota (ex: '/resumo-anestesia')
    // e passa os dados selecionados e os dados do animal via 'state'.
    this.router.navigate(['/prontuarios/prontuarioParcial'], {
      state: {
        animal: this.dadosRecebidos,
        medicamentos: medicamentosParaEnviar
      }
    });
  }
}