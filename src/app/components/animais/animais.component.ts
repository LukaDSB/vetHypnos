import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AnimalService } from 'src/app/services/animal.service';
import { Location } from '@angular/common';
import { Animal } from 'src/app/models/animal.model';
import { HdkButtonComponent } from '../hdk/button/hdk-button.component';
import { HdkDivisor } from '../hdk/divisor/hdk-divisor.component';
import { TabelaComponent } from '../hdk/tabela/hdk-tabela.component';
import { ModalAnimalComponent } from './modal-animal/modal-animal.component';
import { TutorService } from 'src/app/services/tutor.service';
import { forkJoin, Subscription } from 'rxjs';
import { Tutor } from 'src/app/models/tutor.model';
import { HdkModalFeedbackComponent } from '../hdk/hdk-modal-feedback/hdk-modal-feedback.component';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.scss'],
  standalone: true,
  imports: [ModalAnimalComponent, HdkButtonComponent, HdkDivisor, TabelaComponent, HdkModalFeedbackComponent],
})
export class AnimaisComponent implements OnInit {

  dataSource: MatTableDataSource<Animal> = new MatTableDataSource<Animal>([]);
  displayedColumns: string[] = ['id', 'nome', 'especie_id', 'data_nascimento', 'tutor_id', 'peso', 'sexo', 'acoes'];

  @ViewChild('modalAnimal') modalAnimalComponent!: ModalAnimalComponent;
  @ViewChild(HdkModalFeedbackComponent) modalFeedback!: HdkModalFeedbackComponent;

  private confirmacaoSubscription?: Subscription;

  constructor(
    private animalService: AnimalService,
    private tutorService: TutorService,
    private location: Location
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  // --- ALTERAÇÃO 1: NOVA FUNÇÃO PARA FORMATAR A DATA ---
  /**
   * Converte uma data no formato 'dd/MM/yyyy' para 'yyyy-MM-dd'.
   * @param data A string da data a ser formatada.
   * @returns A data formatada para o padrão da API ou a string original se o formato for inválido.
   */
  private formatarDataParaAPI(data: string): string {
    if (!data || typeof data !== 'string' || !data.includes('/')) {
      return data; // Retorna o valor original se não for uma string de data esperada
    }

    const partes = data.split('/');
    if (partes.length !== 3) {
      return data; // Formato inválido
    }

    const [dia, mes, ano] = partes;
    return `${ano}-${mes}-${dia}`;
  }


  // --- ALTERAÇÃO 2: USAR A FUNÇÃO DE FORMATAÇÃO NO CADASTRO ---
  cadastrarAnimal(animal: Animal) {
    // Cria uma cópia do objeto animal para não modificar o original
    const animalParaAPI = {
      ...animal,
      data_nascimento: this.formatarDataParaAPI(animal.data_nascimento)
    };

    this.animalService.cadastrarAnimal(animalParaAPI).subscribe({
      next: () => {
        this.carregarDados();
        this.modalFeedback.open('sucesso', 'Sucesso!', 'Novo animal cadastrado.');
      },
      error: (err) => {
        const mensagemErro = err.error?.message || 'Não foi possível cadastrar o animal.';
        this.modalFeedback.open('erro', 'Erro!', mensagemErro);
        console.error('Erro ao cadastrar animal:', err);
      }
    });
  }

  // --- ALTERAÇÃO 3: USAR A FUNÇÃO DE FORMATAÇÃO NA ATUALIZAÇÃO ---
  enviarAtualizacao(animal: Animal) {
    // Cria uma cópia do objeto animal para não modificar o original
    const animalParaAPI = {
        ...animal,
        data_nascimento: this.formatarDataParaAPI(animal.data_nascimento)
    };

    this.animalService.atualizarAnimal(animalParaAPI).subscribe({
      next: () => {
        this.carregarDados();
        this.modalFeedback.open('sucesso', 'Sucesso!', 'Dados do animal atualizados.');
      },
      error: (err) => {
        const mensagemErro = err.error?.message || 'Não foi possível atualizar os dados.';
        this.modalFeedback.open('erro', 'Erro!', mensagemErro);
        console.log('Erro ao atualizar animal: ', err);
      }
    });
  }


  deletarAnimal(animal: Animal) {
    this.confirmacaoSubscription?.unsubscribe();

    this.modalFeedback.open(
      'confirmacao',
      'Confirmar Exclusão',
      `Deseja realmente excluir o animal "${animal.nome}"? Esta ação não pode ser desfeita.`,
      'Sim, Excluir',
      'Cancelar'
    );

    this.confirmacaoSubscription = this.modalFeedback.confirmado.subscribe(() => {
      this.animalService.deletarAnimal(animal.id).subscribe({
        next: () => {
          this.modalFeedback.open('sucesso', 'Sucesso!', `O animal "${animal.nome}" foi excluído.`);
          this.carregarDados();
        },
        error: (err) => {
          this.modalFeedback.open('erro', 'Erro!', 'Ocorreu um erro ao tentar excluir o animal.');
          console.error(`Erro ao excluir animal de ${animal.id}`, err);
        }
      });
    });
  }


  // O resto do seu componente permanece igual...
  atualizarAnimal(animal: Animal) {
    this.modalAnimalComponent.openAtualizar(animal);
  }

  carregarDados() {
    forkJoin({
      animais: this.animalService.getAnimais(),
      tutores: this.tutorService.getTutores()
    }).subscribe(({ animais, tutores }) => {
      const tutoresMap = new Map<number, Tutor>(tutores.map(t => [t.id, t]));
      const animaisComTutor = animais.map(animal => ({
        ...animal,
        tutor: tutoresMap.get(animal.tutor_id)
      }));
      this.dataSource = new MatTableDataSource(animaisComTutor as Animal[]);
    });
  }

  voltar() {
    this.location.back();
  }

  abrirModalCadastro() {
    this.modalAnimalComponent.openCadastro();
  }

  ngOnDestroy() {
    this.confirmacaoSubscription?.unsubscribe();
  }
}

