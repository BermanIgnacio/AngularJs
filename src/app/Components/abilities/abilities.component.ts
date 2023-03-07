import { Component, Input } from '@angular/core';
import { AbilityDetail, AbilityInfo } from 'src/app/Interfaces/Pokemon';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.css']
})
export class AbilitiesComponent {
  @Input() abilities!:AbilityDetail[];

  abilitiesNames:string[] = [];
  abilitiesInfo: string[] = [];
  text:string = "Seleccione una Habilidad para ver su description";
  
  constructor(private productService:ProductService){
    setTimeout(()=>this.obtainAbilitiesInfo(),500);
  }

  changeDescription(abilityTex:string){
    this.text = abilityTex;
  } 
  async obtainAbilitiesInfo(){
    try{
      this.abilitiesNames = this.abilities.map(x=> x.ability.name);
      //Obtencion datos de habilidades
      const abilitiesInfo:AbilityInfo[] = await Promise.all(
        this.abilitiesNames.map(async (ele) => {
        return await this.productService.getPokemonAbilityDescription(ele);
      }))
      
      this.abilitiesNames = abilitiesInfo.map((ele) => ele.names.find(x => x.language.name == "es")?.name || " ");
      this.abilitiesInfo = abilitiesInfo.map((ele) => ele.flavor_text_entries.find(x => x.language.name == "es")?.flavor_text || " ");
    }
    catch(error){
      console.log(error);  
    }
  }
}
