import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnumRoles } from 'src/app/shared/Enumeradores/enumRoles.enum';
import { Utilidades } from 'src/app/shared/FuncionesGlobales/Utilidades';
import { UserRole } from 'src/app/shared/models/Interfaces';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class RolesUserService {

  constructor(
  ) { }

  onValidarMenu(elemento: string) {
    let role = new BehaviorSubject<UserRole>(JSON.parse(localStorage.getItem("Role")));
    let rolUser = "";
    if (role.value != null) {
      rolUser = role.value.roleName;
    }
    switch (rolUser) {
      case 'SuperAdmin':
        return this.getPermisologiaAdmin()
      case 'Clientes':
        return this.getPermisologiaCliente(elemento)
      case 'Operador':
        return this.getPermisologiaOperador(elemento)
      case 'Validador':
        return this.getPermisologiaValidador(elemento)

      default:
        break;
    }
  }
  private getPermisologiaAdmin() {
    return true;
  }
  private getPermisologiaValidador(elemento: string) {

    switch (elemento) {
      case ("Agape/home"):
        {
          return true;
        }
      case (EnumRoles.Validador):
        {
          return true;
        }
      case (EnumRoles.Perfil):
        {
          return true;
        }
      case (EnumRoles.menuPrincipal):
        {
          return true;
        }
      case (EnumRoles.Operaciones):
        {
          return true;
        }


      default:
        {
          return false;
        }

    }
  }

  private getPermisologiaCliente(elemento: string) {

    switch (elemento) {
      case (EnumRoles.menuPrincipal):
        {
          return true;
        }
      case ("Agape/home"):
        {
          return true;
        }
      case (EnumRoles.EnviarDinero):
        {
          return true;
        }
      case (EnumRoles.Operaciones):
        {
          return true;
        }
      case (EnumRoles.Beneficiarios):
        {
          return true;
        }
      case (EnumRoles.Perfil):
        {
          return true;
        }
        case (EnumRoles.formulario):
        {
          return true;
        }
        case (EnumRoles.cliente):
        {
          return true;
        }
      /*case (EnumRoles.setting):
      {
          return false;
      }
      case (EnumRoles.admin):
      {
          return false;
      }
      case (EnumRoles.Validador):
      {
          return false;
      }
      case (EnumRoles.operador):
      {
          return false;
      }
      case (EnumRoles.Bancos):
      {
          return false;
      }
      case (EnumRoles.MotivoTransferencia):
      {
          return false;
      }
      case (EnumRoles.Pais):
      {
          return false;
      }
      case (EnumRoles.Parentezcco):
      {
          return false;
      }
      case (EnumRoles.TipoIdent):
      {
          return false;
      }
      case (EnumRoles.Tarifas):
      {
          return false;
      }
      case (EnumRoles.Usuarios):
      {
          return false;
      }
      case (EnumRoles.Roles):
      {
          return false;
      }*/


      default:
        {
          return false;
        }

    }
  }


  private getPermisologiaOperador(elemento: string) {
    switch (elemento) {
      case ("Agape/home"):
        {
          return true;
        }
      case (EnumRoles.operador):
        {
          return true;
        }
      case (EnumRoles.Perfil):
        {
          return true;
        }
      case (EnumRoles.menuPrincipal):
        {
          return true;
        }
      case (EnumRoles.Operaciones):
        {
          return true;
        }

      default:
        {
          return false;
        }
    }
  }
}