import { RegionCardProps } from "../../types/region";
import imgPath from "../../assets/img-for-regionCard-1ver2.jpg";

const RegionCard = ({ region }: RegionCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl mb-2">
      <div className="card w-full bg-base-100 shadow-xl image-full cursor-pointer hover:scale-110 transition-transform">
        <figure>
          <img
            className="opacity-40 z-10"
            src={imgPath}
            alt=""
            width={374}
            height={280}
          />
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
