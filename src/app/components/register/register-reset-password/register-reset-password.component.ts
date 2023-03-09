import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AccountService, AlertService } from 'src/app/services/auth';
import { UserRegister } from 'src/app/shared/models/Interfaces';

@Component({
  selector: 'app-register-reset-password',
  templateUrl: './register-reset-password.component.html',
  styleUrls: ['./register-reset-password.component.css']
})
export class RegisterResetPasswordComponent implements OnInit {
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

  erroModal = {
    letraMinuscula: false,
    letraMayuscula: false,
    simbolo: false,
    longitud: false
  }
  erroModalRePass = {
    letraMinuscula: false,
    letraMayuscula: false,
    simbolo: false,
    longitud: false,
    Coinsidencia:false
  }
  showPasswor:boolean=false;

  Paso1=true;
  Paso2=false;
  constructor(private router:Router,private el: ElementRef, private accountService:AccountService,
    private alertService: AlertService,private route: ActivatedRoute,) { }

  get password() { return this.formEdicion.get('password'); }
  get passwordRep() { return this.formEdicion.get('RepitePass'); }


  ngOnInit(): void {
    this.route.queryParams.subscribe((query: Params) => {
      this.user.email = query.email;
      this.user.token = query.token;
    });
   
    this.formEdicion = new FormGroup({
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/([a-z]|[A-Z]|[!@#$%^&*(),.?":{}|<>\-\+_])/g),
      ])),
      RepitePass: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/([a-z]|[A-Z]|[!@#$%^&*(),.?":{}|<>\-\+_])/g),
      ]))
    });
  }

  onSubmit() {
     if((this.password.value.length ==  0 || this.password.invalid) ){
       this.formEdicion.get('password').setErrors({'empty': true});
       this.formEdicion.markAllAsTouched();
       this.formEdicion.markAsDirty();
       return;
     }else if(this.passwordRep.value != this.password.value){
      return;
     }

     this.user.ConfirmPassword=this.passwordRep.value;
     this.user.password=this.password.value;

     this.accountService.resetPassUser(this.user).subscribe(data => {
      if (!data['iserror']) {
        this.Paso1=false;
        this.Paso2=true;
   
        this.msgs1 = [
         {severity:'success', summary:'', detail:'Se cambio la clave de forma correcta!'},
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
  onValidateErrorClass() {

    this.formEdicion.clearValidators();


    if ((this.password.dirty
        || this.password.touched)) {
      let data: string = this.password.value;

      if (data.search(/([A-Z])/g) == -1) {
        this.erroModal.letraMayuscula = false;
      }else
      {
        this.erroModal.letraMayuscula=true
      }
      if (data.search(/([a-z])/g) == -1) {
        this.erroModal.letraMinuscula = false;
      }else
      {
        this.erroModal.letraMinuscula=true
      }
      if (data.search(/[!@#$%^&*(),.?":{}|<>\-\+_]/g) == -1) {
        this.erroModal.simbolo = false;
      }else
      {
        this.erroModal.simbolo=true
      }
      if (this.password.hasError('minlength') || this.password.hasError('required') ) {
        this.erroModal.longitud = false;
      }else
      {
        this.erroModal.longitud=true
      }
    }

    
    return "positive";
  }
  onValidateErrorClassRepitePass() {

    this.formEdicion.clearValidators();


    if ((this.passwordRep.dirty
        || this.passwordRep.touched)) {
      let data: string = this.passwordRep.value;

      if (data.search(/([A-Z])/g) == -1) {
        this.erroModalRePass.letraMayuscula = false;
      }else
      {
        this.erroModalRePass.letraMayuscula=true
      }
      if (data.search(/([a-z])/g) == -1) {
        this.erroModalRePass.letraMinuscula = false;
      }else
      {
        this.erroModalRePass.letraMinuscula=true
      }
      if (data.search(/[!@#$%^&*(),.?":{}|<>\-\+_]/g) == -1) {
        this.erroModalRePass.simbolo = false;
      }else
      {
        this.erroModalRePass.simbolo=true
      }
      if (this.passwordRep.hasError('minlength') || this.passwordRep.hasError('required') ) {
        this.erroModalRePass.longitud = false;
      }else
      {
        this.erroModalRePass.longitud=true
      }
      if(this.passwordRep.value != this.password.value){
        this.erroModalRePass.Coinsidencia=false
      }else{
        this.erroModalRePass.Coinsidencia=true
      }
    }

    
    return "positive";
  }
  goBack(){
    window.history.back();
    //this.router.navigate(["/dashboard"]);
  }

}
