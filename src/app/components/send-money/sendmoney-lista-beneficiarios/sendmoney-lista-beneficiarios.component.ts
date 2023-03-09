import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountService, AlertService } from 'src/app/services/auth';
import { Utilidades } from 'src/app/shared/FuncionesGlobales/Utilidades';
import { UserRole } from 'src/app/shared/models/Interfaces';
import { BeneficiarioService } from '../../beneficiarios/_service/beneficiario-service.service';

@Component({
  selector: 'app-sendmoney-lista-beneficiarios',
  templateUrl: './sendmoney-lista-beneficiarios.component.html',
  styles: [
  ]
})
export class ListaBeneficiariosComponent implements OnInit {
  @Output() ChangeBeneficiario: EventEmitter<any> = new EventEmitter();
  @Input() PaisId: number;
  BeneficiariosBd = [];
  BeneficiariosBdPorPais = [];
  filterPost = '';
  loading: boolean = false;
  userId: string;
  roles: string = '';
  BeneficiarioRadioBt: string;
  private userRoles: UserRole[] = [];

  

  constructor(
    private beneficiarioService: BeneficiarioService,
    private alertService: AlertService,
    private accountservice: AccountService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.BeneficiariosBdPorPais = this.BeneficiariosBd.filter(x => x.paisId == this.PaisId);
  }

  ngOnInit(): void {
    
    this.GetBeneficiarios();
    this.userId = this.accountservice.userValue.id;


  }

  
  GetBeneficiarios() {
    this.alertService.clear();

    this.userId = this.accountservice.userValue.id;

    let role = new BehaviorSubject<UserRole>(JSON.parse(localStorage.getItem("Role")));
    this.roles = role.value.roleName

    //this.loading = true;
    this.beneficiarioService.getBeneficiarios(this.roles, this.userId).subscribe(data => {
      if (!data.iserror) {
        this.BeneficiariosBd = data.obj;
        Utilidades.saveDatosStorage(this.BeneficiariosBd, "Beneficiarios");
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
        let BeneficiariosBdPorPais = this.BeneficiariosBd.filter(x => x.paisId == this.PaisId);
        console.log('sada'+ BeneficiariosBdPorPais);
      }, 1000)
    });

    console.log(this.BeneficiariosBd);

  }

 



  SelectBeneficiario() {
    console.log('dsdsds ' + this.PaisId);
    this.ChangeBeneficiario.emit(this.BeneficiarioRadioBt);;
  }

}
