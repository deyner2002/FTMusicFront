import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/auth/account.service';
import { AlertService } from 'src/app/services/auth/alert.service';
import { first, take } from 'rxjs/operators';
import { Utilidades } from 'src/app/shared/FuncionesGlobales/Utilidades';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit  {
  returnUrl: string;
  btnDisable = true

  loginForm: FormGroup;
  
  loading = false;
  submitted = false;
  fieldTextType: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountservice:AccountService,
    private alertService: AlertService) {
    
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      mail: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'Agape/home';
    if (this.accountservice.userValue !== null) {
      this.router.navigate(['Agape/home']);
    }
  }

 

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
  
      this.loading = true;
      this.accountservice.loginUser(this.f.mail.value, this.f.password.value).subscribe((data)=>
      {
          
        //this.router.navigateByUrl('Agape/home', { skipLocationChange: true })
        Utilidades.saveDatosStorage(0, "RecargarPage");
        window.location.reload();
        //window.location.href='#/Agape/home';
        //this.router.navigate([this.returnUrl]);
          
      },
      error => {
        if (error.error.message != undefined) {
          this.alertService.error(error.error.message);
        }else{
          this.alertService.error('Usuario invalido');
        }
        
        this.loading = false;
      }
      
      );
     
    
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
