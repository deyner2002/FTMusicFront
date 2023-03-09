import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/auth';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ConfiguracionPaisService } from 'src/app/services/setting/configuracion-pais.service';
import { ConfigutacionTarifaService } from 'src/app/services/setting/configutacion-tarifa.service';
import { UserService } from 'src/app/services/user/user.service';
import { Utilidades } from 'src/app/shared/FuncionesGlobales/Utilidades';
import { UserLogged } from 'src/app/shared/models/Interfaces';
import { TarifaModel } from 'src/app/shared/models/TarifaModel';

interface City {
  code: string,
  name: string
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {
  private userApp!: UserLogged;
  responsiveOptions;
  Paises = [];
  tarifas: TarifaModel[];
  selectedTarifa: TarifaModel[];
  TasaCambio=TarifaModel;
  Form: FormGroup;
  TarifasDB = [];
  datos: TarifaModel = {

    paisOrigenId: 0,
    paisDestinoId: 0,
    precioCompra: 0,
    precioVenta: 0,
    utilidad: 0,
    tasaNeta: 0,
    tasaPublica: 0,
    userId: '',
    id: 0,
    fechaReg: new Date(),
  }
  styleCard = {'border-color':'#0326cd','height': '150px','width':'500px', 'overflow-y': 'auto'}
  styleCardCalculadora = {'background':'#0326cd'}
  styleCardCalculadoraLetras={'color':'white'}
  styleCardCalculadoraLetrasTitle={'color':'white','padding-top': '1.5em', 'top': '-3em'}
  apellido: string = '';
  nombre: string = '';
  user: string = '';
  
  constructor(
    private configurarTarifa: ConfigutacionTarifaService,
    private configurarPais: ConfiguracionPaisService,
    private menu: MenuService,
    private alertService: AlertService,
    private userService: UserService,
    private formBuilder: FormBuilder) { 
      menu.tilteMenu = "Principal";
      this.responsiveOptions = [
        {
            breakpoint: '800px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }

  private async getUser()
  {
    await this.userService.getUser()     
    .subscribe(result => {    
      this.userApp = result.obj;     
      Utilidades.saveDatosStorage(this.userApp, "User");
      this.nombre = this.userApp?.firstName 
      this.apellido = this.userApp?.lastName;
    }, (err)=>{
      console.log(err)
    })
  
  return this.user;        
  }

  ngOnInit(): void {
   
    this.Form = this.formBuilder.group({
      paisOrigenId: ['',Validators.required],
      paisDestinoId: ['',Validators.required],
      ValorEnvio: [''],
      ValorRecibe: ['']
    })
    this.GetTarifas();
    this.GetPais();
    this.getUser();
  }

  
  get f() { return this.Form.controls; }
  
  onSubmit(tipo)
  {
    this.alertService.clear();
    if (this.Form.invalid) {
      return;
    }

    let paisOrigen=this.f.paisOrigenId.value;
    let paisDestino=this.f.paisDestinoId.value;

    if (paisOrigen != '' && paisDestino != '') {
      let Tarifa= this.TarifasDB.find(w=>w.paisDestinoId==paisDestino && w.paisOrigenId==paisOrigen);

      if (tipo=="ENVIA") {
        let MontoEnviar=parseFloat(this.f.ValorEnvio.value);

        if(Tarifa != undefined){
          let ValorRecibe=MontoEnviar*Tarifa.tasaPublica;
          if (Tarifa.paisDestino.name=="Colombia") {
            ValorRecibe=Math.trunc(ValorRecibe)
          }
          this.f.ValorRecibe.setValue(ValorRecibe);
        }else{
          this.alertService.error("No se encontro tarifa configurada!");
        }
      }else{
        let RecibeEnviar=parseFloat(this.f.ValorRecibe.value);

        if(Tarifa != undefined){
          let ValorEnvia=RecibeEnviar/Tarifa.tasaPublica;
          if (Tarifa.paisDestino.name=="Colombia") {
            ValorEnvia=Math.trunc(ValorEnvia)
          }
          this.f.ValorEnvio.setValue(ValorEnvia);
        }else{
          this.alertService.error("No se encontro tarifa configurada!");
        }
      }

      
    }

  }

  Calculadora()
  {
    this.alertService.clear();
    if (this.Form.invalid) {
      return;
    }

    let paisOrigen=this.f.paisOrigenId.value;
    let paisDestino=this.f.paisDestinoId.value;

    if (paisOrigen != '' && paisDestino != '') {
      let Tarifa= this.TarifasDB.find(w=>w.paisDestinoId==paisDestino && w.paisOrigenId==paisOrigen);

      if (this.f.ValorEnvio.value != '') {
        let MontoEnviar=parseFloat(this.f.ValorEnvio.value);

        if(Tarifa != undefined){
          let ValorRecibe=MontoEnviar*Tarifa.tasaPublica;
          if (Tarifa.paisDestino.name=="Colombia") {
            ValorRecibe=Math.trunc(ValorRecibe)
          }
          this.f.ValorRecibe.setValue(ValorRecibe);
        }else{
          this.alertService.error("No se encontro tarifa configurada!");
        }
      }else{
        let RecibeEnviar=parseFloat(this.f.ValorRecibe.value);

        if(Tarifa != undefined){
          let ValorEnvia=RecibeEnviar/Tarifa.tasaPublica;
          if (Tarifa.paisDestino.name=="Colombia") {
            ValorEnvia=Math.trunc(ValorEnvia)
          }
          this.f.ValorEnvio.setValue(ValorEnvia);
        }else{
          this.alertService.error("No se encontro tarifa configurada!");
        }
      }

      
    }

  }

  GetTarifas() {
    this.alertService.clear();


    //this.loading = true;
    this.configurarTarifa.getTarifas().subscribe(data => {
      if (!data.iserror) {
        this.TarifasDB = data.obj;
        this.TarifasDB.forEach(
          (item, index) => item.index = index + 1
        )
        /*console.log(this.TarifasDB);
        if (this.TarifasDB.length>0) {
            for (let index = 0; index < this.TarifasDB.length; index++) {
                this.TasaCambio += this.TarifasDB[index].paisOrigen.name +" - "+ this.TarifasDB[index].paisDestino.name +" $"+this.TarifasDB[index].tasaPublica + "\n";
            }
        }*/
      } else {
        this.alertService.error(data.message);
      }

    },
      (error) => {
        this.alertService.error("Ha ocurrido un error");
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
      }
    )
  }

}
