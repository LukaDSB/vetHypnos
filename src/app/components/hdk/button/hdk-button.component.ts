import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'hdk-button',
  templateUrl: './hdk-button.component.html',
  styleUrls: ['./hdk-button.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf]
})
export class HdkButtonComponent {
  @Input() fonte: string = 'hypnosText--TituloGrande';
  @Input() textColor: string = 'hdk-creme';
  @Input() color?: string ;
  @Input() text: string = 'Buscar';
  @Input() route: string = '';
  @Input() icon?: string;
  @Input() size?: number;

  constructor(private router: Router) {}

  navigate() {
    if (this.route) {
      this.router.navigate([this.route]);
    }
  }
}
