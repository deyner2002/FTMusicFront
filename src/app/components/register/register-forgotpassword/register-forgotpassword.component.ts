import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AccountService, AlertService } from 'src/app/services/auth';
import { UserRegister } from 'src/app/shared/models/Interfaces';

@Component({
  selector: 'app-register-forgotpassword',
  templateUrl: './register-forgotpassword.component.html',
  styleUrls: ['./register-forgotpassword.component.css']
})
export class RegisterForgotpasswordComponent implements OnInit {
  msgs1: Message[];
  formEdicion: FormGroup;

  user:UserRegister = {
    firstName: '',
    lastName: '',
    rutNumber:'',
    birthdate:'',
    gender:'',
    adress:'',
    phoneNumber:'',
    profession:'',
    email:'',
    password:'',
    ConfirmPassword:'',
    token:'',
    country:0,
    declaracion:'',
    fondos:'',
    relacionpolitica:''
  }


  Paso1=true;
  Paso2=false;
  constructor(private router:Router,private el: ElementRef, private accountService:AccountService,
    private alertService: AlertService) { }

  get mail() { return this.formEdicion.get('email'); }


  ngOnInit(): void {
    
   
    this.formEdicion = new FormGroup({
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.email
      ]))
    });
  }

  onSubmit() {
    if(this.formEdicion.invalid){
      return;
    }
     this.user.email=this.mail.value;

     this.accountService.forgotPassUser(this.user).subscribe(data => {
      if (!data['iserror']) {
        this.Paso1=false;
        this.Paso2=true;
   
        this.msgs1 = [
         {severity:'success', summary:'', detail:'Se envió a su correo los pasos para hacer el cambio de clave!!'},
         ];
      }else{
        this.alertService.error(data.message);
      }
      
    },
      (error) => {
        if (error.error.message != undefined) {
          this.alertService.error(error.error.message);
        }else{
          this.alertService.error('Error de sistema');
        }
      }
  )
    

  }
  
  goBack(){
    window.history.back();
    //this.router.navigate(["/dashboard"]);
  }
}
