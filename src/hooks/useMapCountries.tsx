import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { CountryViewObj } from "../models/model";

const useMapCountries = (list: CountryViewObj[]) => {
  // declare useState
  const [resultMap, setResultMap] = useState<any>([]);
  //   let resultMap;
  setResultMap(
    list.map((country, index) => {
      return (
        <div
          className="card w-full mb-4 h-248 bg-base-100 shadow-xl image-full"
          key={index}
        >
          <figure>
            <img
              className="object-cover w-full"
              src={`${country.flagImg}`}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <Link to={`/countries/${country.cca3}`} key={index}>
              <h2 className="font-extrabold text-3xl">{country.name}</h2>
            </Link>
            <p className="invisible">{country.population.toLocaleString()}</p>
            <div className="icons flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
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
    })
  );
  return resultMap;
};

export default useMapCountries;
