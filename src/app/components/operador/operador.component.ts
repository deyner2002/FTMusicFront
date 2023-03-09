import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AccountService, AlertService } from 'src/app/services/auth';
import { MenuService } from 'src/app/services/menu/menu.service';
import { TransferenciaService } from 'src/app/services/Transferencia/transferencia.service';
import { EnumEstadosTransaccion } from 'src/app/shared/Enumeradores/enumEstados.enum';
import { UserRole } from 'src/app/shared/models/Interfaces';
import { transaccionModel } from 'src/app/shared/models/TransaccionModel';
import { OperadorService } from './_service/operador.service';


@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.css']
})
export class OperadorComponent implements OnInit {
  displaySave: boolean = false;
  loading: boolean = false;

  userId: string;
  roles: string = '';
  TransferenciasBd = [];
  enumerableEstado = EnumEstadosTransaccion;
  
  constructor(
    private alertService: AlertService,
    private accountservice: AccountService,
    private transferenciaService: TransferenciaService,
    private confirmationService: ConfirmationService,
    private menu: MenuService,

  ) {
    menu.tilteMenu = "Operador";
  }

  ngOnInit(): void {
    this.getTransferencias();
  }

  showSveDialog() {
    this.displaySave = true;
  }

  getTransferencias() {

    this.alertService.clear();
    this.userId = this.accountservice.userValue.id;
    let role = new BehaviorSubject<UserRole>(JSON.parse(localStorage.getItem("Role")));
    this.roles = role.value.roleName

    
    let id = this.accountservice.userValue.id;
    //this.loading = true;
    this.transferenciaService.GetTransferenciaByStatus(2).subscribe(data => {
      if (!data.iserror) {
        this.TransferenciasBd = data.obj;
        this.TransferenciasBd.forEach(element => {
          element.referenciaBancaria = " ";
        });
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

  Transferir(id, beneficiario) {
    this.alertService.clear();
    let TransferenciasEdit = this.TransferenciasBd.find(w => w.id == id);
    if(TransferenciasEdit.referenciaBancaria.trim()=='0' || TransferenciasEdit.referenciaBancaria.trim()==''){
      this.alertService.warn("Ingresar una referencia bancaria valida")
      return
    }

    this.confirmationService.confirm({
      message: 'Esta seguro de realizar la Tansferencia a ' +beneficiario.nombres +' '+ beneficiario.apellidos+'?',
      header: 'Atencion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.updateTranferencia(id);
        

      }
    });
  }



  updateTranferencia(id){
    let TransferenciasEdit = this.TransferenciasBd.find(w => w.id == id);
        TransferenciasEdit.estado = this.enumerableEstado.Enviada;
        TransferenciasEdit.UserOperadorId = this.accountservice.userValue.id;
        let tranfer: transaccionModel = TransferenciasEdit;
        this.transferenciaService.UpdateTransferencia(tranfer).subscribe(data => {
          if (!data.iserror) {
            this.alertService.success("Registro exitoso");
            this.getTransferencias();
          } else {
            this.alertService.error(data.message);
          }
        },
          (error) => {
            this.alertService.error("Ha ocurrido un error en el registro. Verifique que la información este correcta");
            this.loading = false;
          }
        )

        setTimeout(() => {
          console.log("transferencia seleccionada");
          console.log(tranfer);
          console.log(TransferenciasEdit);

        }, 500);

  }

}
