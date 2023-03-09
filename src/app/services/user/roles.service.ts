import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role, UserRole } from 'src/app/shared/models/Interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private endpointRoles: string
  roles: UserRole

  constructor(private http:HttpClient)
   {
      this.endpointRoles = environment.Rol
      
   }

   registerRole(data: Role )
  {   
    return this.http.post<any>(this.endpointRoles , data, { })     
  }

  UpdateRole(data: Role )
  {   
    return this.http.put<any>(this.endpointRoles, data, { })     
  }

  GetRole(status: boolean )
  {   
    return this.http.get<any>(this.endpointRoles)     
  }

  DeleteRole(id:number  )
  {   
    return this.http.delete<any>(this.endpointRoles + "/"+id)     
  }
  

  
}
