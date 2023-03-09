import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountService, AlertService } from 'src/app/services/auth';
import { TransferenciaService } from 'src/app/services/Transferencia/transferencia.service';
import { UserRole } from 'src/app/shared/models/Interfaces';
import { BeneficiarioService } from '../../beneficiarios/_service/beneficiario-service.service';

@Component({
  selector: 'app-last-operations-list',
  templateUrl: './last-operations-list.component.html',
  styles: [
  ]
})
export class LastOperationsListComponent implements OnInit {
  TransferenciasBd = [];
  userId:string;
  roles: string = '';
  private userRoles: UserRole[] = [];
  styleCard = {'border-color':'#0326cd','height': '180px', 'overflow-y': 'auto'}
  styleCardLetrasTitle={'color':'#0326cd'}
  constructor(
    private transferenciaService: TransferenciaService,
    private alertService: AlertService,
    private accountservice: AccountService
  ) { }

  ngOnInit(): void {
    this.GetTransferencia();
    this.userId=this.accountservice.userValue.id;
    

  }

  GetTransferencia() {
    this.alertService.clear();
    console.log(this.accountservice.userValue.id);
    this.transferenciaService.GetUltimasTransferenciaByUser(this.accountservice.userValue.id).subscribe(data => {
      if (!data.iserror) {
        this.TransferenciasBd = data.obj;
      } else {
        this.alertService.error(data.message);
      }

    },
      (error) => {
        this.alertService.error("Ha ocurrido un error ");
      }
    ).add(() => {
      setTimeout(() => {
        console.log("transferencias");
      }, 10)
    });
  }

}
