import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AccountService } from 'src/app/services/auth/account.service';
import { AlertService } from 'src/app/services/auth/alert.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ConfiguracionBancoService } from 'src/app/services/setting/configuracion-banco.service';
import { ConfiguracionPaisService } from 'src/app/services/setting/configuracion-pais.service';
import { BancoModel } from 'src/app/shared/models/BancoModel';
import { PaisModel } from 'src/app/shared/models/PaisModel';

@Component({
  selector: 'app-configuracion-bancos',
  templateUrl: './configuracion-bancos.component.html',
  styleUrls: ['./configuracion-bancos.component.css']
})


export class ConfiguracionBancosComponent implements OnInit {

  Form: FormGroup;
  value=''
  loading = false;
  submitted = false;
  paso_1:boolean = false
  Bancos=[]; 
  selectedPais: BancoModel[];
  datos:BancoModel = {
    Cod: '',
    Name: '',
    Id:0,
    UserId:'',
    FechaReg: new Date(),
    PaisId:0,
    Status:true
  }
  
  editarRow=false;
  IdEdit=0;

  

  Paises:PaisModel[];

  selectedPaisCode: string;

  constructor(private alertService: AlertService,private formBuilder: FormBuilder,
    private accountservice:AccountService,
    private menu: MenuService,
    private configurarBanco:ConfiguracionBancoService,
    private confirmationService: ConfirmationService,
    private configurarPais:ConfiguracionPaisService
    ) {
      menu.tilteMenu = "Bancos";


     }

  ngOnInit(): void {
    this.Get();
    this.Form = this.formBuilder.group({
      Cod: ['', Validators.required],
      Name: ['', Validators.required],
      Pais:['', Validators.required],
    })

   this.getPais();
    
  }

  getPais(){
    this.alertService.clear();


    this.loading = true;
    this.configurarPais.GetPais(true).subscribe(data => {
        if (!data.iserror) {
          this.Paises=data.obj;
        }else{
          this.alertService.error(data.message);
        }

      },
        (error) => {
          this.alertService.error("Ha ocurrido un error ");
          this.loading = false;
        }
    )
  }


  get f() { return this.Form.controls}

  // register
  onSubmit()
  {

    this.submitted = true;
    this.alertService.clear();

    if(this.Form.invalid){
      return;
    }
    this.loading = true;

    if (this.editarRow) {
      
      this.datos.Id=this.IdEdit;
      console.log(this.datos);
      this.configurarBanco.UpdateBanco(this.datos).subscribe(data => {
        if (!data.iserror) {
          this.paso_1 = false
          this.alertService.success("Registro exitoso");    
          this.Get();
        }else{
          this.alertService.error(data.message);
        }
      },
        (error) => {
          this.alertService.error("Ha ocurrido un error en el registro. Verifique que la información este correcta");
          this.loading = false;
        }
      )

    }else{

      this.datos.UserId=this.accountservice.userValue.id;
      this.configurarBanco.registerBanco(this.datos).subscribe(data => {
        if (!data.iserror) {
          this.paso_1 = false
          this.alertService.success("Registro exitoso");    
          this.Get();
          this.Form.reset();
        }else{
          this.alertService.error(data.message);
        }
          
        },
          (error) => {
            this.alertService.error("Ha ocurrido un error en el registro. Verifique que la información este correcta");
            this.loading = false;
          }
      )
    }

  }



  Get()
  {
    this.alertService.clear();


    this.loading = true;
    this.configurarBanco.GetBanco(true).subscribe(data => {
        if (!data.iserror) {
          this.Bancos=data.obj;
        }else{
          this.alertService.error(data.message);
        }

      },
        (error) => {
          this.alertService.error("Ha ocurrido un error");
          this.loading = false;
        }
    )
  }

  edit(id){
    this.loading = true;
    this.paso_1 = true;
    let BancoEdit=this.Bancos.find(w=>w.id==id);
    this.IdEdit=id;
   
    setTimeout(()=>{                           
      this.editRow(BancoEdit);
    }, 500);
    
  }

  editRow(BancoEdit){
    
    this.Form.controls["Cod"].setValue(BancoEdit.cod);
    this.Form.controls["Name"].setValue(BancoEdit.name);
    this.Form.controls["Pais"].setValue(BancoEdit.paisId);
    this.Form.controls["Cod"].disable();
    this.editarRow=true;
  }

  cancelarEdit(){
    this.Form.reset();
    this.Form.controls["Cod"].enable();
    this.editarRow=false;
    this.IdEdit=0;
    this.paso_1=false;
  }

  NewRow(){
    this.paso_1=true;
    this.Form.reset();
    this.Form.controls["Cod"].enable();
    this.editarRow=false;
    this.IdEdit=0;
  }

  delete(id){
    this.alertService.clear();

    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar el registro?',
      header: 'Atencion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        this.configurarBanco.DeleteBanco(id).subscribe(data => {
            if (!data.iserror) {
              this.Get();
            }else{
              this.alertService.error(data.message);
            }
    
          },
            (error) => {
              this.alertService.error("Ha ocurrido un error en el registro. Verifique que la información este correcta");
              this.loading = false;
            }
        )
      }
    });

    
  }

}
