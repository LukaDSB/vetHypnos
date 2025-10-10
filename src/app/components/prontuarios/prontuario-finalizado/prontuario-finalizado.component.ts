/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { ProntuarioService } from 'src/app/services/prontuario.service';
import { HdkDivisor } from 'src/app/components/hdk/divisor/hdk-divisor.component';
import { HdkButtonComponent } from 'src/app/components/hdk/button/hdk-button.component';
import { MedicamentoApiResponse, ProntuarioCompletoApiResponse } from 'src/app/models/api/prontuario-completo-response.model';


@Component({
  selector: 'app-prontuario-finalizado',
  standalone: true,
  imports: [CommonModule, MatTableModule, HdkDivisor, HdkButtonComponent, DatePipe],
  templateUrl: './prontuario-finalizado.component.html',
  styleUrls: ['./prontuario-finalizado.component.scss']
})
export class ProntuarioFinalizadoComponent implements OnInit {
  prontuario: ProntuarioCompletoApiResponse | null = null;
  animalIdade: number | null = null;
  
  // NOVO: Propriedade para guardar os medicamentos agrupados
  medicamentosAgrupados = new Map<string, MedicamentoApiResponse[]>();

  displayedColumns: string[] = ['parametro'];
  horariosDasColunas: string[] = [];
  dataSource: any[] = [];
  parametros: string[] = ['FC', 'FR', 'SPO2', 'ETCO2', 'PA', 'Globo Ocular', 'Ref.Palpebral'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prontuarioService: ProntuarioService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarProntuarioPelaApi(+id);
    } else {
      console.error('ID do prontuário não encontrado na rota.');
      this.router.navigate(['/prontuarios']);
    }
  }

  carregarProntuarioPelaApi(id: number): void {
    this.prontuarioService.getProntuarioById(id).subscribe({
      next: (data) => {
        this.prontuario = data;
        this.processarDadosDoProntuario();
      },
      error: (err) => {
        console.error('Erro ao carregar o prontuário:', err);
        alert('Não foi possível carregar o prontuário.');
        this.router.navigate(['/prontuarios']);
      }
    });
  }

  private processarDadosDoProntuario(): void {
    if (!this.prontuario) return;

    if (this.prontuario.animal?.data_nascimento) {
      this.animalIdade = this.calcularIdade(new Date(this.prontuario.animal.data_nascimento));
    }
    this.prepararDataSourceMedicoes();
    
    // NOVO: Chama o método para agrupar os medicamentos após recebê-los
    this.agruparMedicamentosPorCategoria();
  }
  
  // NOVO: Método para agrupar os medicamentos recebidos da API
  private agruparMedicamentosPorCategoria(): void {
    if (!this.prontuario?.medicamentos) return;

    for (const med of this.prontuario.medicamentos) {
      const categoria = med.categoria_descricao || 'Sem Categoria';

      if (!this.medicamentosAgrupados.has(categoria)) {
        this.medicamentosAgrupados.set(categoria, []);
      }
      this.medicamentosAgrupados.get(categoria)!.push(med);
    }
  }

  prepararDataSourceMedicoes(): void {
    const medicoes = this.prontuario?.medicoes_clinicas || [];
    if (medicoes.length === 0) {
      this.dataSource = this.parametros.map(p => ({ parametro: p }));
      return;
    }
    
    const horariosUnicos = [...new Set(medicoes.map(m => m.horario))].sort();
    this.horariosDasColunas = horariosUnicos;
    this.displayedColumns = ['parametro', ...horariosUnicos];

    const parametroMap: { [key: string]: number } = {
      'FC': 1, 'FR': 2, 'SPO2': 3, 'ETCO2': 4, 'PA': 5, 'Globo Ocular': 6, 'Ref.Palpebral': 7
    };

    this.dataSource = this.parametros.map(paramStr => {
      const parametroId = parametroMap[paramStr];
      const row: any = { parametro: paramStr };

      for (const horario of horariosUnicos) {
        const medicaoCorrespondente = medicoes.find(
          m => m.parametro_id === parametroId && m.horario === horario
        );
        row[horario] = medicaoCorrespondente ? medicaoCorrespondente.valor : null;
      }
      return row;
    });
  }

  voltar(): void {
    this.router.navigate(['/prontuarios']);
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