import { useEffect, useState, useRef } from "react";
import { CountryViewObj } from "../models/model";
import RegionWrapper from "../components/Wrapper/RegionWrapper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { regionImageArr, regionArr } from "../data/data";
import CountryCard from "../components/UI/Card/CountryCard";
import { AppDispatch, RootState } from "../store";
import { fetchCountries } from "../store/countries-slice";

const Region = () => {
  let pathRegion = window.location.pathname.split("/")[3];
  if (pathRegion === "North%20America") pathRegion = "North America";
  if (pathRegion === "South%20America") pathRegion = "South America";
  // declare useState
  const [defaultData, setDefaultData] = useState<CountryViewObj[]>([]);
  const [countryData, setCountryData] = useState<CountryViewObj[]>([]);
  const [dataLength, setDataLength] = useState(defaultData.length);
  const [isLoading, setIsLoading] = useState(true);
  const [bgImage, setBgImage] = useState(regionImageArr[pathRegion]);
  const [currRegion, setCurrRegion] = useState(pathRegion);

  // declare useRef
  const searchInputRef = useRef<HTMLInputElement>(null);
  // declare useSelector
  const countriesData = useSelector(
    (state: RootState) => state.countriesReducer.countries
  );
  const { countries } = useSelector(
    (state: RootState) => state.countriesReducer
  );
  // declare dispatch
  const dispatch = useDispatch<AppDispatch>();
  // declare navigate
  const navigate = useNavigate();

  let selectedRegion: string;

  function utilizeCountriesData() {
    if (countries.length === 0) return;
    const resData: any = countries;
    const loadedData = [];
    for (const key in resData) {
      if (
        resData[key].continents[0] ===
        (selectedRegion === undefined ? currRegion : selectedRegion)
      ) {
        loadedData.push({
          name: resData[key].name.common,
          population: resData[key].population,
          continents: resData[key].continents,
          capital: resData[key].capital,
          currencies: resData[key].currencies,
          languages: resData[key].languages,
          coatOfArms: resData[key].coatOfArms.png,
          flagImg: resData[key].flags.png,
          flagIcon: resData[key].flag,
          cca3: resData[key].cca3,
          borders: resData[key].borders,
        });
      }
    }
    setDefaultData(loadedData);
    setCountryData(loadedData);
    setDataLength(loadedData.length);
    setIsLoading(false);
  }
  useEffect(() => {
    countries.length === 0 && dispatch(fetchCountries());
  }, []);
  useEffect(() => {
    utilizeCountriesData();
  }, [countries.length]);

  function handleCheckValue() {
    const filteredData = defaultData.filter((country) =>
      country.name
        .toLowerCase()
        .includes(searchInputRef.current!.value.toLowerCase())
    );
    setCountryData(filteredData);
    setDataLength(filteredData.length);
  }

  return (
    <RegionWrapper imageUrl={bgImage}>
      <div className="">
        <section className="py-4">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Country"
            className="input input-bordered input-primary w-full max-w-xs outline-none border-0"
            onKeyUp={handleCheckValue}
          />
        </section>
        <section className="countries py-4 md:pb-0">
          <div className="regionCountries">
            <div className="min-h-40">
              {isLoading && (
                <h2 className="text-slate-200 font-bold text-xl block">
                  Loading...
                </h2>
              )}
              {!isLoading && countriesData && (
                <p className="font-bold text-xl text-slate-100 pb-3">
                  {currRegion}: {dataLength} countries matched
                </p>
              )}
            </div>
            {!isLoading && countryData && (
              <div className="region-container max-h-640 overflow-scroll md:flex md:flex-wrap xl:pb-32">
                {countryData.map((country, index) => {
                  return (
                    <CountryCard
                      key={index}
                      flagImg={`${country.flagImg}`}
                      countryName={country.name}
                      cca3={country.cca3}
                      isBeenTo={false}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </RegionWrapper>
  );
};

export default Region;
