import { Component, ViewChild} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HdkDivisor } from '../../hdk/divisor/hdk-divisor.component';
import { HdkButtonComponent } from '../../hdk/button/hdk-button.component';
import { ProntuarioParcialModalAdicionarMedicamentosComponent } from './prontuario-parcial-modal-adicionar-medicamentos/prontuario-parcial-modal-adicionar-medicamentos.component';

@Component({
  selector: 'app-prontuario-parcial',
  templateUrl: './prontuario-parcial.component.html',
  styleUrls: ['./prontuario-parcial.component.scss'],
  standalone: true,
  imports: [MatTableModule, NgFor, NgIf,FormsModule, HdkDivisor, HdkButtonComponent, ProntuarioParcialModalAdicionarMedicamentosComponent],
})
export class ProntuarioParcialComponent {
 displayedColumns: string[] = ['parametro', 'col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8', 'col9', 'col10'];
  parametros: string[] = ['FC', 'FR', 'SPO2', 'ETCO2', 'PA', 'Globo Ocular', 'Ref.Palpebral'];

    @ViewChild('modalAdicionarMedicamentos') modalAdicionarMedicamentos!: ProntuarioParcialModalAdicionarMedicamentosComponent;

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
