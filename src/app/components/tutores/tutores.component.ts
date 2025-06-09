import { OnInit, Component, ViewChild } from '@angular/core';
import { TutorService } from 'src/app/services/tutor.service';
import { Tutor } from 'src/app/models/tutor.model';
import { TabelaComponent } from '../hdk/tabela/hdk-tabela.component';
import { MatTableDataSource } from '@angular/material/table';
import { TutoresModalComponent } from './tutores-modal/tutores-modal.component';
import { Location } from '@angular/common';
import { HdkButtonComponent } from '../hdk/button/hdk-button.component';
import { HdkDivisor } from '../hdk/divisor/hdk-divisor.component';

@Component({
  selector: 'app-tutores',
  templateUrl: './tutores.component.html',
  styleUrls: ['./tutores.component.scss'],
   standalone: true,
  imports: [TabelaComponent, TutoresModalComponent, HdkButtonComponent, HdkDivisor],
})
export class TutoresComponent implements OnInit {
    dataSource: MatTableDataSource<Tutor> = new MatTableDataSource<Tutor>([]);
    displayedColumns: string[] = ['id', 'tutor_nome', 'tutor_cpf', 'endereco', 'acoes'];
      @ViewChild('modalTutores') modalTutores!: TutoresModalComponent;
    

  constructor(private tutorService: TutorService, private location: Location) {}
  
  ngOnInit() {
    this.carregarDados();
  }

  cadastrarTutor(tutor: Tutor) {
      console.log(tutor);
      this.tutorService.cadastrarTutor(tutor).subscribe({
        next: () => {
          this.carregarDados();
        },
        error: (err) => {
          console.error('Erro ao cadastrar tutor:', err);
        }
      })
    }
  
    deletarTutor(tutor: Tutor){
      if (confirm(`Deseja realmente excluir "${tutor.tutor_nome}"?`)){
        this.tutorService.deletarTutor(tutor.id).subscribe({
          next: () => {
            console.log(`Tutor com ID ${tutor.id} excluído.`);
            this.carregarDados();
          },
          error: (err) => {
            console.error(`Erro ao excluir tutor de ${tutor.id}`, err);
          }
        });
      }
    }
  
    atualizarTutor(tutor: Tutor){
      this.modalTutores.openAtualizar(tutor);
    }
  
    enviarAtualizacao(tutor: Tutor){
      this.tutorService.atualizarTutor(tutor).subscribe({
        next: () => {
          console.log('Tutor atualizado com sucesso.');
          this.carregarDados();
        },
        error: (err) => {
          console.log('Erro ao atualizar tutor: ', err);
        }
      })
    }

    carregarDados() {
       this.tutorService.getTutores().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        console.log(data);
      });
    }

    voltar(){
    this.location.back();
  }

  abrirModalCadastro() {
  this.modalTutores.openCadastro();
}

}
