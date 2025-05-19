import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-editar-foto-usuario-modal',
  templateUrl: './editar-foto-usuario-modal.component.html',
  styleUrls: ['./editar-foto-usuario-modal.component.scss'],
   standalone: true,
  imports: [CommonModule],
})
export class EditarFotoUsuarioModalComponent {
  infoBtnsModal = [
    {class: 'fa-solid fa-pencil fa-5x d-flex', text:'Editar foto', type: 'editar'},
    {class: 'fa-solid fa-camera fa-5x', text:'Adicionar foto', type: 'adicionar'},
    {class: 'fa-solid fa-trash-can fa-5x', text:'Excluir foto', type: 'excluir'},
  ];

  @Output() fecharModal = new EventEmitter<void>();

onCloseModal() {
  this.fecharModal.emit();
}

onBtnClick(type: string) {
  switch (type) {
    case 'editar':
      this.editarFotoPerfil();
      break;
    case 'adicionar':
      this.adicionarFotoPerfil();
      break;
    case 'excluir':
      this.excluirFotoPerfil();
      break;
  }
}


editarFotoPerfil(){
 // teste alert("editar");
}
adicionarFotoPerfil(){
  // teste alert("adicionar");
}
excluirFotoPerfil(){
   // teste alert("excluir");
}

}
