import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newlineToBreak',
  standalone: true
})
export class NewlineToBreakPipe implements PipeTransform {

  transform(value: string): string {
    return value ? value.replace(/\n/g, '<br>') : value;
  }

}
