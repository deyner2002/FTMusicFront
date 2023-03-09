import { BancoDtoModel } from "./BancoModel";
import { TipoIdentifiacionDtoModel } from "./TipoIdentificacionModel";


export class BeneficiaryModel {
    public id:number;
    public nombres: string;
    public apellidos:string;
    public tipoIdentidadId:string;
    public noIdentidad:string;
    public bancoId:number;
    public tipoCuenta:string;
    public numeroCuenta:string;
    public relacionId: number;
    public motivoTransferenciaId: number;
    public email: String;
    public userId: String;
    public paisId: number;
}

export class BeneficiaryFormModel {
    public id:number;
    public nombres: string;
    public apellidos:string;
    public tipoIdentidadId:string;
    public noIdentidad:string;
    public bancoId:number;
    public tipoCuenta:string;
    public numeroCuenta:string;
    public relacionId: number;
    public motivoTransferenciaId: number;
    public email: String;
    public userId: String;
    public tipoIdentidad:TipoIdentifiacionDtoModel;
    public banco:BancoDtoModel;
}