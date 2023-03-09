import { Component, OnInit } from '@angular/core';
import { AccountService, AlertService } from 'src/app/services/auth';
import { MenuService } from 'src/app/services/menu/menu.service';
import { TransferenciaService } from 'src/app/services/Transferencia/transferencia.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styles: [
  ]
})


export class OperationsComponent implements OnInit {


  displaySave: boolean = false;
  loading: boolean = false;
  TransferenciasBd = [];
  rangeDates: Date[];


  name = 'OperacionesAgape.xlsx';

  constructor(
    private alertService: AlertService,
    private transferenciaService: TransferenciaService,
    private accountservice: AccountService,
    private menu: MenuService,
  ) {

    menu.tilteMenu = "Historial de transacciones";

  }

  ngOnInit(): void {
    this.GetTransferencia();
  }

  GetTransferencia() {
    this.alertService.clear();
    console.log(this.accountservice.userValue.id);

    //**Dtaos de prueba borrarr */
    var date = new Date();
    var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    //**fin de lo que dees borrar */
    this.transferenciaService.GetTransferenciaByUser(this.accountservice.userValue.id, current_date, current_date).subscribe(data => {
      if (!data.iserror) {
        this.TransferenciasBd = data.obj;
        this.TransferenciasBd.reverse();
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

  Buscar() {
    console.log("this.rangeDates");
    console.log(this.rangeDates);
    var FechaInicial = this.rangeDates[0].getFullYear() + "-" + (this.rangeDates[0].getMonth() + 1) + "-" + this.rangeDates[0].getDate();
    var FechaFinal = this.rangeDates[1].getFullYear() + "-" + (this.rangeDates[1].getMonth() + 1) + "-" + this.rangeDates[1].getDate();
    console.log(FechaInicial);
    console.log(FechaFinal);

    this.transferenciaService.GetTransferenciaByUser(this.accountservice.userValue.id, FechaInicial, FechaFinal).subscribe(data => {
      if (!data.iserror) {
        this.TransferenciasBd = data.obj;
        this.TransferenciasBd.reverse();
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


  showSve() {
    this.displaySave = true;
  }


  exportToExcel(): void {
    let element = document.getElementById('DataOperaciones');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Operaciones');

    XLSX.writeFile(book, this.name);
  }


}
