import { Component, Input } from '@angular/core';

@Component({
  selector: 'hdk-divisor',
  templateUrl: './hdk-divisor.component.html',
  styleUrls: ['./hdk-divisor.component.scss'],
  standalone: true,
})
export class HdkDivisor {
  showDivisor?: boolean;
  
  @Input() hideDivisor: boolean = false;
  @Input() icon: string = 'fa-solid fa-magnifying-glass';
}
