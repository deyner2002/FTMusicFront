import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/auth/account.service';
import { AlertService } from 'src/app/services/auth/alert.service';
import { UserRegister, UserRegisterFTMusic } from '../../shared/models/Interfaces';
import { AccordionModule } from 'primeng/accordion';
import { Utilidades } from 'src/app/shared/FuncionesGlobales/Utilidades';
import { ConfiguracionPaisService } from 'src/app/services/setting/configuracion-pais.service';

interface Generos {
  id: number,
  name: string,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ValidacionRut = '';
  showPasswor: boolean = false;
  userForm: FormGroup;
  generos: Generos[];
  PisesBd = [];
  value = ''
  loading = false;
  submitted = false;
  paso_1: boolean = true
  paso_2: boolean = false
  user: UserRegister = {
    firstName: '',
    lastName: '',
    rutNumber: '',
    birthdate: '',
    gender: '',
    adress: '',
    phoneNumber: '',
    profession: '',
    email: '',
    password: '',
    ConfirmPassword: '',
    token: '',
    country:0,
    declaracion:'',
    fondos:'',
    relacionpolitica:''
  }

  userFTMusic: UserRegisterFTMusic = {
    CONSECUTIVO:0,
    NOMBRE:'nombre prueba',
    CORREO:'prueba@gmail.com',
    CLAVE:'prueba'
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
    Coinsidencia: false,
    numero: false
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountservice: AccountService,
    private alertService: AlertService,
    private configurarPais:ConfiguracionPaisService
  ) {

    this.generos = [
      { id: 0, name: 'Masculino' },
      { id: 1, name: 'Femenino' },
      { id: 2, name: 'No especificar' }

    ]
  }
  get passwordRep() { return this.userForm.get('password'); }

  get email() { return this.userForm.get('email'); }

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  minDate: Date;

  maxDate: Date;

  ngOnInit(): void {
    this.GetPais();
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year - 18;
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      rutNumber: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      profession: ['', Validators.required],
      idPais: ['', Validators.required],
      fondos: ['', Validators.required],
      declaracion: ['', Validators.required],
      relacionpolitica: ['', Validators.required],
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(16),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$!@/#$%^&*(),.?":{}|<_;{}>-])[A-Za-z\d$@$!%*?&].{8,}'),
      ])),
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.emailPattern),
      ])),
    })
  }

  get f() { return this.userForm.controls }

  GetPais() {
    this.alertService.clear();



    this.configurarPais.getAllPaises().subscribe(data => {
       console.log(data)
        this.PisesBd = data;

    },
      (error) => {
        this.alertService.error("Ha ocurrido un error ");
        this.loading = false;
      }
    )
  }
  // register
  onSubmit() {

    this.submitted = true;
    this.alertService.clear();

    if (this.ValidacionRut != '') {
      return;
    }

    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;

    /*this.accountservice.registerUserFTMusic(this.userFTMusic).subscribe(data => {
      this.paso_1 = false
      this.paso_2 = true;
      this.alertService.success("FT Music exito");
    },
      (error) => {
        if (error.error.message != undefined) {
          this.alertService.error(error.error.message);
        } else {
          this.alertService.error('Error de sistema FT');
        }
        this.loading = false;
      }
    )*/

    this.accountservice.registerUser(this.user).subscribe(data => {
      this.paso_1 = false
      this.paso_2 = true;
      this.alertService.success("Registro exitoso, por favor confirme su cuenta ingresando al correo registrado");
    },
      (error) => {
        if (error.error.message != undefined) {
          this.alertService.error(error.error.message);
        } else {
          this.alertService.error('Error de sistema');
        }
        this.loading = false;
      }
    )

    
  }




  onValidateErrorClassRepitePass() {

    this.userForm.clearValidators();


    if ((this.passwordRep.dirty
      || this.passwordRep.touched)) {
      let data: string = this.passwordRep.value;

      if (data.search(/([A-Z])/g) == -1) {
        this.erroModalRePass.letraMayuscula = false;
      } else {
        this.erroModalRePass.letraMayuscula = true
      }
      if (data.search(/([a-z])/g) == -1) {
        this.erroModalRePass.letraMinuscula = false;
      } else {
        this.erroModalRePass.letraMinuscula = true
      }
      if (data.search(/[$!@/#$%^&*(),.?":{}|<_;{}>-]/g) == -1) {
        this.erroModalRePass.simbolo = false;
      } else {
        this.erroModalRePass.simbolo = true
      }
      if (this.passwordRep.hasError('minlength') || this.passwordRep.hasError('required')) {
        this.erroModalRePass.longitud = false;
      } else {
        this.erroModalRePass.longitud = true
      }
      if (data.search(/([0-9])/g) == -1) {
        this.erroModalRePass.numero = false;
      } else {
        this.erroModalRePass.numero = true;
      }
    }


    return "positive";
  }
  goBack() {
    window.history.back();
    //this.router.navigate(["/dashboard"]);
  }

  ValidateRut() {
    let Result = Utilidades.checkRut(this.user.rutNumber);
    if (Result == "ok") {
      this.ValidacionRut = '';
    } else {
      this.ValidacionRut = Result;
    }
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}