import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment, environment2 } from 'src/environments/environment';
import { UserJwt } from 'src/app/shared/models/jwt';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Utilidades } from 'src/app/shared/FuncionesGlobales/Utilidades';
import { Constantes } from 'src/app/shared/Constantes/constantes';
import { RegisterResponse, UserRegister, UserRegisterFTMusic } from 'src/app/shared/models/Interfaces';
import { of } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
  endpointLogin: string;
  endpointUserRegister: string;
  endpointUserRegisterFTMusic: string;
  endpointAccount: string;
 
  private userSubject: BehaviorSubject<UserJwt> ;
  //public userJwt: Observable<UserJwt>;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.endpointLogin=environment.Login;
    this.endpointUserRegister=environment.RegisterUser;
    this.endpointUserRegisterFTMusic=environment2.RegisterUser;
    this.endpointAccount=environment.Account;
    this.userSubject = new BehaviorSubject<UserJwt>(JSON.parse(localStorage.getItem(Constantes.KeyStorage.jwt)));
    //this.user = this.userSubject.asObservable();
   }

   loginUser(username:string, password:string){

    let ObUser={
      "email": username,
      "password": password,
      "rememberMe": false
    }

    return this.http.post<UserJwt>(this.endpointLogin,ObUser, { })
        .pipe(map(user => {

          Utilidades.saveDatosStorage(user, "jwt"); 
          return user;
    }));
  }

  registerUser(user: UserRegister )
  {   
    return this.http.post<RegisterResponse>(this.endpointUserRegister, user, { })     
  }

  registerUserFTMusic(user: UserRegisterFTMusic )
  {   
    return this.http.post<RegisterResponse>(this.endpointUserRegisterFTMusic, user, { })     
  }

  resetPassUser(user: UserRegister )
  {   
    return this.http.post<RegisterResponse>(this.endpointAccount+"/ResetPassword", user, { })     
  }

  forgotPassUser(user: UserRegister )
  {   
    return this.http.post<RegisterResponse>(this.endpointAccount+"/ForgotPassword", user, { })     
  }

  isVigenteSession(){
    let TimeCreacion=new BehaviorSubject<UserJwt>(JSON.parse(localStorage.getItem("jwt")));
    let today = moment();
    if(today>moment(TimeCreacion.value.expiration)){
      return false;
    }else{
      return true;
    }
  }

  

  public get userValue(): UserJwt {
    console.log(this.userSubject.value)
    return this.userSubject.value;
  }

  logout() {
    localStorage.removeItem('RecargarPage');
    localStorage.removeItem('Beneficiarios');
    localStorage.removeItem('jwt');
    localStorage.removeItem('Role');
    localStorage.removeItem('User');
    this.router.navigate(['/login']);
   // window.location.href= '../login';
  }

}





