import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BancoModel } from 'src/app/shared/models/BancoModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionBancoService {
  endpointBancos:string;
  
  constructor(private http: HttpClient) { 

    this.endpointBancos=environment.Bancos;
   

  }

  registerBanco(data: BancoModel )
  {   
    return this.http.post<any>(this.endpointBancos , data, { })     
  }

  UpdateBanco(data: BancoModel )
  {   
    return this.http.put<any>(this.endpointBancos, data, { })     
  }

  GetBanco(status: boolean )
  {   
    return this.http.get<any>(this.endpointBancos + "?status="+status)     
  }

  DeleteBanco(id:number  )
  {   
    return this.http.delete<any>(this.endpointBancos + "?ID="+id)     
  }
}
