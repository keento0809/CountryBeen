export interface CountryViewObj {
  name: string;
  population: string;
  continents: string;
  capital: string;
  currencies: string;
  languages: string;
  coatOfArms: string;
  flagImg: string;
  flagIcon: string;
  cca3: string;
  borders?: string;
}

export interface BeenInitialState {
  beenToList: CountryViewObj[];
  totals: number;
  isSuccessToAdd: boolean;
}

export interface FavoriteInitialState {
  favoriteList: CountryViewObj[];
  totalNumber: number;
  isSuccessToAddBucketList: boolean;
}

export interface CountryCardProps {
  flagImg: string;
  countryName: string;
  cca3: string;
  isBeenTo: boolean;
}
