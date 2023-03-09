
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from 'src/app/services/auth';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ConfiguracionPaisService } from 'src/app/services/setting/configuracion-pais.service';
import { ConfigutacionTarifaService } from 'src/app/services/setting/configutacion-tarifa.service';
import { TransferenciaService } from 'src/app/services/Transferencia/transferencia.service';
import { Utilidades } from 'src/app/shared/FuncionesGlobales/Utilidades';
import { BeneficiaryFormModel, BeneficiaryModel } from 'src/app/shared/models/beneficiaryModel';
import { TarifaModel } from 'src/app/shared/models/TarifaModel';
import { transaccionModel } from 'src/app/shared/models/TransaccionModel';


@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  providers: [ConfirmationService, MessageService],
  styleUrls: ['./send-money.component.css']
})
export class SendMoneyComponent implements OnInit {
  formatter = new Intl.NumberFormat('de-DE');
  comprobanteUp = "";
  comprobanteUpValidate = false;
  formattedAmount;
  ColorTimer = "#000000";
  timeLeft: number = 10;
  interval;
  PaisId: number;
  Paises = [];
  tarifas: TarifaModel[];
  selectedTarifa: TarifaModel[];
  TasaCambio = "";
  Form: FormGroup;
  TarifasDB = [];
  TarifaSelected = [];
  Util = Utilidades;
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

  BeneficiarioSelect: BeneficiaryFormModel = {
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
    banco: { name: '', },
    tipoIdentidad: { name: '' }
  };

  newTransacion: transaccionModel = {
    Id: 0,
    TasaCambio: 0,
    CantidadEnvia: 0,
    CantidadRecibe: 0,
    PaisOrigenId: 0,
    PaisDestinoId: 0,
    BeneficiarioId: 0,
    UserId: "0",
    UserValidadorId: "",
    UserOperadorId: "",
    Estado: 0,
    ReferenciaBancaria: "0",
    Comprobante: "0",
    ImgComprobante: ""

  }

  PaisOrigen: string = "";
  PaisDestino: string = "";

  MonedaDestino: string = "";
  MonedaOrigen: string = "";

  HabilitarBtnEnviarDinero: boolean = false;
  BtnUpload: any;
  MsjFile: string = "Clic aqui para adjuntar comprobante";
  messageInvalidAdjunto = false;
  FileAdjunto: File;


  styleCardCalculadora = { 'background': '#0326cd' }
  styleBtnEnviarTranferencia = { 'background': '#0326cd' }
  styleCardCalculadoraLetras = { 'color': 'white' }
  styleCardCalculadoraLetrasTitle = { 'color': 'white', 'padding-top': '1.5em', 'top': '-3em' }
  BtnStyle = { 'font-weight': 'bold', 'background-color': 'white', 'color': '#0326cd', 'margin-top': '6px' }
  Btn2Style = { 'font-weight': 'bold', 'background-color': '#0326cd', 'color': 'white', 'margin-top': '6px' }


