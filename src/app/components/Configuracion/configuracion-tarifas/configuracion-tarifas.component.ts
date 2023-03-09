import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { AccountService, AlertService } from 'src/app/services/auth';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ConfiguracionPaisService } from 'src/app/services/setting/configuracion-pais.service';
import { ConfigutacionTarifaService } from 'src/app/services/setting/configutacion-tarifa.service';
import { TarifaModel } from 'src/app/shared/models/TarifaModel';

@Component({
  selector: 'app-configuracion-tarifas',
  templateUrl: './configuracion-tarifas.component.html',
  styleUrls: ['./configuracion-tarifas.component.css']
})
export class ConfiguracionTarifasComponent implements OnInit {

  Form: FormGroup;
  FormUpdate: FormGroup;
  value = ''
  loading = false;
  submitted = false;
  paso_1: boolean = false
  Paises = [];
  tarifas: TarifaModel[];
  selectedTarifa: TarifaModel[];

  displaySave: boolean = false;
  displaySaveDialog: boolean = false;

  tarifaModificar: TarifaModel = {

    paisOrigenId: 0,
    paisDestinoId: 0,
    precioCompra: 0,
    precioVenta: 0,
    utilidad: 0,
    tasaNeta: 0,
    tasaPublica: 0,
    userId: '',
    id: 0,
    fechaReg: new Date()
  }

  items: MenuItem[];
  datos: TarifaModel = {

    paisOrigenId: 0,
    paisDestinoId: 0,
    precioCompra: null,
    precioVenta: null,
    utilidad: null,
    tasaNeta: null,
    tasaPublica: null,
    userId: '',
    id: 0,
    fechaReg: new Date()
  }



  editarRow = false;
  IdEdit = 0;


  TarifasDB = [];

  constructor(
    private menu: MenuService,
    private alertService: AlertService,
    private configurarTarifa: ConfigutacionTarifaService,
    private configurarPais: ConfiguracionPaisService,
    private accountservice: AccountService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService

  ) {

    menu.tilteMenu = "Tarifas";



  }

  get f() { return this.Form.controls; }
  get fU() { return this.FormUpdate.controls; }

  CalcularTasas(Update){
    if(!Update){
      if (this.f.utilidad.value>0 && this.f.precioCompra.value>0 && this.f.precioVenta.value>0) {
        let TasaNeta=this.f.precioVenta.value/this.f.precioCompra.value;
        let Utilidad=parseFloat( this.f.utilidad.value)
        this.f.tasaNeta.setValue(TasaNeta);
        this.f.tasaPublica.setValue(TasaNeta-(TasaNeta*(Utilidad/100)))
      }
    }else{
      if (this.fU.utilidad.value>0 && this.fU.precioCompra.value>0 && this.fU.precioVenta.value>0) {
        let TasaNeta=this.fU.precioVenta.value/this.fU.precioCompra.value;
        let Utilidad=parseFloat( this.fU.utilidad.value)
        this.fU.tasaNeta.setValue(TasaNeta);
        this.fU.tasaPublica.setValue(TasaNeta-(TasaNeta*(Utilidad/100)))
      }
    }
    
  
  }

  ngOnInit(): void {

    this.GetTarifas();
    this.GetPais();
    
    
    



    this.Form = this.formBuilder.group({
      paisOrigenId: ['', Validators.required],
      paisDestinoId: ['', Validators.required],
      precioCompra: ['', Validators.required],
      precioVenta: ['', Validators.required],
      utilidad: ['', Validators.required],
      tasaNeta: ['', Validators.required],
      tasaPublica: ['', Validators.required]
    })

    this.FormUpdate = this.formBuilder.group({
      paisOrigenId: ['', Validators.required],
      paisDestinoId: ['', Validators.required],
      precioCompra: ['', Validators.required],
      precioVenta: ['', Validators.required],
      utilidad: ['', Validators.required],
      tasaNeta: ['', Validators.required],
      tasaPublica: ['', Validators.required]
    })

    this.items = [
      {
        label: "Agregar",
        icon: "pi pi-fw pi-plus",
        command: () => this.showSveDialog()
      }
    ]

  }

  showSveDialog() {
    this.displaySaveDialog = true;
  }

  showSve(Tarifas) {

    this.displaySave = true;
    

    this.tarifaModificar = { 
      paisOrigenId: Tarifas.paisOrigenId,
      paisDestinoId: Tarifas.paisDestinoId,
      precioCompra: Tarifas.precioCompra,
      precioVenta: Tarifas.precioVenta,
      utilidad: Tarifas.utilidad,
      tasaNeta: Tarifas.tasaNeta,
      tasaPublica: Tarifas.tasaPublica,
      userId: Tarifas.userId,
      id: Tarifas.id,
      fechaReg: Tarifas.fechaReg
    };





  }

  selectProduct() {
    alert("alert products");
  }





  GetTarifas() {
    this.alertService.clear();


    //this.loading = true;
    this.configurarTarifa.getTarifas().subscribe(data => {
      if (!data.iserror) {
        this.TarifasDB = data.obj;
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

      }, 1000)
    });
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


  onSubmit() {

    this.submitted = true;
    this.alertService.clear();

    if (this.Form.invalid) {
      return;
    }




  }

  registrarTarifa() {

    this.datos.userId = this.accountservice.userValue.id;
    console.log(this.datos)


    this.configurarTarifa.saveTarifas(this.datos).subscribe(data => {
      if (!data.iserror) {

        this.alertService.success("Registro exitoso");
        this.GetTarifas();
        this.Form.reset();
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

  updateTarifa() {

    this.tarifaModificar.userId = this.accountservice.userValue.id;
    console.log("this.tarifaModificar")
    console.log(this.tarifaModificar)


    this.configurarTarifa.UpdateTarifa(this.tarifaModificar).subscribe(data => {
      if (!data.iserror) {

        this.alertService.success("Modificación exitosa");
        this.GetTarifas();
        this.Form.reset();
      } else {
        this.alertService.error(data.message);
      }

    },
      (error) => {
        this.alertService.error("Ha ocurrido un error en la modificación. Verifique que la información este correcta");
        this.loading = false;
      }
    )
    this.displaySave = false;

  }


  deleteTarifa(TarifasDB) {


    this.alertService.clear();

    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar el registro?',
      header: 'Atencion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
        this.configurarTarifa.DeleteTarifas(TarifasDB.id).subscribe(data => {
          if (!data.iserror) {
            this.GetTarifas();
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

  validate(){

    if(!this.displaySave){
      this.GetTarifas();
    }

    

  }



}
