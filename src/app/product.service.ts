import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';
import { Pokedex, PokemonInfo, NameUrl, AbilityInfo } from 'src/app/Interfaces/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:HttpClient
  ) {}
  
  getAllPokemons():Promise<NameUrl[]>{
    return lastValueFrom(this.http.get<NameUrl[]>('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0').pipe(map((value:any)=>value.results)));
  }

  getPokemonByName(name:string):Promise<PokemonInfo>{
    return lastValueFrom(this.http.get<PokemonInfo>(`https://pokeapi.co/api/v2/pokemon/${name}`));
  }
  
  getPokemonPokedex(name:string):Promise<Pokedex>{
    return lastValueFrom(this.http.get<Pokedex>(`https://pokeapi.co/api/v2/pokemon-species/${name}`));
  }

  getPokemonAbilityDescription(name:string):Promise<AbilityInfo>{
    return lastValueFrom(this.http.get<AbilityInfo>(`https://pokeapi.co/api/v2/ability/${name}`));
  }
}
