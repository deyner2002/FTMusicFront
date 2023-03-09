import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-dashboard-config',
  templateUrl: './dashboard-config.component.html',
  styleUrls: ['./dashboard-config.component.css']
})
export class DashboardConfigComponent implements OnInit {

  constructor( private menu: MenuService,) { 
    menu.tilteMenu = "Configuración";
  }

  ngOnInit(): void {
  }

}
