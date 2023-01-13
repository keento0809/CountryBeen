import { Dispatch, SetStateAction } from "react";
import { CountryViewObj } from "../types/country";

export interface TPayload {
  country: CountryViewObj;
  totalNumber: number;
}

export interface RegionObj {
  region: string;
}

export interface AlertText {
  text: string;
}

export interface AuthFormProps {
  setIsError: Dispatch<SetStateAction<string>>;
}
