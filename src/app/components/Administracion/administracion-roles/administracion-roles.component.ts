import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/services/auth';
import { MenuService } from 'src/app/services/menu/menu.service';
import { RolesService } from 'src/app/services/user/roles.service';
import { Role } from 'src/app/shared/models/Interfaces';

@Component({
  selector: 'app-administracion-roles',
  templateUrl: './administracion-roles.component.html',
  styleUrls: ['./administracion-roles.component.css']
})
export class AdministracionRolesComponent implements OnInit {
  Form: FormGroup;
  value=''
  loading = false;
  submitted = false;
  paso_1:boolean = false
  Roles=[]; 
  selectedRol: Role[];
  datos:Role = {
    roleName: '',
    id:'',
    normalizedName:'',
  }
  
  editarRow=false;
  IdEdit=0;

  constructor(private alertService: AlertService,private formBuilder: FormBuilder,
    private roleservice:RolesService,
    private menu: MenuService
    , private confirmationService: ConfirmationService) {
      menu.tilteMenu = "Roles";
     }

  ngOnInit(): void {
    this.Form = this.formBuilder.group({
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
      

      this.roleservice.registerRole(this.datos).subscribe(data => {
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

     
      this.roleservice.registerRole(this.datos).subscribe(data => {
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
    this.roleservice.GetRole(true).subscribe(data => {
          this.Roles=data;
        

      },
        (error) => {
          this.alertService.error("Ha ocurrido un error ");
          this.loading = false;
        }
    )
  }

  edit(id){
    this.loading = true;
    this.paso_1 = true;
    let RolEdit=this.Roles.find(w=>w.id==id);
    this.IdEdit=id;
   
    
    
  }

  editRow(RolEdit){
    
    this.Form.controls["Name"].setValue(RolEdit.name);
    this.editarRow=true;
  }

  cancelarEdit(){
    this.Form.reset();
    this.editarRow=false;
    this.IdEdit=0;
    this.paso_1=false;
  }

  NewRow(){
    this.paso_1=true;
    this.Form.reset();
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
        this.roleservice.DeleteRole(id).subscribe(data => {
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
