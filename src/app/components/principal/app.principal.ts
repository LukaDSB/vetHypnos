import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-principal',
  templateUrl: './app.principal.html',
  styleUrls: ['./app.principal.scss']
})
export class AppPrincipal {
  title = 'projetoTeste';
}
