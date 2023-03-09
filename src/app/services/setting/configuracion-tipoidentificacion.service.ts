import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoIdentifiacionModel } from 'src/app/shared/models/TipoIdentificacionModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionTipoidentificacionService {
  endpointTipoIdent:string;
  constructor(private http: HttpClient) { 

    this.endpointTipoIdent=environment.TipoIdent;

  }

  registerTipoIdenti(data: TipoIdentifiacionModel )
  {   
    return this.http.post<any>(this.endpointTipoIdent, data, { })     
  }

  UpdateTipoIdenti(data: TipoIdentifiacionModel )
  {   
    return this.http.put<any>(this.endpointTipoIdent , data, { })     
  }

  GetTipoIdenti(status: boolean )
  {   
    return this.http.get<any>(this.endpointTipoIdent + "?status="+status)     
  }

  DeleteTipoIdenti(id:number  )
  {   
    return this.http.delete<any>(this.endpointTipoIdent + "?ID="+id)     
  }
}
