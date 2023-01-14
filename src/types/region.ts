import { ReactNode } from "react";

export interface RegionWrapperProps {
  children: ReactNode;
  imageUrl?: string;
}

export interface RegionCardProps {
  imgUrl?: string;
  region: string;
}
