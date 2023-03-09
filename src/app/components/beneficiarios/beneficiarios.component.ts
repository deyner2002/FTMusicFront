import { Component, OnInit } from '@angular/core';
import { MenuItemContent } from 'primeng/menu';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BeneficiaryModel } from 'src/app/shared/models/beneficiaryModel';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuService } from 'src/app/services/menu/menu.service';
import { BeneficiarioService } from './_service/beneficiario-service.service';
import { AccountService, AlertService } from 'src/app/services/auth';
import { ConfiguracionBancoService } from 'src/app/services/setting/configuracion-banco.service';
import { ConfiguracionParentescoService } from 'src/app/services/setting/configuracion-parentesco.service';
import { ConfiguracionTipoidentificacionService } from 'src/app/services/setting/configuracion-tipoidentificacion.service';
import { ConfiguracionMotivosService } from 'src/app/services/setting/configuracion-motivos.service';
import { TipoIdentifiacionModel } from 'src/app/shared/models/TipoIdentificacionModel';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRole } from 'src/app/shared/models/Interfaces';
import { BehaviorSubject } from 'rxjs';
import { ConfiguracionPaisService } from 'src/app/services/setting/configuracion-pais.service';
import { ConditionalExpr } from '@angular/compiler';


interface TiposCuenta {
  id: number,
  name: string,
}

@Component({
  selector: 'app-beneficiarios',
  templateUrl: './beneficiarios.component.html',
  styleUrls: ['./beneficiarios.component.css']
})
export class BeneficiariosComponent implements OnInit {
  Form: FormGroup;
  paso_1: boolean = false
  items: MenuItem[];
  selectedPais: BeneficiaryModel[];
  loading: boolean = false;

  displaySaveDialog: boolean = false;
  displaySave: boolean = false;


  editarRow = false;
  IdEdit = 0;
  submitted = false;

  tiposCuenta: TiposCuenta[];

  BancosBd = [];
  BancosFiltro=[];
  ParentescoBd = [];
  TipoIdBd = [];
  MotivoTransferenciaBd = [];
  BeneficiariosBd = [];
  Paises = [];

 

  userId:string;
  private userRoles: UserRole[] = [];
  roles: string = '';
  disabledBancos:boolean;

  datos: BeneficiaryModel = {
    id: 0,
    nombres: '',
    apellidos: '',
    tipoIdentidadId: '',
    noIdentidad: '',
    bancoId: 0,
    tipoCuenta: '',
    numeroCuenta: '',
    relacionId: 0,
    motivoTransferenciaId: 0,
    email: '',
    userId: '',
    paisId:0,
  }


  constructor(private menu: MenuService,
    private accountservice: AccountService,
    private formBuilder: FormBuilder,
    private beneficiarioService: BeneficiarioService,
    private alertService: AlertService,
    private configurarBanco: ConfiguracionBancoService,
    private configuraparentesco: ConfiguracionParentescoService,
    private configuretipoident: ConfiguracionTipoidentificacionService,
    private configurarmotivo: ConfiguracionMotivosService,
    private confirmationService: ConfirmationService,
    private configurarPais: ConfiguracionPaisService,
  ) {
    menu.tilteMenu = "Beneficiarios";

    this.tiposCuenta = [
      { name: 'Corriente', id: 0 },
      { name: 'Ahorro', id: 1 },
    ];



  }
  cancelarEdit() {
    this.Form.reset();
    this.IdEdit = 0;
    this.paso_1 = false;
  }

  NewRow() {
    this.Form.reset();
    this.paso_1 = true;
    this.IdEdit = 0;
  }

  edit(id) {
    this.loading = true;
    this.paso_1 = true;
    let BeneficiarioEdit = this.BeneficiariosBd.find(w => w.id == id);
    this.IdEdit = id;

    setTimeout(() => {
      this.editRow(BeneficiarioEdit);
    }, 500);

  }

  editRow(BeneficiarioEdit) {
    this.disabledBancos=true;

    this.Form.controls["apellidos"].setValue(BeneficiarioEdit.apellidos);
    this.Form.controls["tipoIdentidadId"].setValue(BeneficiarioEdit.tipoIdentidad.id);
    this.Form.controls["email"].setValue(BeneficiarioEdit.email);
    this.Form.controls["bancoId"].setValue(BeneficiarioEdit.banco.id);
    this.Form.controls["noIdentidad"].setValue(BeneficiarioEdit.noIdentidad);
    this.Form.controls["numeroCuenta"].setValue(BeneficiarioEdit.numeroCuenta);
    this.Form.controls["relacionId"].setValue(BeneficiarioEdit.relacion.id);
    this.Form.controls["tipoCuenta"].setValue(BeneficiarioEdit.tipoCuenta);
    this.Form.controls["nombres"].setValue(BeneficiarioEdit.nombres);
    this.editarRow = true;
  }

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  get email() { return this.Form.get('email'); }


