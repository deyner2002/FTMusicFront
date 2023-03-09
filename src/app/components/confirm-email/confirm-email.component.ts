import { Component, OnInit } from '@angular/core';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  msgs1: Message[];
  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.msgs1 = [
      {severity:'success', summary:'', detail:'Confirmación de email exitosa, ya puede iniciar sesión con sus credeciales de usuario'},
  
    ];

     this.primengConfig.ripple = true;
  }

}
