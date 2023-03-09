import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MotivoTranferencia } from 'src/app/shared/models/MotivoTransferencia';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionMotivosService {
  endpointMotivo:string;
  constructor(private http: HttpClient) { 

    this.endpointMotivo=environment.Motivos;

  }

  registerMotivo(data: MotivoTranferencia )
  {   
    return this.http.post<any>(this.endpointMotivo , data, { })     
  }

  UpdateMotivo(data: MotivoTranferencia )
  {   
    return this.http.put<any>(this.endpointMotivo , data, { })     
  }

  GetMotivo(status: boolean )
  {   
    return this.http.get<any>(this.endpointMotivo + "?status="+status)     
  }

  DeleteMotivo(id:number  )
  {   
    return this.http.delete<any>(this.endpointMotivo + "?ID="+id)     
  }
}
