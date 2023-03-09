import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TarifaModel } from 'src/app/shared/models/TarifaModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigutacionTarifaService {

  endpointTarifas:string;

  constructor(private http:HttpClient) { 
    this.endpointTarifas=environment.Tarifa;
  }
  
  getTarifas()
  {   
    return this.http.get<any>(this.endpointTarifas)     
  }

  saveTarifas(data : TarifaModel)
  {   
    return this.http.post<any>(this.endpointTarifas, data, { })     
  }

  DeleteTarifas(id:number  )
  {   
    return this.http.delete<any>(this.endpointTarifas + "?ID="+id)     
  }

  UpdateTarifa(data: TarifaModel )
  {   
    return this.http.put<any>(this.endpointTarifas, data, { })     
  }

}
