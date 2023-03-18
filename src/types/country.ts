export interface CountryViewObj {
  name: string;
  population: string;
  continents: string | string[];
  capital: string | string[];
  currencies: string | { GTQ: { name: string; symbol: string } };
  languages: string | { [i: string]: string };
  coatOfArms: string;
  flagImg: string;
  flagIcon: string;
  cca3: string;
  borders?: string | string[];
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

export interface ResCountryData {
  altSpellings: string[];
  area: number;
  borders: string[];
  capital: string[];
  capitalInfo: { latlng: number[] };
  car: { signs: string[]; side: string };
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  coatOfArms: { png: string; svg: string };
  continents: string[];
  currencies: { GTQ: { name: string; symbol: string } };
  demonyms: { eng: { f: string; m: string }; fra: { f: string; m: string } };
  fifa: string;
  flag: string;
  flags: { png: string; svg: string; alt: string };
  gini?: { [i: number]: number };
  idd: { root: string; suffixes: string[] };
  independent: boolean;
  landlocked: boolean;
  languages: { [i: string]: string };
  latlng: [number, number];
  maps: { googleMaps: string; openStreetMaps: string };
  name: {
    common: string;
    official: string;
    nativeName: { spa: { common: string; official: string } };
  };
  population: number;
  postalCode: { format: string; regex: string };
  region: string;
  startOfWeek: string;
  status: string;
  subregion: string;
  timezones: string[];
  tld: string[];
  translations: { [i: string]: { official: string; common: string } };
  unMember: boolean;
}

export interface Countries {
  countries: ResCountryData[];
}
