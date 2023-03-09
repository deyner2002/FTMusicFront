import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"

import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CalendarModule} from 'primeng/calendar';
import {DividerModule} from 'primeng/divider';
import {InputTextModule} from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MultiSelectModule} from 'primeng/multiselect';
import { ExchangeRateComponent } from '../components/exchange-rate/exchange-rate.component';
import { SendMoneyComponent } from '../components/send-money/send-money.component';
import { OperationsComponent } from '../components/operations/operations.component';
import { CalculatorComponent } from '../components/send-money/sendmoney-calculator/calculator.component';
import { LastOperationsListComponent } from '../components/operations/operations-last-list/last-operations-list.component';
import { BeneficiariosComponent } from '../components/beneficiarios/beneficiarios.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { UserProfileCardComponent } from '../components/user-profile/components/user-profile-card/user-profile-card.component';

import { GeneroPipe } from '../shared/pipes/genero.pipe';

@NgModule({
  declarations: [
    
    
    
  ],
  imports: [
    CommonModule,
    AvatarModule,
    ButtonModule,
    CalendarModule,
    DividerModule,
    CardModule,
    BrowserModule,
    FormsModule,
    InputTextModule,
    BrowserAnimationsModule,  
    MultiSelectModule,
    ReactiveFormsModule
    
  ],
  exports:[
    
    
    
  ]
})
export class ClienteModule { }
