import React, { useEffect, useState } from "react";
import Wrapper from "../components/UI/Wrapper";
import { Link } from "react-router-dom";
import { regionArrFixed, regionImageArr } from "../data/data";

const Search = () => {
  // declare useState
  const [regionData, setRegionData] = useState<string[]>([]);

  useEffect(() => {
    setRegionData(regionArrFixed);
  }, []);

  return (
    <Wrapper>
      <div className="">
        {/* <section className="py-4">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Country"
            className="input input-bordered input-primary w-full max-w-xs outline-none border-0"
            onKeyUp={handleCheckValue}
          />
        </section> */}
        <section className="countries py-4">
          <div className="countries-container max-h-780 overflow-scroll">
            {regionData.map((region, index) => {
              return (
                <Link to={`/countries/region/${region}`} key={index}>
                  <div className="card mb-2 w-full h-248 bg-base-100 shadow-xl image-full cursor-pointer">
                    <figure>
                      <img
                        className="object-cover w-full"
                        src={regionImageArr[region]}
                        alt=""
                      />
                    </figure>

                    <div className="card-body flex justify-center items-center">
                      <div className="card-body__container">
                        <h2 className="grow font-extrabold text-3xl text-white">
                          {region}
                        </h2>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

export default Search;
