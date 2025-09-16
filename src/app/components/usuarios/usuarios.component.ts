import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import {HdkDivisor} from 'src/app/components/hdk/divisor/hdk-divisor.component';
import { HdkButtonComponent } from '../hdk/button/hdk-button.component';
import { EditarFotoUsuarioModalComponent } from './editar-foto-usuario-modal/editar-foto-usuario-modal.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Contato, Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, HdkDivisor, HdkButtonComponent, EditarFotoUsuarioModalComponent, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true
})
export class UsuariosComponent implements OnInit {
  editable = false;
  isEditUserProfilePictureModalOpen = false;
  dataSource?: Usuario;
  usuarioLogado: { id: number, nome: string } | null = null;
  emailContato?: Contato;
  telefoneContato?: Contato;

  constructor(private usuarioService: UsuarioService, private location: Location, private authService: AuthService) {}
   ngOnInit() {
    this.usuarioLogado = this.authService.getDadosUsuario();
    this.carregarDados();
  }

  voltar(){
    this.location.back();
  }

  editarDadosUsuario(){
     this.editable = !this.editable;
  }

    get botaoTexto(): string {
    return this.editable ? 'Salvar Dados' : 'Editar Dados';
  }

  openModalEditarImagemUsuario(){
    this.isEditUserProfilePictureModalOpen = true;
  }

  onCloseModal(){
    this.isEditUserProfilePictureModalOpen = false;
  }

  carregarDados() {
    if (this.usuarioLogado) {
      this.usuarioService.getUsuarioById(this.usuarioLogado.id).subscribe((data: Usuario) => {
        console.log('Dados recebidos da API:', data);
        this.dataSource = data;
        
        // 3. CHAME A NOVA FUNÇÃO AQUI
        if (data.clinica?.contatos) {
          this.processarContatos(data.clinica.contatos);
        }
      });
    } else {
      console.error('Nenhum usuário logado encontrado.');
    }
  }

  private processarContatos(contatos: Contato[]): void {
     console.log('Processando contatos recebidos:', contatos);
    this.emailContato = contatos.find(
      c => c.tipo_contato?.descricao.toLowerCase() === 'email'
    );
    this.telefoneContato = contatos.find(
      c => c.tipo_contato?.descricao.toLowerCase() === 'telefone'
    );
    console.log('Email encontrado:', this.emailContato);
    console.log('Telefone encontrado:', this.telefoneContato);
  }


}
