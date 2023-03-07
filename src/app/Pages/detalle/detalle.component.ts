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

  loading:boolean = false;

  name:string;
  pokemon!:PokemonInfo;
  pokedex!:Pokedex;

  abilitiesNames:string[] = [];
  abilitiesInfo: string[] = [];

  indexPokedex!:number;

  constructor(
    private activateRoute: ActivatedRoute,
    private productService:ProductService
  ){
    this.name = this.activateRoute.snapshot.paramMap.get("name") || "";
    this.obtainPokemonInfo();
  }

  async obtainPokemonInfo(){
    try {
      //Obtencion datos pokemon y pokedex
      this.pokemon = await this.productService.getPokemonByName(this.name);
      this.pokedex = await this.productService.getPokemonPokedex(this.name);
      this.abilitiesNames = this.pokemon.abilities.map(x=> x.ability.name);
      this.indexPokedex = this.pokedex.flavor_text_entries.findIndex(ele => ele.language.name === "es");
      setTimeout(()=>this.loading = true ,500);
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
      this.loading = true ;
    }
    catch(error){
      console.log(error);  
    }
  }

}