import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generoPipe'
})
export class GeneroPipe implements PipeTransform {

  transform(genero: string): string {
    return genero.trim().toLocaleLowerCase() === 'm' ? 'Masculino' : 
           genero.trim().toLocaleLowerCase() === 'f' ? 'Femenino' : 'Otro'
  }

}
