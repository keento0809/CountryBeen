import { Link } from "react-router-dom";
import { CountryCardProps } from "../../types/country";

const CountryCard = ({ flagImg, countryName, cca3 }: CountryCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-transparent mr-auto mb-4">
      <Link to={`/countries/${cca3}`} className="cursor-pointer">
        <div className="card w-full max-w-374 md:max-w-340 lg:max-w-310 xl:max-w-320 md:basis-1/2 h-248 max-h-264 shadow-xl image-full hover:scale-105 transition-transform rounded-2xl bg-transparent">
          <figure>
            <img
              className="object-cover w-full opacity-40 z-10"
              src={flagImg}
              alt="Shoes"
            />
          </figure>
          <div className="card-body rounded-2xl transition-all overflow-hidden">
            <h2 className="font-extrabold text-3xl drop-shadow-md dark:text-slate-50">
              {countryName}
            </h2>
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-lg font-bold text-white">Detail</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CountryCard;
