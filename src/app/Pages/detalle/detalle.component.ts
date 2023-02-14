import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonInfo, Pokedex, AbilityInfo } from 'src/app/Interfaces/Pokemon';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {

    name:string;
    pokemon!:PokemonInfo;
    pokedex!:Pokedex;

    types:string[] = [];
    abilitiesNames:string[] = [];
    abilitiesInfo: string[] = [];

    indexPokedex!:number;
    total:number = 0;

    shiny:boolean = false;
    pixel:boolean = false;

    text = "Seleccione una Habilidad para ver su description";

    constructor(
      private activateRoute: ActivatedRoute,
      private productService:ProductService
    ){
      this.name = this.activateRoute.snapshot.paramMap.get("name") || ""
      this.obtainPokemonInfo();
    }

    async obtainPokemonInfo(){
      try {
        //Obtencion datos pokemon y pokedex
        this.pokemon = await this.productService.getPokemonByName(this.name);
        this.pokedex = await this.productService.getPokemonPokedex(this.name);

        this.abilitiesNames = this.pokemon.abilities.map(x=> x.ability.name);
        this.types = this.pokemon.types.map(x => x.type.name);
        this.indexPokedex = this.pokedex.flavor_text_entries.findIndex(ele => ele.language.name === "es");
        this.shortNamesStats();
        this.total = this.pokemon.stats.reduce((a,b)=>a+b.base_stat,0);

        this.obtainAbilitiesInfo()
      } catch (error) {
        console.log(error);
      }
    }

    async obtainAbilitiesInfo(){
      try{
      
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

    shortNamesStats(){
      this.pokemon.stats[0].stat.name = "HP";
      this.pokemon.stats[1].stat.name = "ATK";
      this.pokemon.stats[2].stat.name = "DEF";
      this.pokemon.stats[3].stat.name = "SP.ATK";
      this.pokemon.stats[4].stat.name = "SP.DEF";
      this.pokemon.stats[5].stat.name = "SPEED";
    }

    playCry(){
      // let audio = new Audio();
      // audio.src = `../../../assets/cries/${name}.mp3`;
      // audio.load();
      // audio.play();
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

    backgroundPokedex():string {
      return `var(--${this.types[0]})`;
    }

    borderPokedex():string{
      return `10px solid var(--${this.types[1]})`
    }

    changeDescription(abilityTex:string){
      this.text = abilityTex;
    }

    maleOrFemmale(name:string):string{
      name = name.replace("-f"," ♀");
      name = name.replace("-m"," ♂");
      return name;
    }
}