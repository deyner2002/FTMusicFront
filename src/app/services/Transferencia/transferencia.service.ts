import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnumEstadosTransaccion } from 'src/app/shared/Enumeradores/enumEstados.enum';
import { UserLogged, UserRole } from 'src/app/shared/models/Interfaces';
import { transaccionModel } from 'src/app/shared/models/TransaccionModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {
  private endpointTransferencia: string
  private UserSession: any;
  private RolUserSession: UserRole;
  constructor(private http: HttpClient) {
    this.endpointTransferencia = environment.Transferencia
    let role = new BehaviorSubject<UserRole>(JSON.parse(localStorage.getItem("Role")));
    let User = new BehaviorSubject<any>(JSON.parse(localStorage.getItem("User")));
    this.RolUserSession = role.value;
    this.UserSession = User.value;
  }

  registerTransferencia(data: any, FileComprobante) {
    data.UserId = this.UserSession["id"];

    let formData: FormData = new FormData();

    //**Se envia el objeto de la transferencia en el nombre del archivo por temas del DTO que no permite manejarlos en una sola transacion */
    formData.append('uploadFile', FileComprobante, btoa(JSON.stringify(data)));
    //formData.append('TranferenciaDtos',JSON.stringify(data));

    return this.http.post<any>(this.endpointTransferencia, formData)
  }


  UpdateTransferencia(data: transaccionModel) {
    console.log(data);
    return this.http.put<any>(`${this.endpointTransferencia}?Rol=${this.RolUserSession.roleName}`, data, {})
  }

  GetTransferencia() {
    return this.http.get<any>(this.endpointTransferencia)
  }
  //**Permitira traer las tranferencia por fecha, el all no se envia, ya que por default sera true */
  GetTransferenciaByUser(UserId: string, fechaIni, FechaFin) {
    switch (this.RolUserSession.roleName) {
      case "SuperAdmin":
        return this.http.get<any>(`${this.endpointTransferencia}?fechaIni=${fechaIni}&&FechaFin=${FechaFin}`)

      case "Validador":
        return this.http.get<any>(`${this.endpointTransferencia}/GetListHistoricoValidador?UserId=${UserId}&&fechaIni=${fechaIni}&&FechaFin=${FechaFin}`);

      case "Operador":

        return this.http.get<any>(`${this.endpointTransferencia}/GetListHistoricoOperador?UserId=${UserId}&&fechaIni=${fechaIni}&&FechaFin=${FechaFin}`);
      case "Clientes":
        return this.http.get<any>(`${this.endpointTransferencia}/GetListHistoricoClientes?UserId=${UserId}&&fechaIni=${fechaIni}&&FechaFin=${FechaFin}`)


      default:
        break;
    }
  }

//**Solo se usara para traer las ultimas 10 trnasfrencia, mandando el all en false */
  GetUltimasTransferenciaByUser(UserId: string) {
    switch (this.RolUserSession.roleName) {
      case "SuperAdmin":
        return this.http.get<any>(this.endpointTransferencia+"?all=false")

      case "Validador":
        return this.http.get<any>(`${this.endpointTransferencia}/GetListHistoricoValidador?UserId=${UserId}&all=false`);

      case "Operador":

        return this.http.get<any>(`${this.endpointTransferencia}/GetListHistoricoOperador?UserId=${UserId}&all=false`);
      case "Clientes":
        return this.http.get<any>(`${this.endpointTransferencia}/GetListHistoricoClientes?UserId=${UserId}&all=false`)


      default:
        break;
    }
  }

  GetTransferenciaByStatus(Estado: number) {
    return this.http.get<any>(`${this.endpointTransferencia}/GetListByEstado?Estado=${Estado}`);
  }

  GetTransferenciaByComprobanteId(id: number) {
    return this.http.get<any>(`${this.endpointTransferencia}/GetComprobanteById?Id=${id}`);
  }





}
