import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { RegisterResponse, RoleResult, UserLogged, UserResult, UserRole } from 'src/app/shared/models/Interfaces';
import { Utilidades } from '../../shared/FuncionesGlobales/Utilidades';
import { Params } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private endpointGetUser: string
  private endpointGetRoles: string
  private endpointEditUser: string
  endpointUser: string;
  user: UserLogged
  roles: UserRole
  private idUserLogged:string = ''

  constructor(private http:HttpClient)
   {
      this.endpointGetUser = environment.GetUser
      this.endpointGetRoles = environment.GetRolesById
      this.endpointEditUser = environment.EditUser

      this.endpointUser=environment.User;
      this.idUserLogged = Utilidades.getIdUserFromStorage('jwt');
   }

  getUser()
  {  
    return this.http.get<UserResult>(`${this.endpointGetUser}/${this.idUserLogged}`)     
  }

  getUserRole():Observable<RoleResult>
  {
    return this.http.get<RoleResult>(`${this.endpointGetRoles}?userId=${this.idUserLogged}`)
  }

  getUsers( )
  {   
    return this.http.get<RegisterResponse>(this.endpointUser)     
  }

  editUser(user: UserLogged)
  {
    const body = new HttpParams({fromObject: {editUserDto: JSON.stringify(user)}})
    return this.http.put<Response>(`${this.endpointEditUser}`,  user);
  }

 

  ChangeRole(roleName: string, idUserSelect: string )
  {   
    return this.http.post<any>(`${this.endpointGetUser}/AsignarRolUsuario?userRoleDto=${roleName}&userId=${idUserSelect}`,null)     
  }

  

}
