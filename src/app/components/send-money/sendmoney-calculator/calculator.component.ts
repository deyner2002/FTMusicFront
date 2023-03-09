import { Component, OnInit } from '@angular/core';


interface City {
  name: string,
  code: string
}


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  
  cities: City[];
  selectedCities: City[];
  
  
  constructor() {
    this.cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
    ];
  }

  ngOnInit(): void
  {

  }
  
  onSubmit()
  {
    
  }
   
}
