import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaisModel } from 'src/app/shared/models/PaisModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionPaisService {
  endpointPais:string;
  constructor(private http: HttpClient) { 

    this.endpointPais=environment.Pais;

  }


  registerPais(data: PaisModel )
  {   
    return this.http.post<any>(this.endpointPais , data, { })     
  }

  UpdatePais(data: PaisModel )
  {   
    return this.http.put<any>(this.endpointPais , data, { })     
  }

  GetPais(status: boolean )
  {   
    return this.http.get<any>(this.endpointPais+ "?status="+status)     
  }

  DeletePais(id:number  )
  {   
    return this.http.delete<any>(this.endpointPais + "?ID="+id)     
  }

  getAllPaises(){
    return this.http.get<any>("https://restcountries.com/v2/lang/es");
  }
}
