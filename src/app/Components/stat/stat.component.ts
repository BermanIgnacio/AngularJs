import { Component, Input } from '@angular/core';
import { Stats } from 'src/app/Interfaces/Pokemon';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent {

  @Input() stats!:Stats[];

  
  getTotal():number{
    this.shortNamesStats();
    return this.stats.reduce((a,b)=>a+b.base_stat,0);
  }

  shortNamesStats(){
    this.stats[0].stat.name = "HP";
    this.stats[1].stat.name = "ATK";
    this.stats[2].stat.name = "DEF";
    this.stats[3].stat.name = "SP.ATK";
    this.stats[4].stat.name = "SP.DEF";
    this.stats[5].stat.name = "SPEED";
  }
  
  barColor(val:number):string{
    if(val < 30)
      return "#f34444"

    if(val > 25 && val < 60)
      return"#ff7f0f";

    if(val > 55 && val < 90)
      return "#ffdd57";

    if(val > 85 && val < 120)
      return "#a0e515";
      
    return"#23cd5e";
  }
}
