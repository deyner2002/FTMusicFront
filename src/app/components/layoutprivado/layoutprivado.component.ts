import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-layoutprivado',
  templateUrl: './layoutprivado.component.html',
  styleUrls: ['./layoutprivado.component.css']
})
export class LayoutprivadoComponent implements OnInit {

  constructor(public menuService:MenuService) { 
    if (menuService.paginaPrevius==undefined )
    {
      menuService.paginaPrevius="/dashboard";
    }
  }

  ngOnInit(): void {
  }

  goBack(){
    window.history.back();
  }

}
