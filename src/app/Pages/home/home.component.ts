import { Component } from '@angular/core';
import { PokemonInfo, NameUrl, Types } from 'src/app/Interfaces/Pokemon';
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
  backgorund:string =" background: rgb(170,85,153); background: linear-gradient(0deg, rgba(170,85,153,0.8) 0%, rgba(119,204,85,0.8) 100%);"
  
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

  getBackground(tpyes:Types[]):string{
    if(tpyes.length>1)
      return `background: linear-gradient(0deg, rgba(var(--${tpyes[1].type.name}),0.8) 40%, rgba(var(--${tpyes[0].type.name}),0.8) 60%);`;
    return `background: rgba(var(--${tpyes[0].type.name}),0.8)`;
  }

  geticons(types:Types[]):string[]{
    return types.map(ele=> ele.type.name);
  }
  
}
