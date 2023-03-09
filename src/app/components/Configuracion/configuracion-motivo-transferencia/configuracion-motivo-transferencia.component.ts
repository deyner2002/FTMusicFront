import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AccountService, AlertService } from 'src/app/services/auth';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ConfiguracionMotivosService } from 'src/app/services/setting/configuracion-motivos.service';
import { ConfiguracionPaisService } from 'src/app/services/setting/configuracion-pais.service';
import { MotivoTranferencia } from 'src/app/shared/models/MotivoTransferencia';

@Component({
  selector: 'app-configuracion-motivo-transferencia',
  templateUrl: './configuracion-motivo-transferencia.component.html',
  styleUrls: ['./configuracion-motivo-transferencia.component.css']
})
export class ConfiguracionMotivoTransferenciaComponent implements OnInit {

  Form: FormGroup;
  value=''
  loading = false;
  submitted = false;
  paso_1:boolean = false
  Paises=[]; 
  selectedPais: MotivoTranferencia[];
  datos:MotivoTranferencia = {
    Cod: '',
    Name: '',
    Id:0,
    UserId:'',
    FechaReg: new Date(),
    Status:true

  }
  
  editarRow=false;
  IdEdit=0;

  constructor(private alertService: AlertService,private formBuilder: FormBuilder,
    private accountservice:AccountService,
    private menu: MenuService,
    private configurarmotivo:ConfiguracionMotivosService
    , private confirmationService: ConfirmationService) {
      menu.tilteMenu = "Motivos transferencia";
     }

  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      Cod: ['', Validators.required],
      Name: ['', Validators.required],
      
    })
    this.Get();
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

      this.configurarmotivo.UpdateMotivo(this.datos).subscribe(data => {
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
      this.configurarmotivo.registerMotivo(this.datos).subscribe(data => {
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
    }

  }



  Get()
  {
    this.alertService.clear();


    this.loading = true;
    this.configurarmotivo.GetMotivo(true).subscribe(data => {
        if (!data.iserror) {
          this.Paises=data.obj;
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
    let PaisEdit=this.Paises.find(w=>w.id==id);
    this.IdEdit=id;
   
    setTimeout(()=>{                           
      this.editRow(PaisEdit);
    }, 500);
    
  }

  editRow(PaisEdit){
    
    this.Form.controls["Cod"].setValue(PaisEdit.cod);
    this.Form.controls["Name"].setValue(PaisEdit.name);
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
        this.configurarmotivo.DeleteMotivo(id).subscribe(data => {
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
