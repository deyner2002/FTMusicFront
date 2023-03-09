import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParentescoModel } from 'src/app/shared/models/ParentescoModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionParentescoService {
  endpointParentesco:string;
  constructor(private http: HttpClient) { 

    this.endpointParentesco=environment.Parentesco;

  }

  registerParentesco(data: ParentescoModel )
  {   
    return this.http.post<any>(this.endpointParentesco, data, { })     
  }

  UpdateParentesco(data: ParentescoModel )
  {   
    return this.http.put<any>(this.endpointParentesco , data, { })     
  }

  GetParentesco(status: boolean )
  {   
    return this.http.get<any>(this.endpointParentesco + "?status="+status)     
  }

  DeleteParentesco(id:number  )
  {   
    return this.http.delete<any>(this.endpointParentesco + "?ID="+id)     
  }
}
