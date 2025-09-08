import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HdkButtonComponent } from '../button/hdk-button.component';
import { Location } from '@angular/common';

@Component({
  selector: 'hdk-modal',
  templateUrl: './hdk-modal.component.html',
  styleUrls: ['./hdk-modal.component.scss'],
  standalone: true,
  imports:[FormsModule, CommonModule, HdkButtonComponent]
})

export class HdkModalComponent {
  isLoginModalOpen = true;
  isCadastroModalOpen = false;
  email = '';
  senha = '';
  nome = '';

  constructor(private authService: AuthService, private location: Location ) {}

  login() {
    console.log('Tentativa de login com:', this.email, this.senha);
    this.isLoginModalOpen = false;
  }

  voltar(){
    this.location.back();
  }

  openCadastro() {
    this.isLoginModalOpen = false;
    this.isCadastroModalOpen = true;
  }

  closeCadastro() {
    this.isCadastroModalOpen = false;
    this.isLoginModalOpen = true;
  }

  // loginMock() {
  //   this.authService.loginMock();
  //   this.isLoginModalOpen = false;
  // }
}
