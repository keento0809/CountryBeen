import { Fragment } from "react";
import { Link } from "react-router-dom";
import { CountryCardProps } from "../../../models/model";

const CountryCard = ({
  flagImg,
  countryName,
  cca3,
  handleToggleBeenTo,
}: CountryCardProps) => {
  return (
    <div
      className="card mx-auto lg:mr-auto mb-4 w-full max-w-374 md:max-w-340 lg:max-w-310 xl:max-w-320 md:basis-1/2 h-248 max-h-264 bg-base-100 shadow-xl image-full"
      //   key={index}
    >
      <figure>
        <img
          className="object-cover w-full opacity-40 z-10"
          src={flagImg}
          alt="Shoes"
        />
      </figure>
      <div className="card-body transition-all overflow-hidden">
        <Link to={`/countries/${cca3}`}>
          <h2 className="font-extrabold text-3xl drop-shadow-md">
            {countryName}
          </h2>
        </Link>
        <div className="icons flex flex-row" id={cca3}>
          <svg
            // onClick={handleToggleFavorite}
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-4 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor" // #ff8ce4
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <svg
            onClick={handleToggleBeenTo}
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
