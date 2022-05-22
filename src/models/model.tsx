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
  borders: string[];
}

export interface ChildrenType {
  children: ReactNode;
}
