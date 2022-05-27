import { ReactNode } from "react";

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
  // borders: string[];
}

export interface ChildrenType {
  children: ReactNode;
}

export interface PropsRegion {
  selectedRegion: string;
}

export interface InitialS {
  favoriteList: CountryViewObj[];
  totalNumber: number;
}

export interface BeenToInitialS {
  beenToList: CountryViewObj[];
  totals: number;
  isSuccessToAdd: boolean;
}

export interface TPayload {
  country: CountryViewObj;
  totalNumber: number;
}

export interface RegionObj {
  region: string;
}

export interface RegionWrapperType {
  children: ReactNode;
  imageUrl: string;
}

export interface AlertText {
  text: string;
}

export interface RegionCardProps {
  imgUrl: string;
  region: string;
}

export interface CountryCardProps {
  flagImg: string;
  countryName: string;
  cca3: string;
  handleToggleBeenTo: (e: any) => void;
}
