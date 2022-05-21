import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Wrapper from "../components/UI/Wrapper";

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
    <div
      className="opacity-90"
      style={{
        backgroundImage: `url(${countryData.coatOfArms})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
      }}
    >
      <Wrapper>
        <div className="min-h-screen flex justify-center items-center z-10">
          <div className="card w-full glass mx-auto">
            <figure>
              {/* original */}
              {/* <img src="https://api.lorem.space/image/car?w=400&h=225" alt="car!" /> */}
              <img
                src={`${countryData.flagImg}`}
                alt="car!"
                className="w-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="stat-value">{`${countryData.name}`}</h2>
              <div>
                <div className="country-data pt-3">
                  <div className="stat-title pb-2">Capital City</div>
                  <div className="font-bold text-2xl">
                    {countryData.capital}
                  </div>
                </div>
                <div className="country-data pt-3">
                  <div className="stat-title pb-2">Population</div>
                  <div className="font-bold text-2xl">
                    {countryData.population.toLocaleString()}
                  </div>
                </div>
                <div className="country-data pt-3">
                  <div className="stat-title pb-2">Region</div>
                  <div className="font-bold text-2xl">
                    {countryData.continents}
                  </div>
                </div>
                <div className="country-data pt-3">
                  <div className="stat-title pb-2">Language</div>
                  <div className="font-bold text-2xl">
                    {Object.values(countryData.languages)}
                  </div>
                </div>
                <div className="country-data pt-3">
                  <div className="stat-title pb-2">Currency</div>
                  <div className="font-bold text-2xl">
                    {/* {countryData.currencies} */}
                  </div>
                </div>
                <div className="country-data pt-3">
                  <div className="stat-title pb-2">More Info</div>
                  <div className="font-normal text-xl">
                    <a
                      href={`https://en.wikipedia.org/wiki/${
                        countryData.name[0]
                      }${countryData.name.slice(1)}`}
                    >
                      →Wikipedia
                    </a>
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
        </div>
      </Wrapper>
    </div>
  );
};

export default CountryDetail;

// // style={{
//   backgroundImage: `url(${countryData.coatOfArms})`,
//   backgroundSize: "cover",
//   backgroundPosition: "50% 50%",
// }}
