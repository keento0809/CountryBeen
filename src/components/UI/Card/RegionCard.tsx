import { Fragment } from "react";
import { RegionCardProps } from "../../../models/model";

const RegionCard = ({ imgUrl, region }: RegionCardProps) => {
  return (
    <Fragment>
      <div className="card mb-2 w-full h-248 bg-base-100 shadow-xl image-full cursor-pointer">
        <figure>
          <img className="object-cover w-full" src={imgUrl} alt="" />
        </figure>

        <div className="card-body flex justify-center items-center">
          <div className="card-body__container">
            <h2 className="grow font-extrabold text-3xl text-white">
              {region}
            </h2>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RegionCard;