  ngOnInit(): void {

    
    this.GetBeneficiarios();
    this.GetTipoId();
    this.GetParentesco();
    this.GetBancos();
    this.GetMotivoTransferencia();
    this.GetPais();
    this.disabledBancos=true;

    

    this.Form = this.formBuilder.group({
      apellidos: ['', Validators.required],
      tipoIdentidadId: ['', Validators.required],
      paisId: ['', Validators.required],
      bancoId: ['', Validators.required],
      
      noIdentidad: ['', Validators.required],
      nombres: ['', Validators.required],
      numeroCuenta: ['', Validators.required],
      relacionId: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.emailPattern),
      ])),

    })
    this.userId=this.accountservice.userValue.id;
    

    console.log("this.accountservice.userValue");
    console.log(this.accountservice.userValue);
    let role = new BehaviorSubject<UserRole>(JSON.parse(localStorage.getItem("Role")));
    console.log("let role = new BehaviorSubject<UserRole>(JSON.parse(localStorage.getItem(Role)));");
    console.log(role.value.roleName);
    this.roles = role.value.roleName


  }


 

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.Form.invalid) {
      return;
    }
    this.loading = true;

    if (this.editarRow) {

      this.datos.id = this.IdEdit;
      console.log(this.datos);
      this.datos.motivoTransferenciaId=this.MotivoTransferenciaBd[0].id;
      console.log(this.MotivoTransferenciaBd[0].id)
      this.beneficiarioService.UpdateBeneficiario(this.datos).subscribe(data => {
        if (!data.iserror) {
          this.paso_1 = false
         
          this.GetBeneficiarios();
          this.alertService.success("Modificacion exitosa");
        } else {
          this.alertService.error(data.message);
        }
      },
        (error) => {
          this.alertService.error("Ha ocurrido un error en el registro. Verifique que la información este correcta");
          this.loading = false;
        }
      )

    } else {

      this.alertService.clear();
      this.datos.userId = this.accountservice.userValue.id;
      this.datos.motivoTransferenciaId=this.MotivoTransferenciaBd[0].id;
      this.beneficiarioService.registerBeneficiario(this.datos).subscribe(data => {
        if (!data.iserror) {
          this.paso_1 = false
          

          setTimeout(()=>{                           
            this.GetBeneficiarios();
            this.Form.reset();
          }, 10000);
          this.alertService.success("Registro exitoso");
          
        } else {
          this.alertService.error(data.message);
        }

      },
        (error) => {
          this.alertService.error("Ha ocurrido un error en el registro. Verifique que la información este correcta");
          this.loading = false;
        }
      )

    }
    this.Form.reset();

  }

  delete(id) {
    this.alertService.clear();

    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar el registro?',
      header: 'Atencion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        this.beneficiarioService.DeleteBeneficiario(id).subscribe(data => {
          if (!data.iserror) {
            this.GetBeneficiarios();
          } else {
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

  GetBeneficiarios() {
    this.alertService.clear();
    this.userId=this.accountservice.userValue.id;
    let role = new BehaviorSubject<UserRole>(JSON.parse(localStorage.getItem("Role")));
    this.roles = role.value.roleName

    
    let id = this.accountservice.userValue.id;
    //this.loading = true;
    this.beneficiarioService.getBeneficiarios(this.roles, this.userId).subscribe(data => {
      if (!data.iserror) {
        this.BeneficiariosBd = data.obj;
      } else {
        this.alertService.error(data.message);
      }

    },
      (error) => {
        this.alertService.error("Ha ocurrido un error");
        this.loading = false;
      }
    ).add(() => {
      setTimeout(() => {
        console.log("llegue aqui dentro del tiempo, tiposid");
        console.log(this.BeneficiariosBd);
      }, 1000)
    });
  }


  GetBancos() {
    this.alertService.clear();


    //this.loading = true;
    this.configurarBanco.GetBanco(true).subscribe(data => {
      if (!data.iserror) {
        this.BancosBd = data.obj;
        this.BancosFiltro=data.obj;
      } else {
        this.alertService.error(data.message);
      }

    },
      (error) => {
        this.alertService.error("Ha ocurrido un error");
        this.loading = false;
      }
    )


  }



  GetParentesco() {
    this.alertService.clear();


    //this.loading = true;
    this.configuraparentesco.GetParentesco(true).subscribe(data => {
      if (!data.iserror) {
        this.ParentescoBd = data.obj;
      } else {
        this.alertService.error(data.message);
      }

    },
      (error) => {
        this.alertService.error("Ha ocurrido un error");
        this.loading = false;
      }
    )
  }

  GetTipoId() {
    this.alertService.clear();

    this.configuretipoident.GetTipoIdenti(true).subscribe(data => {
      if (!data.iserror) {
        this.TipoIdBd = data.obj;
      } else {
        this.alertService.error(data.message);
      }

    },
      (error) => {
        this.alertService.error("Ha ocurrido un error ");
        this.loading = false;
      }
    )
  }

  GetMotivoTransferencia() {
    this.alertService.clear();


    //this.loading = true;
    this.configurarmotivo.GetMotivo(true).subscribe(data => {
      if (!data.iserror) {
        this.MotivoTransferenciaBd = data.obj;
      } else {
        this.alertService.error(data.message);
      }

    },
      (error) => {
        this.alertService.error("Ha ocurrido un error");
        this.loading = false;
      }
    )
  }


  GetPais() {
    this.alertService.clear();



    this.configurarPais.GetPais(true).subscribe(data => {
      if (!data.iserror) {
        this.Paises = data.obj;
      } else {
        this.alertService.error(data.message);
      }

    },
      (error) => {
        this.alertService.error("Ha ocurrido un error ");
        this.loading = false;
      }
    )
  }


  buscarBancos(event){
    console.log("Event....");
    console.log(event)
    
    this.BancosFiltro=this.BancosBd.filter(banco=>banco.paisId==event.value);
    console.log("Bancos filtro");
    console.log(this.BancosFiltro)
    this.disabledBancos=false;

  }
 
}
