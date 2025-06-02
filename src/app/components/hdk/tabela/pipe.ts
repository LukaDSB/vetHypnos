import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateMask',
  standalone: true,
})
export class DateMaskPipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) return 'Não informado';

    const digits = value.toString().replace(/\D/g, '');
    const masked = digits.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');

    return masked.length === 10 ? masked : 'Data inválida';
  }
}
