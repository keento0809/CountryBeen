import { Fragment } from "react";
import { RegionCardProps } from "../../../models/model";

const RegionCard = ({ imgUrl, region }: RegionCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl mb-2">
      <div className="card w-full h-248 bg-base-100 shadow-xl image-full cursor-pointer hover:scale-110 transition-transform">
        <figure>
          <img
            className="object-cover w-full opacity-40 z-10"
            src={imgUrl}
            alt=""
          />
        </figure>

        <div className="card-body flex justify-center items-center">
          <div className="card-body__container">
            <h2 className="grow font-extrabold text-3xl text-white">
              {region}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionCard;
