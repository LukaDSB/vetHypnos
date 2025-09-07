import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss']
})
export class CustomCheckboxComponent {
  @Input() label: string = '';
  @Output() selectionChange = new EventEmitter<boolean>();

  isChecked: boolean = false;

  toggleCheck() {
    this.isChecked = !this.isChecked;
    this.selectionChange.emit(this.isChecked);
  }
}