import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styles: [
  ]
})


export class ExchangeRateComponent implements OnInit {
  @Input() data:string;
  styleCard = {'border-color':'#0326cd','height': '244px', 'overflow-y': 'auto'}
  styleCardLetrasTitle={'color':'#0326cd'}
  constructor() { }

  ngOnInit(): void {
  }

}
