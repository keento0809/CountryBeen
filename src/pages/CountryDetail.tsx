import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Wrapper from "../components/UI/Wrapper";
import Header from "../layouts/Header";

const initialState = {
  name: "",
  capital: "",
  population: "",
  continents: "",
  currencies: "",
  languages: "",
  coatOfArms: "",
  flagImg: "",
  flagIcon: "",
  cca3: "",
  borders: "",
};

const CountryDetail: React.FC = () => {
  const [countryData, setCountryData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  function requestCountryData() {
    setIsLoading(true);

    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res) throw new Error("Request failed.");
        const resData = res.data;

        const pathName = window.location.pathname.toString();
        const currentCCA3 = pathName.substring(
          pathName.length - 3,
          pathName.length
        );

        for (const key in resData) {
          if (resData[key].cca3 === currentCCA3) {
            setCountryData({
              name: resData[key].name.common,
              capital: resData[key].capital,
              population: resData[key].population,
              continents: resData[key].continents,
              currencies: resData[key].currencies,
              languages: resData[key].languages,
              coatOfArms: resData[key].coatOfArms.png,
              flagImg: resData[key].flags.png,
              flagIcon: resData[key].flag,
              cca3: resData[key].cca3,
              borders: resData[key].borders,
            });
            break;
          }
        }
      })
      .catch((error) => console.log(error.message));
    setIsLoading(false);
  }

  useEffect(() => {
    requestCountryData();
    console.log();
  }, []);

  return (
    <Wrapper>
      <Header />
      <div className="pt-16 flex justify-center items-center z-10">
        <div className="card w-full glass mx-auto bg-transparent rounded-3xl">
          <figure className="pb-3">
            <img
              src={`${countryData.flagImg}`}
              alt="car!"
              className="w-full h-248 rounded-3xl"
            />
          </figure>
          <div className="card-body bg-white opacity-80 rounded-3xl">
            <div className="flex flex-row items-center justify-between">
              <h2 className="stat-value">{`${countryData.name}`}</h2>
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
            {/* flex flex-wrap flex-row justify-start items-center */}
            <div className="flex flex-wrap flex-row justify-start items-center">
              <div className="country-data basis-1/2">
                <div className="stat-title">Capital City</div>
                <div className="font-bold text-2xl tracking-tight">
                  {countryData.capital}
                </div>
              </div>
              <div className="country-data basis-1/2">
                <div className="stat-title">Population</div>
                <div className="font-bold text-2xl tracking-tight">
                  {countryData.population.toLocaleString()}
                </div>
              </div>
              <div className="country-data basis-1/2">
                <div className="stat-title">Region</div>
                <div className="font-bold text-2xl tracking-tight">
                  {countryData.continents}
                </div>
              </div>
              <div className="country-data basis-1/2">
                <div className="stat-title">Language</div>
                <div className="font-bold text-2xl tracking-tight">
                  {Object.values(countryData.languages)}
                </div>
              </div>
              <div className="country-data basis-1/2">
                <div className="stat-title">Currency</div>
                <div className="font-bold text-2xl tracking-tight">
                  {/* {countryData.currencies} */}
                  JPN
                </div>
              </div>
              <div className="country-data basis-1/2">
                <div className="stat-title">More Info</div>
                <div className="font-normal text-2xl tracking-tight">
                  <a
                    href={`https://en.wikipedia.org/wiki/${
                      countryData.name[0]
                    }${countryData.name.slice(1)}`}
                  >
                    →Wikipedia
                  </a>
                </div>
              </div>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">
                <Link to="/search">BACK</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CountryDetail;
