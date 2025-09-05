import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MedicamentoService} from 'src/app/services/medicamento.service';
import {Medicamento} from 'src/app/models/medicamento.model';
import { Animal } from 'src/app/models/animal.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HdkButtonComponent } from "../../hdk/button/hdk-button.component";
import { CustomCheckboxComponent } from '../../hdk/custom-checkbox/custom-checkbox.component';

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
    MatButtonModule,
    HdkButtonComponent, 
    CustomCheckboxComponent
],
})
export class SelecionarMedicamentosComponent implements OnInit {
  expandedIndex = 0;
  dadosRecebidos: Animal | undefined;

  medicamentosAgrupados = new Map<string, Medicamento[]>();
  
  medicamentosSelecionados = new Set<number>();

  private todosMedicamentos: Medicamento[] = [];

  constructor(private medicamentoService: MedicamentoService, private router: Router, private cdr: ChangeDetectorRef) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { dadosSelecionados: Animal[] };
    
    if (state && state.dadosSelecionados && state.dadosSelecionados.length > 0) {
        this.dadosRecebidos = state.dadosSelecionados[0]; 
    }
  }

  ngOnInit(): void {
    this.carregarDados();
    console.log(this.medicamentosAgrupados);
    console.log(` Dados recebidos: ${this.dadosRecebidos}`);
  }

  carregarDados(): void {
    this.medicamentoService.getMedicamentos().subscribe((data: Medicamento[]) => {
      this.todosMedicamentos = data; 
      
      const medicamentosValidos = data.filter(med => med.categoria_medicamento?.descricao);
      this.agruparMedicamentos(medicamentosValidos);
    });
  }

  private agruparMedicamentos(medicamentos: Medicamento[]): void {
    this.medicamentosAgrupados.clear();

    for (const med of medicamentos) {
      const categoria = med.categoria_medicamento!.descricao;
      
      if (!this.medicamentosAgrupados.has(categoria)) {
        this.medicamentosAgrupados.set(categoria, []);
      }
      
      this.medicamentosAgrupados.get(categoria)!.push(med);
    }
  }
  
  onSelectionChange(event: { checked: boolean }, medId: number): void {
    if (event.checked) {
      this.medicamentosSelecionados.add(medId);
    } else {
      this.medicamentosSelecionados.delete(medId);
    }
    // O cdr.detectChanges() pode não ser mais necessário, mas não prejudica.
    this.cdr.detectChanges(); 
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

    console.log('Enviando para a próxima tela:', medicamentosParaEnviar);

    this.router.navigate(['/prontuarios/prontuarioParcial'], {
      state: {
        animal: this.dadosRecebidos,
        medicamentos: medicamentosParaEnviar
      }
    });
  }
}