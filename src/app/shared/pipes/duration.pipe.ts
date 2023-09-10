import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  // Add your code here
  transform(duration?: number): string {
    if (!duration) {
      return '';
    }

    const hours = Math.floor(duration / 60)
      .toString()
      .padStart(2, '0');
      
    const minutes = (duration % 60).toString().padStart(2, '0');

    const ending = duration < 120 ? '' : 's';

    return `${hours}:${minutes} hour${ending}`;
  }
}
