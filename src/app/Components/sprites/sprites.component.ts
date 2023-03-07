import { Component, Input } from '@angular/core';
import { Sprites, Types } from 'src/app/Interfaces/Pokemon';

@Component({
  selector: 'app-sprites',
  templateUrl: './sprites.component.html',
  styleUrls: ['./sprites.component.css']
})
export class SpritesComponent {

  @Input() name!:string;
  @Input() id!:number;
  @Input() types!:Types[];
  @Input() sprites!:Sprites;

  shiny:boolean = false;
  pixel:boolean = false;
  audio!:HTMLAudioElement;

  constructor(){
    this.audio = new Audio();
    setTimeout(()=>{
      this.audio.src = `../../assets/cries/${this.name}.mp3`;
      this.audio.load();
    },500);
  }

  toggleToNormal(){
    this.shiny = false;
  }
  
  toggleToShiny(){
    this.shiny = true;
  }

  toggleToArtwork(){
    this.pixel = false;
  }

  toggleToPixel(){
    this.pixel = true;
  }

  playCry(){
   
    this.audio.play();
  }

  maleOrFemmale(name:string):string{
    name = name.replace("-f"," ♀");
    name = name.replace("-m"," ♂");
    return name;
  }
}
