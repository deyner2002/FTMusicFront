import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AccountService } from 'src/app/services/auth/account.service';
import { Utilidades } from '../../../shared/FuncionesGlobales/Utilidades';
import { UserLogged, UserRole } from '../../../shared/models/Interfaces';
import { BehaviorSubject, finalize } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-logged',
  templateUrl: './user-logged.component.html',
  styleUrls:  ['./user-logged.component.css']
})
export class UserLoggedComponent implements OnInit {

  items:MenuItem[];

  errorMsj: string = '';
  user: string = ''
  roles: string = ''
  iniciales: string = '';

  private userApp!: UserLogged;
  private userRoles: UserRole[] = []

  constructor(
    private accountservice:AccountService,
    private userService: UserService)
    {    
    }

  ngOnInit(): void 
  {       
    
    
    this.getUser();   
    this._initMenu()  
  }

  private _initMenu()
  {
    this.items = [
      {
        label:'Perfil',
        routerLink:'/Agape/profile'
      },
      {
        label:'Cerrar Sesión',
        command:() => {
          this.accountservice.logout()
        }
      }
    ]  
  }

  private _initUserLogged ()
  {      
    this.user = this.userApp?.firstName 
    this.roles = this.userRoles.filter(w=>w.isSelected==true).map(rol => rol.roleName).join('-')
    if(this.roles == 'Clientes'){
      this.roles = 'Perfil';
    }
    this.iniciales = this.userApp?.firstName[0].toUpperCase()+this.userApp?.lastName[0].toUpperCase();
    console.log(this.iniciales);
    let FlagReloag = new BehaviorSubject<number>(JSON.parse(localStorage.getItem("RecargarPage")));
    if (FlagReloag.value==0) {
      Utilidades.saveDatosStorage(1, "RecargarPage");
      window.location.reload();
    }
  }

  private async getUser()
  {
    await this.userService.getUser()     
    .subscribe(result => {    
      this.userApp = result.obj;     
      Utilidades.saveDatosStorage(this.userApp, "User");
      this.getUserRoles();
    }, (err)=>{
      console.log(err)
    })
  
  return this.user;        
  }

  private getUserRoles()
  {
    this.userService.getUserRole()
      .subscribe(result => {
        console.log(result)
        this.userRoles = result.obj;
        Utilidades.saveDatosStorage(result.obj.find(x=>x.isSelected==true), "Role");
        this._initUserLogged();
      }, (err)=>{
        console.log(err)
      })
  }
}