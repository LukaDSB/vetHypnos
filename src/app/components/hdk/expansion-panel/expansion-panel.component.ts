import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewEncapsulation } from '@angular/core';

/**
 * @title Accordion overview
 */
@Component({
  selector: 'expansion-panel',
  templateUrl: 'expansion-panel.component.html',
  styleUrls: ['expansion-panel.component.scss'],
  standalone: true,
  imports: [CdkAccordionModule, NgFor,     MatExpansionModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule],  
    encapsulation: ViewEncapsulation.None 
})

export class ExpansionPanelComponent {
  items = ['Medicação pré anestésica', 'Indução anestésica', 'Manutenção anestésica(bomba infusora)', 'Anestesia epidural', 'Medicação de emergência', 'Medicação de emergência(bomba infusora)'];
  expandedIndex = 0;
}