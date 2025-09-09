import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import {HdkDivisor} from 'src/app/components/hdk/divisor/hdk-divisor.component';
import { HdkButtonComponent } from '../hdk/button/hdk-button.component';
import { EditarFotoUsuarioModalComponent } from './editar-foto-usuario-modal/editar-foto-usuario-modal.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, HdkDivisor, HdkButtonComponent, EditarFotoUsuarioModalComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true
})
export class UsuariosComponent implements OnInit {
  editable = false;
  isEditUserProfilePictureModalOpen = false;
  dataSource: Usuario[] = [];
  usuarioLogado: { id: number, nome: string } | null = null;

  constructor(private usuarioService: UsuarioService, private location: Location, private authService: AuthService) {}
   ngOnInit() {
    this.carregarDados();
    this.usuarioLogado = this.authService.getDadosUsuario()
  }

  camposInfo = [
    {id: 'id', label:'Id'},
    {id: 'cargo', label:'Especialização / Cargo'},
    {id: 'crmv', label:'CRMV'},
    {id: 'cpf', label:'CPF'},
  ];

  camposEndereco = [
    {id: 'cep', label:'CEP'},
    {id: 'cidade', label:'Cidade'},
    {id: 'uf', label:'UF'},
  ];

  camposLogradouro = [
    {id: 'rua', label:'Rua'},
    {id: 'bairro', label:'Bairro'},
    {id: 'numero', label:'Número'},
  ];

  camposContatos = [
    {id: 'telefone', label:'Telefone'},
    {id: 'email', label:'Email'},
  ];

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
  this.usuarioService.getUsuarios().subscribe((data) => {
    this.dataSource = data;
    console.log(this.dataSource);
  });
}


}
