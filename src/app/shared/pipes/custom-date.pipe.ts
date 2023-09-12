import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  pure: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(value?: Date): string {
    if (!value) {
      return '';
    }
    const day = value.getDate().toString().padStart(2, '0');
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const year = value.getFullYear();

    return `${day}.${month}.${year}`;
  }
}
