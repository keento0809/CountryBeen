import { Fragment } from "react";
import { RegionCardProps } from "../../models/model";
import imgPath from "../../assets/img-for-regionCard.jpg";

const RegionCard = ({ region }: RegionCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl mb-2">
      <div className="card w-full bg-base-100 shadow-xl image-full cursor-pointer hover:scale-110 transition-transform">
        <figure>
          <img className="opacity-40 z-10" src={imgPath} alt="" width={374} />
        </figure>

        <div className="card-body flex justify-center items-center">
          <div className="card-body__container">
            <h2 className="grow font-extrabold text-3xl text-white dark:text-gray-300">
              {region}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionCard;
