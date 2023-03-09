import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeDecimal'
})
export class PipeDecimalPipe implements PipeTransform {

  transform(value: number): string {
    return value.toFixed(2);
  }

}
