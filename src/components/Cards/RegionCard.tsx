import { RegionCardProps } from "../../types/region";
import imgPath from "../../assets/img-for-regionCard-1ver2.jpg";

const RegionCard = ({ region }: RegionCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl mb-2 max-w-240 mx-auto">
      <div className="card w-full bg-base-100 shadow-xl image-full cursor-pointer touch-none hover:scale-105 transition-transform">
        <figure>
          <img
            className="z-10 rounded-2xl"
            src={imgPath}
            alt=""
            width={374}
            height={280}
          />
        </figure>
        <div className="card-body flex justify-center items-center">
          <div className="card-body__container">
            <h2 className="grow text-center font-extrabold text-3xl text-gray-800">
              {region}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionCard;
