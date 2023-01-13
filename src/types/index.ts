import { ReactNode, Dispatch, SetStateAction } from "react";

export interface Children {
  children: ReactNode;
}

export interface AlertInitialState {
  isAlerting: boolean;
  alertText: string;
}

export interface AuthFormProps {
  setIsError: Dispatch<SetStateAction<string>>;
}

export interface AlertText {
  text: string;
}
