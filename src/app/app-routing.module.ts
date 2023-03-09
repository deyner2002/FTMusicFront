import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficiariosComponent } from './components/beneficiarios/beneficiarios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutprivadoComponent } from './components/layoutprivado/layoutprivado.component';
import { LoginComponent } from './components/login/login.component';
import { P404Component } from './components/p404/p404.component';
import { RegisterComponent } from './components/register/register.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AuthGuardService } from './services/auth/helper/auth-guard.service';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { SendMoneyComponent } from './components/send-money/send-money.component';
import { OperationsComponent } from './components/operations/operations.component';
import { DashboardConfigComponent } from './components/Configuracion/dashboard-config/dashboard-config.component';
import { ConfiguracionBancosComponent } from './components/Configuracion/configuracion-bancos/configuracion-bancos.component';
import { ConfiguracionMotivoTransferenciaComponent } from './components/Configuracion/configuracion-motivo-transferencia/configuracion-motivo-transferencia.component';
import { ConfiguracionPaisComponent } from './components/Configuracion/configuracion-pais/configuracion-pais.component';
import { ConfiguracionParentescoComponent } from './components/Configuracion/configuracion-parentesco/configuracion-parentesco.component';
import { ConfiguracionTipoIdentificacionComponent } from './components/Configuracion/configuracion-tipo-identificacion/configuracion-tipo-identificacion.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegisterResetPasswordComponent } from './components/register/register-reset-password/register-reset-password.component';
import { RegisterForgotpasswordComponent } from './components/register/register-forgotpassword/register-forgotpassword.component';
import { DashboardAdminComponent } from './components/Administracion/dashboard-admin/dashboard-admin.component';
import { AdministracionUserComponent } from './components/Administracion/administracion-user/administracion-user.component';
import { AdministracionRolesComponent } from './components/Administracion/administracion-roles/administracion-roles.component';
import { ValidadorComponent } from './components/validador/validador.component';
import { OperadorComponent } from './components/operador/operador.component';
import { MasterComponent } from './components/master/master.component';
import { ConfiguracionTarifasComponent } from './components/configuracion/configuracion-tarifas/configuracion-tarifas.component';
import { LoginLoyalComponent } from './components/login-loyal/login-loyal.component';

const routes: Routes = [  {

  path: '',
  component: LayoutComponent,
  children: [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'loginLoyal', component: LoginLoyalComponent, pathMatch: 'full' },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: 'registerUser', component: RegisterComponent },
    { path: 'successfulRegister', component: ConfirmEmailComponent},
    { path: 'recoverpassword', component: RegisterResetPasswordComponent},
    { path: 'olvideclave', component: RegisterForgotpasswordComponent}
  ]
},
{
  path: 'Agape',
  component: LayoutprivadoComponent,
  children: [
    { path: '', component: LoginComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
    { path: 'home', component: HomeComponent,  canActivate: [AuthGuardService] },
    { path: 'sendMoney', component: SendMoneyComponent,  canActivate: [AuthGuardService] },
    { path: 'operations', component: OperationsComponent,  canActivate: [AuthGuardService] },  
    { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuardService] },
    { path: 'beneficiario', component: BeneficiariosComponent,  canActivate: [AuthGuardService] },
    { path: 'config', component: DashboardConfigComponent,  canActivate: [AuthGuardService] },
    { path: 'bancos', component: ConfiguracionBancosComponent,  canActivate: [AuthGuardService] },
    { path: 'motivoTrans', component: ConfiguracionMotivoTransferenciaComponent,  canActivate: [AuthGuardService] },
    { path: 'pais', component: ConfiguracionPaisComponent,  canActivate: [AuthGuardService] },
    { path: 'parentesco', component: ConfiguracionParentescoComponent,  canActivate: [AuthGuardService] },
    { path: 'tipoId', component: ConfiguracionTipoIdentificacionComponent,  canActivate: [AuthGuardService] },
    { path: 'profile', component: UserProfileComponent,  canActivate: [AuthGuardService] },
    { path: 'admin', component: DashboardAdminComponent,  canActivate: [AuthGuardService] },
    { path: 'adminUser', component: AdministracionUserComponent,  canActivate: [AuthGuardService] },
    { path: 'adminRoles', component: AdministracionRolesComponent,  canActivate: [AuthGuardService] },
    { path: 'validador', component: ValidadorComponent,  canActivate: [AuthGuardService] },
    { path: 'operador', component: OperadorComponent,  canActivate: [AuthGuardService] },
    { path: 'master', component: MasterComponent,  canActivate: [AuthGuardService] },
    { path: 'tarifa', component: ConfiguracionTarifasComponent,  canActivate: [AuthGuardService] },
    { path: 'formulario', component: LoginLoyalComponent, canActivate: [AuthGuardService] },
    { path: 'cliente', component: LoginLoyalComponent, canActivate: [AuthGuardService] },
   
    
  ] 
},
{ path: '**', component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
