import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from 'src/app/services/auth/account.service';
import { EnumRoles } from 'src/app/shared/Enumeradores/enumRoles.enum';
import { UserRole } from 'src/app/shared/models/Interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items: MenuItem[];
  IsAdmin: boolean = false;
  tamanoDefault = "width:100%"
  perfilView = {
    btnMenuPrincipal: EnumRoles.menuPrincipal,
    btnEnviarDinero: EnumRoles.EnviarDinero,
    btnOperaciones: EnumRoles.Operaciones,
    btnBeneficiarios: EnumRoles.Beneficiarios,
    btnsetting: EnumRoles.setting,
    btnadmin: EnumRoles.admin,
    btnValidador: EnumRoles.Validador,
    btnoperador: EnumRoles.operador,
    btnFormulario: EnumRoles.formulario,
    btnCliente: EnumRoles.cliente
  }

  constructor(private accountService: AccountService,
  ) { }

  ngOnInit(): void {

    
    let role = new BehaviorSubject<UserRole>(JSON.parse(localStorage.getItem("Role")));
    let rolUser = "";
    if (role.value != null) {
      rolUser = role.value.roleName;
    }


    if (rolUser == 'SuperAdmin') {
      this.IsAdmin = true;
    }
  }

  logout() {
    this.accountService.logout();
  }


  private _initMenu() {
    this.items = [
      {
        label: 'Perfil',
        routerLink: '/Agape/profile'
      },
      {
        label: 'Cerrar Sesión',
        command: () => {
          this.accountService.logout()
        }
      }
    ]

  }

}
