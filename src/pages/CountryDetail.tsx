import { useEffect, useState, Fragment } from "react";
import { CountryViewObj } from "../models/model";
import axios from "axios";

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
  const [countryData, setCountryData] = useState<any>(initialState);
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

        console.log(currentCCA3);

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
  }, []);

  return (
    <Fragment>
      <div>
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <div>
            <p>
              The info of {`${countryData.name ? countryData.name : ""}`} are
              below.
            </p>
            <p>{`capital: ${countryData.capital}, population: ${countryData.population}, continents: ${countryData.continents}, currencies: ${countryData.currencies}, languages: ${countryData.languages}, flagIcon: ${countryData.flagIcon}, cca3: ${countryData.cca3}, borders: ${countryData.borders}`}</p>
            <img src={`${countryData.coatOfArms}`} alt="coatOfArms" />
            <img src={`${countryData.flagImg}`} alt="flag" />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CountryDetail;
