import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public tilteMenu: string;
  public btnPrevius: boolean = true;
  public productoSelecionado: string;
  public codigoproductoSelecionado: string;
  public paginaPrevius: string;
 // public filterFields: any | FiltroHistorialPedidoModel;
  //public facturafiltereds: FacturasFilterModel;
  public globalObraCodFilter:string;
  public globalObraNameFilter:string;
  constructor() { }
}
