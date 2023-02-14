export interface NameUrl{
  name: string;
  url: string;
}

interface NameLanguage{
  name:string;
  language:NameUrl;
}

interface OtherSprite{
  front_default: string;
  front_shiny: string;
}

interface Stats{
  base_stat: number;
  stat: {name: string};
}

interface Types{
  type: NameUrl;
}

interface Sprites{
  front_default: string;
  front_female:	string;
  front_shiny:	string;
  front_shiny_female:	string;
  other:	{
    "official-artwork":	OtherSprite;
  }
}

interface AbilityDetail{
  ability: NameUrl;
  is_hidden:boolean;
  slot:number;
}

export interface textAndLanguage {
  flavor_text?:string;
  language: NameUrl;
}

export interface Pokedex{
  genera: {genus:string}[];
  flavor_text_entries: textAndLanguage[];
}

export interface PokemonInfo{
  id: number;
  name: string;
  sprites: Sprites;
  abilities: AbilityDetail[];
  types: Types[];
  stats: Stats[];
  height: number;
  weight: number;
}

export interface AbilityInfo{
  flavor_text_entries: textAndLanguage[];
  names:NameLanguage[];
}