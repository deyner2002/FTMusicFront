import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ImageModule} from 'primeng/image';
import { TagModule } from 'primeng/tag';

import {CarouselModule} from 'primeng/carousel';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {CalendarModule} from 'primeng/calendar';
import {DividerModule} from 'primeng/divider';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {PasswordModule} from 'primeng/password';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
//import { ClienteModule } from './modules/clientes.module'

import { AlertComponent } from './components/alert/alert.component';
import { HomeComponent } from './components/home/home.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { P404Component } from './components/p404/p404.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutprivadoComponent } from './components/layoutprivado/layoutprivado.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfiguracionBancosComponent } from './components/Configuracion/configuracion-bancos/configuracion-bancos.component';
import { ConfiguracionPaisComponent } from './components/Configuracion/configuracion-pais/configuracion-pais.component';
import { ConfiguracionParentescoComponent } from './components/Configuracion/configuracion-parentesco/configuracion-parentesco.component';
import { ConfiguracionMotivoTransferenciaComponent } from './components/Configuracion/configuracion-motivo-transferencia/configuracion-motivo-transferencia.component';
import { ConfiguracionTipoIdentificacionComponent } from './components/Configuracion/configuracion-tipo-identificacion/configuracion-tipo-identificacion.component';
import { RegisterResetPasswordComponent } from './components/register/register-reset-password/register-reset-password.component';
import { DashboardConfigComponent } from './components/Configuracion/dashboard-config/dashboard-config.component';

import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderComponent } from './components/loader/loader.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { LoaderInterceptorService } from './services/loader/loader-interceptor.service';
import { UserLoggedComponent } from './components/dashboard/user-logged/user-logged.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {RippleModule} from 'primeng/ripple';
import { RegisterForgotpasswordComponent } from './components/register/register-forgotpassword/register-forgotpassword.component';
import { DashboardAdminComponent } from './components/Administracion/dashboard-admin/dashboard-admin.component';
import { AdministracionUserComponent } from './components/Administracion/administracion-user/administracion-user.component';
import { AdministracionRolesComponent } from './components/Administracion/administracion-roles/administracion-roles.component';
import { ExchangeRateComponent } from './components/exchange-rate/exchange-rate.component';
import { SendMoneyComponent } from './components/send-money/send-money.component';
import { OperationsComponent } from './components/operations/operations.component';
import { CalculatorComponent } from './components/send-money/sendmoney-calculator/calculator.component';
import { LastOperationsListComponent } from './components/operations/operations-last-list/last-operations-list.component';
import { BeneficiariosComponent } from './components/beneficiarios/beneficiarios.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileCardComponent } from './components/user-profile/components/user-profile-card/user-profile-card.component';
import {CardModule} from 'primeng/card';

import { GeneroPipe } from './shared/pipes/genero.pipe';
import { ValidadorComponent } from './components/validador/validador.component';
import { OperadorComponent } from './components/operador/operador.component';
import { MasterComponent } from './components/master/master.component';
import { ConfiguracionTarifasComponent } from './components/configuracion/configuracion-tarifas/configuracion-tarifas.component';
import { PerfilDirective } from './directivas/perfil.directive';
import { ListaBeneficiariosComponent } from './components/send-money/sendmoney-lista-beneficiarios/sendmoney-lista-beneficiarios.component';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { SafePipePipe } from './shared/pipes/safe-pipe.pipe';
import { CurrencyFormatterDirective } from './directivas/currency-formatter.directive';
import { PipeDecimalPipe } from './shared/pipes/pipe-decimal.pipe';
import { LoginLoyalComponent } from './components/login-loyal/login-loyal.component';







@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LayoutprivadoComponent,
    P404Component,
    HomeComponent,
    LoginComponent,
    UnauthorizedComponent,
    AlertComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    ConfiguracionBancosComponent,
    ConfiguracionPaisComponent,
    ConfiguracionParentescoComponent,
    ConfiguracionMotivoTransferenciaComponent,
    ConfiguracionTipoIdentificacionComponent,
    RegisterResetPasswordComponent,
    DashboardConfigComponent,
    DashboardComponent,
    LoaderComponent,
    UserLoggedComponent,
    RegisterForgotpasswordComponent,
    DashboardAdminComponent,
    AdministracionUserComponent,
    AdministracionRolesComponent,
    SendMoneyComponent,
    OperationsComponent,
    CalculatorComponent,
    ExchangeRateComponent,
    LastOperationsListComponent,
    BeneficiariosComponent,
    UserProfileComponent,
    UserProfileCardComponent,
    GeneroPipe,
    ValidadorComponent,
    OperadorComponent,
    MasterComponent,
    ConfiguracionTarifasComponent,
    PerfilDirective,
    ListaBeneficiariosComponent,
    FilterPipe,
    SafePipePipe,
    CurrencyFormatterDirective,
    PipeDecimalPipe,
    LoginLoyalComponent

    
    
  ],
  
  imports: [
    CarouselModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    AvatarGroupModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    DividerModule,
    CalendarModule,
    TableModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
    ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    MenuModule,
    MessagesModule,
    MessageModule,
    RippleModule,
    CommonModule,
    CardModule,
    MenubarModule,
    PasswordModule,
    AlifeFileToBase64Module,
    ImageModule,
    TagModule
    
  ],
  providers: [
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    CurrencyPipe,
    MessageService
  ],
  exports:[
    GeneroPipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
