import { useState } from "react";
import { Link } from "react-router-dom";
import { CountryCardProps } from "../../types/country";

const CountryCard = ({ flagImg, countryName, cca3 }: CountryCardProps) => {
  const [hover, setHover] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl mr-auto mb-4 transition-all">
      <Link
        to={`/countries/${cca3}`}
        className="cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchStart={() => setHover(true)}
        onTouchEnd={() => setHover(false)}
      >
        <div className="card w-full max-w-374 md:max-w-340 lg:max-w-310 xl:max-w-320 md:basis-1/2 h-248 max-h-264 shadow-xl image-full transition-transform rounded-2xl hover:scale-105">
          <figure>
            <img
              className="object-cover w-ful z-10"
              src={flagImg}
              alt="Shoes"
            />
          </figure>
          <div
            className={`${
              hover ? "block" : "hidden"
            } card-body rounded-2xl transition-all overflow-hidden bg-black opacity-40`}
          >
            <h2 className="font-extrabold text-3xl drop-shadow-xl dark:text-slate-50 opacity-1">
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
