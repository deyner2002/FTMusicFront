import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AccountService, AlertService } from 'src/app/services/auth';
import { MenuService } from 'src/app/services/menu/menu.service';
import { TransferenciaService } from 'src/app/services/Transferencia/transferencia.service';
import { EnumEstadosTransaccion } from 'src/app/shared/Enumeradores/enumEstados.enum';
import { transaccionModel } from 'src/app/shared/models/TransaccionModel';

interface Product {
  code: string,
  name: string,
  Category: String,
  Quantity: String
}

@Component({
  selector: 'app-validador',
  templateUrl: './validador.component.html',
  styleUrls: ['./validador.component.css']
})
export class ValidadorComponent implements OnInit {
  IdEdit = 0;

  displayModalInformacion: boolean = false;
  FormUpdate: FormGroup;
  displaySave: boolean = false;
  products: Product[];
  loading: boolean = false;
  
  TransferenciasBd = [];
  enumerableEstado = EnumEstadosTransaccion;
  Comprobante:any;

  esImagen:boolean;
  archivo:string;

  constructor(
    private alertService: AlertService,
    private transferenciaService: TransferenciaService,
    private accountservice: AccountService,
    private confirmationService: ConfirmationService,
    private menu: MenuService,
  ) {
    menu.tilteMenu = "Validador";
  }

  ngOnInit(): void {
    this.GetTransferencia();
  }

  showSveDialogInformacion(id: any) {
    this.alertService.clear();
    this.transferenciaService.GetTransferenciaByComprobanteId(id).subscribe(data => {
      if (!data.iserror) {
        this.Comprobante = data.obj;
        if ( this.Comprobante != null) {
          console.log(atob(this.Comprobante.comprobante).toString())
          console.log(atob(this.Comprobante.comprobante).toString().includes('%PDF'))
          if(atob(this.Comprobante.comprobante).toString().includes('%PDF')){
            this.esImagen = false;
            this.archivo="data:application/pdf;base64,"+this.Comprobante.comprobante;
          }else{
            this.esImagen = true;
            this.archivo="data:image/png;base64,"+this.Comprobante.comprobante;
          }
        }
        this.displayModalInformacion = true;       
      } else {
        this.alertService.error(data.message);
      }

    },
      (error) => {
        this.alertService.error("Ha ocurrido un error ");
        this.loading = false;
      }
   );


    
  }




  GetTransferencia() {
    this.alertService.clear();

    this.transferenciaService.GetTransferenciaByStatus(parseFloat(this.enumerableEstado.Pendiente)).subscribe(data => {
      if (!data.iserror) {
        this.TransferenciasBd = data.obj;
        console.log(this.TransferenciasBd);
      } else {
        this.alertService.error(data.message);
      }

    },
      (error) => {
        this.alertService.error("Ha ocurrido un error ");
        this.loading = false;
      }
    ).add(() => {
      setTimeout(() => {
        console.log("transferencias");
        console.log(this.TransferenciasBd);
      }, 1000)
    });
  }

  edit(id, estado) {
    let TransferenciasEdit = this.TransferenciasBd.find(w => w.id == id);
    if(estado==this.enumerableEstado.Aceptada){
      this.confirmationService.confirm({
        message: 'Esta seguro de Aceptar la Tansferencia de '+TransferenciasEdit.user.firstName+' '+TransferenciasEdit.user.lastName+'?',
        header: 'Atencion',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.updateTranfe(id, estado);
  
        }
      });
  

    }else{

      this.confirmationService.confirm({
        message: 'Esta seguro de Rechazar la Tansferencia de '+TransferenciasEdit.user.firstName+' '+TransferenciasEdit.user.lastName+'?',
        header: 'Atencion',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.updateTranfe(id, estado);
  
        }
      });

    }

    


   


  }

  delete() {
    this.alertService.clear();

    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar el registro?',
      header: 'Atencion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
      }
    });


  }



  updateTranfe(id, estado){
    let TransferenciasEdit = this.TransferenciasBd.find(w => w.id == id);
    TransferenciasEdit.estado = estado;
    TransferenciasEdit.userValidadorId = this.accountservice.userValue.id;
    let tranfer: transaccionModel = TransferenciasEdit;
    this.transferenciaService.UpdateTransferencia(tranfer).subscribe(data => {
      if (!data.iserror) {
        this.alertService.success("Registro exitoso");
        this.GetTransferencia();
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


  selectProduct() {
    alert(this.products.toString());
  }
  showSveDialog() {
    this.displaySave = true;
  }
  

  getImagenComprobante() {

    
  }

}