  constructor(private confirmationService: ConfirmationService, private messageService: MessageService,
    private configurarTarifa: ConfigutacionTarifaService,
    private configurarPais: ConfiguracionPaisService,
    private menu: MenuService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private TransferenciServices: TransferenciaService) {
    menu.tilteMenu = "Enviar dinero";
  }

  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      paisOrigenId: ['', Validators.required],
      paisDestinoId: ['', Validators.required],
      ValorEnvio: ['', Validators.required],
      ValorRecibe: [''],
      TarifasSelect: [''],
    })
    this.GetTarifas();
    this.GetPais();
    this.startTimer()
  }


  displayModalInformacion: boolean = false;
  displayModalComprobante: boolean = false;
  displayModalBeneficiario: boolean = false;
  get f() { return this.Form.controls; }




  onSubmit(tipo) {
    this.alertService.clear();
    if (this.f.paisOrigenId.value == null || this.f.paisDestinoId.value == null) {
      return;
    }

    let paisOrigen = this.f.paisOrigenId.value;
    let paisDestino = this.f.paisDestinoId.value;

    if (paisOrigen != '' && paisDestino != '') {
      let Tarifa = this.TarifasDB.find(w => w.paisDestinoId == paisDestino && w.paisOrigenId == paisOrigen);
      if (Tarifa != undefined) {

        this.MonedaOrigen = Tarifa.paisOrigen.paisOrigenMoneda;
        this.MonedaDestino = Tarifa.paisDestino.paisOrigenMoneda;
      }
      if (tipo == "ENVIA") {
        let MontoEnviar = parseFloat(this.RemoveFormat(this.f.ValorEnvio.value));


        if (Tarifa != undefined) {

          //**Calculo los valores segun tarifas */
          let ValorRecibe = MontoEnviar * Tarifa.tasaPublica;
          if (Tarifa.paisDestino.name == "Colombia") {
            ValorRecibe = Math.trunc(ValorRecibe)
          }
          this.f.ValorRecibe.setValue(this.formatter.format(Math.floor(ValorRecibe * 100) / 100));

          //**Obtengo los name de paise */
          this.PaisOrigen = Tarifa.paisOrigen.name;
          this.PaisDestino = Tarifa.paisDestino.name;


          //**Empiezo armar el objeto a trasnferir*/
          this.newTransacion.CantidadEnvia = MontoEnviar;
          this.newTransacion.CantidadRecibe = ValorRecibe;
          this.newTransacion.PaisDestinoId = paisDestino;
          this.newTransacion.PaisOrigenId = paisOrigen;
          this.newTransacion.TasaCambio = Tarifa.tasaPublica;

        } else {
          this.alertService.error("No se encontro tarifa configurada!");
          this.HabilitarBtnEnviarDinero = false;
          this.Form.reset();

        }
      } else {

        let MontoRecibe = parseFloat(this.RemoveFormat(this.f.ValorRecibe.value));


        if (Tarifa != undefined) {

          //**Calculo los valores segun tarifas */
          let ValorEnviar = MontoRecibe / Tarifa.tasaPublica;
          if (Tarifa.paisDestino.name == "Colombia") {
            ValorEnviar = Math.trunc(ValorEnviar)
          }
          this.f.ValorEnvio.setValue(this.formatter.format(Math.floor(ValorEnviar * 100) / 100));

          //**Obtengo los name de paise */
          this.PaisOrigen = Tarifa.paisOrigen.name;
          this.PaisDestino = Tarifa.paisDestino.name;


          //**Empiezo armar el objeto a trasnferir*/
          this.newTransacion.CantidadEnvia = ValorEnviar;
          this.newTransacion.CantidadRecibe = MontoRecibe;
          this.newTransacion.PaisDestinoId = paisDestino;
          this.newTransacion.PaisOrigenId = paisOrigen;
          this.newTransacion.TasaCambio = Tarifa.tasaPublica;

        } else {
          this.alertService.error("No se encontro tarifa configurada!");
          this.HabilitarBtnEnviarDinero = false;
          this.Form.reset();

        }
      }


    }

  }

  EnviarPaisId(PaisId) {
    this.PaisId = PaisId.value;
    console.log(PaisId);
  }

  Calculadora() {
    this.alertService.clear();
    if (this.f.paisOrigenId.value == null || this.f.paisDestinoId.value == null) {
      return;
    }

    let paisOrigen = this.f.paisOrigenId.value;
    let paisDestino = this.f.paisDestinoId.value;

    if (paisOrigen != '' && paisDestino != '') {
      let Tarifa = this.TarifasDB.find(w => w.paisDestinoId == paisDestino && w.paisOrigenId == paisOrigen);
      if (Tarifa != undefined) {

        this.MonedaOrigen = Tarifa.paisOrigen.paisOrigenMoneda;
        this.MonedaDestino = Tarifa.paisDestino.paisOrigenMoneda;
      }

      if (this.f.ValorEnvio.value != "" && this.f.ValorEnvio.value != null) {
        let MontoEnviar = parseFloat(this.RemoveFormat(this.f.ValorEnvio.value));


        if (Tarifa != undefined) {

          //**Calculo los valores segun tarifas */
          let ValorRecibe = MontoEnviar * Tarifa.tasaPublica;
          if (Tarifa.paisDestino.name == "Colombia") {
            ValorRecibe = Math.trunc(ValorRecibe)
          }
          this.f.ValorRecibe.setValue(this.formatter.format(Math.floor(ValorRecibe * 100) / 100));

          //**Obtengo los name de paise */
          this.PaisOrigen = Tarifa.paisOrigen.name;
          this.PaisDestino = Tarifa.paisDestino.name;


          //**Empiezo armar el objeto a trasnferir*/
          this.newTransacion.CantidadEnvia = MontoEnviar;
          this.newTransacion.CantidadRecibe = ValorRecibe;
          this.newTransacion.PaisDestinoId = paisDestino;
          this.newTransacion.PaisOrigenId = paisOrigen;
          this.newTransacion.TasaCambio = Tarifa.tasaPublica;

        } else {
          this.alertService.error("No se encontro tarifa configurada!");
          this.HabilitarBtnEnviarDinero = false;
          this.Form.reset();

        }
      } else {
        if (this.f.ValorRecibe.value !=null && this.f.ValorRecibe.value !="") {
          let MontoRecibe = parseFloat(this.RemoveFormat(this.f.ValorRecibe.value));


          if (Tarifa != undefined) {

            //**Calculo los valores segun tarifas */
            let ValorEnviar = MontoRecibe / Tarifa.tasaPublica;
            if (Tarifa.paisDestino.name == "Colombia") {
              ValorEnviar = Math.trunc(ValorEnviar)
            }
            this.f.ValorEnvio.setValue(this.formatter.format(Math.floor(ValorEnviar * 100) / 100));

            //**Obtengo los name de paise */
            this.PaisOrigen = Tarifa.paisOrigen.name;
            this.PaisDestino = Tarifa.paisDestino.name;


            //**Empiezo armar el objeto a trasnferir*/
            this.newTransacion.CantidadEnvia = ValorEnviar;
            this.newTransacion.CantidadRecibe = MontoRecibe;
            this.newTransacion.PaisDestinoId = paisDestino;
            this.newTransacion.PaisOrigenId = paisOrigen;
            this.newTransacion.TasaCambio = Tarifa.tasaPublica;

          } else {
            this.alertService.error("No se encontro tarifa configurada!");
            this.HabilitarBtnEnviarDinero = false;
            this.Form.reset();

          }
        }


      }


    }

  }

  showDialogBeneficiario() {
    this.alertService.clear();
    let MontoEnviar = parseFloat(this.f.ValorEnvio.value);
    let MontoRecibe = parseFloat(this.f.ValorRecibe.value);
    if (MontoEnviar > 0 && MontoRecibe > 0) {
      this.displayModalBeneficiario = true;
    } else {
      this.alertService.error("Debe indicar el valor a enviar o recibir!");
    }


  }

  showSveDialogInformacion() {
    this.displayModalBeneficiario = false;
    this.displayModalInformacion = true;
  }
  showSveDialogComprobante() {
    this.displayModalInformacion = false;
    this.displayModalComprobante = true;
  }



  GetTarifas() {
    this.alertService.clear();


    //this.loading = true;
    this.configurarTarifa.getTarifas().subscribe(data => {
      if (!data.iserror) {
        this.TarifasDB = data.obj;
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

  MarcarBeneficiario(UserBeneficiario) {

    let ListaBeneficiarios = new BehaviorSubject<any>(JSON.parse(localStorage.getItem("Beneficiarios")));
    this.BeneficiarioSelect = ListaBeneficiarios.value.find(w => w.id == UserBeneficiario);


  }

  SendPaisId(paisIds) {

    paisIds = this.PaisId;


  }

  resetForm() {
    this.Form.reset();
    this.displayModalInformacion = false;
    this.displayModalComprobante = false;
    this.HabilitarBtnEnviarDinero = false;
  }

  CargarTransferencia() {

    this.newTransacion.BeneficiarioId = this.BeneficiarioSelect.id;
    this.newTransacion.ImgComprobante = null;

    this.TransferenciServices.registerTransferencia(this.newTransacion, this.FileAdjunto).subscribe(data => {
      if (!data.iserror) {
        this.alertService.success("Transferencia creada");
        this.resetForm();
      } else {
        this.alertService.error(data.message);
        this.resetForm();
      }

    },
      (error) => {
        this.resetForm();
        this.alertService.error("Ha ocurrido un error en el registro. Verifique que la información este correcta");

      }
    )



  }

  CargarComprobanteTransferencia(event, uploader: FileUpload) {

    this.RemoverComprobante();
    this.messageInvalidAdjunto = false;
    if (event.files && event.files.length) {
      const FileUp = event.files;
      this.MsjFile = FileUp[0].name;
      this.FileAdjunto = FileUp[0];
    }

    this.CargarTransferencia();
    uploader.remove(event, 0);
  }



  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;

        if (this.timeLeft <= 3) {
          this.ColorTimer = "red";
        }

      } else {
        window.location.reload();
      }
    }, 60000)
  }

  transformAmount(element) {

    this.f.ValorEnvio.setValue(this.formatter.format(this.RemoveFormat(this.f.ValorEnvio.value)));

  }

  transformAmountRecibe(element) {
    this.f.ValorRecibe.setValue(this.formatter.format(this.RemoveFormat(this.f.ValorRecibe.value)));

  }

  RemoveFormat(value) {
    return value.toString().replace(/,/g, '').replace('$', '').replace(/\./g, "");
  }

  public ViewComprobante() {
    if (this.comprobanteUp != "") {
      this.comprobanteUpValidate = true;
      window.open(this.comprobanteUp);
    } else {
      this.comprobanteUpValidate = false;
    }
  }

  SetComprobante(event) {
    let target = event.currentFiles;
    if (target != null || target != undefined) {
      this.comprobanteUpValidate = true;
      this.comprobanteUp = window.URL.createObjectURL(target[0]);

    }
  }

  RemoverComprobante() {
    this.comprobanteUp = "";
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
