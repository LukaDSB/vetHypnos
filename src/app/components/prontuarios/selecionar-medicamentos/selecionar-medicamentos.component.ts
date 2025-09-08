import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { Medicamento } from 'src/app/models/medicamento.model';
import { Animal } from 'src/app/models/animal.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HdkButtonComponent } from "../../hdk/button/hdk-button.component";


interface AccordionSection {
  titulo: string;
  categoriasPermitidas: string[];
  medicamentosAgrupados: Map<string, Medicamento[]>;
  expanded: boolean;
}

@Component({
  selector: 'app-selecionar-medicamentos',
  templateUrl: './selecionar-medicamentos.component.html',
  styleUrls: ['./selecionar-medicamentos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CdkAccordionModule,
    MatCheckboxModule,
    HdkButtonComponent,
  ],
})
export class SelecionarMedicamentosComponent implements OnInit {
  dadosRecebidos: Animal | undefined;
  medicamentosSelecionados = new Set<number>();
  private todosMedicamentos: Medicamento[] = [];



  secoesDoAccordion: AccordionSection[] = [
    {
      titulo: 'Medicação pré anestésica',
      categoriasPermitidas: [
        'Fenotiazinico',
        'Butirofenonas',
        'Benzodiazepinicos',
        'Alfa 2 Agonistas',
        'Opioides',
        'Anticolinergicos'
      ],
      medicamentosAgrupados: new Map(),
      expanded: false
    },
    {
      titulo: 'Indução anestésica',
      categoriasPermitidas: [
        'Barbituricos',
        'Nao Barbituricos',
        'Anestesicos Dissociativos'
      ],
      medicamentosAgrupados: new Map(),
      expanded: false
    },
    {
      titulo: 'Manutenção anestésica (bomba infusora)',
      categoriasPermitidas: [
        'Não Barbitúricos',
        'Opioides',
        'Anestesicos Dissociativos',
        'Anestesicos Locais'
      ],
      medicamentosAgrupados: new Map(),
      expanded: false
    },
    {
      titulo: 'Anestesia Epidural',
      categoriasPermitidas: [
        'Anestesicos Locais',
        'Opioides'
      ],
      medicamentosAgrupados: new Map(),
      expanded: false
    },
    {
      titulo: 'Medicação de emergência',
      categoriasPermitidas: [
        'Anticolinergicos',
        'Broncodilatadores',
        'Beta Bloqueadores',
        'Simpatomimeticos',
        'Outros antiarritmicos',
        'Glicocorticoides',
        'Antagonistas opioides',
        'Diureticos',
        'Antagonistas alfa 2'
      ],
      medicamentosAgrupados: new Map(),
      expanded: false
    },
    {
      titulo: 'Medicação de emergência (bomba infusora)',
      categoriasPermitidas: [],
      medicamentosAgrupados: new Map(),
      expanded: false
    }
  ];

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

  carregarDados(): void {
    this.medicamentoService.getMedicamentos().subscribe((data: Medicamento[]) => {
      this.todosMedicamentos = data;

      this.prepararSecoesDoAccordion();
    });
  }


  private prepararSecoesDoAccordion(): void {

    for (const secao of this.secoesDoAccordion) {

      const medicamentosDaSecao = this.todosMedicamentos.filter(med =>
        med.categoria_medicamento && secao.categoriasPermitidas.includes(med.categoria_medicamento.descricao)
      );


      const grupos = new Map<string, Medicamento[]>();
      for (const med of medicamentosDaSecao) {
        const categoria = med.categoria_medicamento!.descricao;
        if (!grupos.has(categoria)) {
          grupos.set(categoria, []);
        }
        grupos.get(categoria)!.push(med);
      }

      secao.medicamentosAgrupados = grupos;
    }
  }



  onSelectionChange(event: { checked: boolean }, medId: number): void {
    if (event.checked) {
      this.medicamentosSelecionados.add(medId);
    } else {
      this.medicamentosSelecionados.delete(medId);
    }
    console.log('IDs Selecionados:', Array.from(this.medicamentosSelecionados));
  }

  salvarSelecao(): void {
    const medicamentosParaEnviar = this.todosMedicamentos.filter(med =>
      this.medicamentosSelecionados.has(med.id)
    );

    if (medicamentosParaEnviar.length === 0) {
      alert('Nenhum medicamento foi selecionado.');
      return;
    }

    this.router.navigate(['/prontuarios/prontuarioParcial'], {
      state: {
        animal: this.dadosRecebidos,
        medicamentos: medicamentosParaEnviar
      }
    });
  }
}
