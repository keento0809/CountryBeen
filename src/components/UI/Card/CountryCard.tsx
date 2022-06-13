import { Fragment } from "react";
import { Link } from "react-router-dom";
import { CountryCardProps } from "../../../models/model";

const CountryCard = ({
  flagImg,
  countryName,
  cca3,
  isBeenTo,
}: CountryCardProps) => {
  function handleClick() {
    console.log(cca3);
  }

  return (
    <div className="overflow-hidden rounded-2xl ml-auto mr-auto md:ml-0 mb-4">
      <Link to={`/countries/${cca3}`} className="cursor-pointer">
        <div className="card w-full max-w-374 md:max-w-340 lg:max-w-310 xl:max-w-320 md:basis-1/2 h-248 max-h-264 bg-base-100 shadow-xl image-full hover:scale-105 transition-transform">
          <figure>
            <img
              className="object-cover w-full opacity-40 z-10"
              src={flagImg}
              alt="Shoes"
            />
          </figure>
          <div className="card-body transition-all overflow-hidden">
            <h2 className="font-extrabold text-3xl drop-shadow-md dark:text-slate-50">
              {countryName}
            </h2>
            {/* <div className="tooltip tooltip-right" data-tip="Add Record">
              <svg
                onClick={handleClick}
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 inline-block cursor-pointer z-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#f92fca"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div> */}
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={handleClick}
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
