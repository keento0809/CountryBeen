import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../components/UI/Wrapper";
import Header from "../layouts/Header";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const BeenTo = () => {
  const beenToList = useSelector(
    (state: RootState) => state.beenReducer.beenToList
  );
  console.log(beenToList);

  return (
    <Wrapper>
      {/* <Header /> */}
      <div className="">
        <div className="title text-center text-white">
          <h2 className="py-6 font-bold text-2xl">Been To</h2>
        </div>
        {beenToList.map((country, index) => {
          return (
            <div
              className="card w-full bg-base-100 shadow-xl image-full"
              key={index}
            >
              <figure>
                <img
                  src="https://api.lorem.space/image/shoes?w=400&h=225"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <Link to={`/countries/${country.cca3}`} key={index}>
                  <h2 className="font-extrabold text-3xl">{country.name}</h2>
                </Link>
                <p>{country.population.toLocaleString()}</p>
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
        })}
      </div>
    </Wrapper>
  );
};

export default BeenTo;
