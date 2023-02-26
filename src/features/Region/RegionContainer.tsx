import { useEffect, useState, useRef } from "react";
import { CountryViewObj } from "../../types/country";
import { useDispatch, useSelector } from "react-redux";
import CountryCard from "../../components/Card/CountryCard";
import { AppDispatch, RootState } from "../../store";
import { fetchCountries } from "../../store/countries-slice";
import { createLoadedDataArray } from "../../helpers/Region";

const RegionContainer = () => {
  let pathRegion = window.location.pathname.split("/")[3];
  if (pathRegion === "North%20America") pathRegion = "North America";
  if (pathRegion === "South%20America") pathRegion = "South America";
  const [defaultData, setDefaultData] = useState<CountryViewObj[]>([]);
  const [countryData, setCountryData] = useState<CountryViewObj[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const countriesData = useSelector(
    (state: RootState) => state.countriesReducer.countries
  );
  const { countries } = useSelector(
    (state: RootState) => state.countriesReducer
  );
  const currRegion = pathRegion;
  let selectedRegion: string;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    } else utilizeCountriesData();
  }, []);

  useEffect(() => {
    countries.length === 250 && utilizeCountriesData();
  }, [countries.length]);

  const utilizeCountriesData = () => {
    if (countries.length === 0) return;
    const resData: any = countries;
    const loadedData = createLoadedDataArray(
      resData,
      currRegion,
      selectedRegion && selectedRegion
    );
    setDefaultData(loadedData);
    setCountryData(loadedData);
    setIsLoading(false);
  };

  const handleCheckValue = () => {
    const filteredData = defaultData.filter((country) =>
      country.name
        .toLowerCase()
        .includes(searchInputRef.current!.value.toLowerCase())
    );
    setCountryData(filteredData);
  };

  return (
    <>
      <section className="py-4">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search Country"
          className="input input-bordered input-primary w-full max-w-xs outline-none border-0"
          onKeyUp={handleCheckValue}
        />
      </section>
      <section className="countries pt-4 pb-12 md:pb-0">
        <div className="regionCountries">
          <div className="min-h-40">
            {isLoading && (
              <h2 className="text-slate-200 font-bold text-xl block">
                Loading...
              </h2>
            )}
            {!isLoading && countriesData && (
              <p className="font-bold text-xl text-slate-100 pb-3">
                {currRegion}: {countryData.length} countries matched
              </p>
            )}
          </div>
          {!isLoading && countryData && (
            <div className="region-container max-h-640 overflow-scroll md:grid md:grid-cols-2 md:mx-auto md:max-w-704 lg:grid-cols-3 lg:max-w-960 xl:grid-cols-4 xl:max-w-none xl:gap-2 xl:pb-32">
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
    </>
  );
};

export default RegionContainer;
