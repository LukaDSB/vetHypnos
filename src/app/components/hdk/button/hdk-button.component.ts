import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hdk-button',
  templateUrl: './hdk-button.component.html',
  styleUrls: ['./hdk-button.component.scss']
})
export class HdkButtonComponent {
  @Input() icon: string = 'fa-solid fa-magnifying-glass';
  @Input() text: string = 'Buscar';
  @Input() fonte: string = 'hypnosText--TituloGrande';
  @Input() color: string = 'btn-success';
  @Input() route: string = '';
  @Input() textColor: string = 'hdk-creme';

  constructor(private router: Router) {}

  navigate() {
    if (this.route) {
      this.router.navigate([this.route]);
    }
  }
}
