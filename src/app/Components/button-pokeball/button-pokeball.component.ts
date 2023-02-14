import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-pokeball',
  templateUrl: './button-pokeball.component.html',
  styleUrls: ['./button-pokeball.component.css']
  
})
export class ButtonPokeballComponent {
  button:boolean = true;
  @Input() name: string =" ";

  constructor(){}

  mouseOver(){
    this.button = false;
  }
  mouseOut(){
    this.button = true;
  }
}
