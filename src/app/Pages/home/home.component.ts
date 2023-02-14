import { Component } from '@angular/core';
import { PokemonInfo, NameUrl } from 'src/app/Interfaces/Pokemon';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  loading:boolean = false;
  pokemons!:PokemonInfo[];
  button:boolean = true;

  constructor(
    private productosService:ProductService
  ){
    this.setPokemons();
  }

  async setPokemons() {
    try {
      const response:NameUrl[] = await this.productosService.getAllPokemons();

      this.pokemons = await Promise.all(
        response.map(async (poke:NameUrl) => {
          return await this.productosService.getPokemonByName(poke.name)
        }));
        this.pokemons[28].name = "nidoran ♀";
        this.pokemons[31].name = "nidoran ♂";
        this.pokemons[82].name = "farfetch'd";
        this.pokemons[121].name = "mr.Mime";

      this.loading=true;
    } catch (e) {
      console.log(e)
    }
  }

  orignalNames(name:string):string{
    if(name == "nidoran ♀")
      return "nidoran-f";
    if(name == "nidoran ♂")
      return "nidoran-m";
    if(name == "farfetch'd")
      return "farfetchd";
    if(name == "mr.Mime")
      return "mr-mime";
    return name;
  }
}
