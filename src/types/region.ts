import { ReactNode, Dispatch, SetStateAction } from "react";

export interface RegionObj {
  region: string;
}

export interface RegionWrapperProps {
  children: ReactNode;
  imageUrl?: string;
}

export interface RegionCardProps {
  imgUrl?: string;
  region: string;
}
