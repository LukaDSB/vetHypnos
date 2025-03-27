import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hdk-button',
  templateUrl: './hdk-button.component.html',
  styleUrls: ['./hdk-button.component.scss'],
})
export class HdkButtonComponent {
  @Input() fonte: string = 'hypnosText--TituloGrande';
  @Input() textColor: string = 'hdk-creme';
  @Input() color: string = 'btn-success';
  @Input() text: string = 'Buscar';
  @Input() route: string = '';
  @Input() icon?: string;

  constructor(private router: Router) {}

  navigate() {
    if (this.route) {
      this.router.navigate([this.route]);
    }
  }
}
