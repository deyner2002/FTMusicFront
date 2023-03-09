import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {

  endpintTransferencia:string;

  constructor(private http:HttpClient) { 
    this.endpintTransferencia = environment.Transferencia
  }

  getTransferencia()
  {   
    return this.http.get<any>(this.endpintTransferencia)     
  }

}
