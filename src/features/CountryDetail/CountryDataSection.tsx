import LinkIcon from "../../components/Icons/LinkIcon";
import WikipediaLink from "../../components/Link/WikipediaLink";
import { CountryViewObj } from "../../types/country";

type Props = {
  countryData: CountryViewObj;
};

const CountryDataSection = ({ countryData }: Props) => {
  return (
    <div className="flex flex-wrap flex-row justify-start items-start pb-3">
      <div className="country-data basis-1/2 min-h-56 pr-2 ">
        <div className="stat-title">Capital City</div>
        {Object.values(countryData?.capital).map((city) => {
          return (
            <div
              key={city}
              className="font-bold text-2xl tracking-tight dark:text-slate-100"
            >
              {city}
            </div>
          );
        })}
      </div>
      <div className="country-data basis-1/2 min-h-56 pr-2">
        <div className="stat-title dark:text-slate-100">Population</div>
        <div className="font-bold text-2xl tracking-tight dark:text-slate-100">
          {countryData.population.toLocaleString()}
        </div>
      </div>
      <div className="country-data basis-1/2 min-h-56 pr-2">
        <div className="stat-title">Region</div>
        <div className="font-bold text-2xl tracking-tight dark:text-slate-100">
          {countryData.continents}
        </div>
      </div>
      <div className="country-data basis-1/2 min-h-56 pr-2">
        <div className="stat-title">Language</div>
        {Object.values(countryData?.languages).map((lang) => {
          return (
            <div
              key={lang}
              className="font-bold text-2xl tracking-tight break-words dark:text-slate-100"
            >
              {lang}
            </div>
          );
        })}
      </div>
      <div className="country-data basis-1/2 min-h-56 pr-2">
        <div className="stat-title">Currency</div>
        {Object.keys(countryData?.currencies).map((curr) => {
          return (
            <div
              key={curr}
              className="font-bold text-2xl tracking-tight dark:text-slate-100"
            >
              {curr}
            </div>
          );
        })}
      </div>
      <div className="country-data basis-1/2 min-h-56 pr-2">
        <div className="stat-title">More Info</div>
        <div className="font-normal text-2xl tracking-tight dark:text-slate-100">
          <WikipediaLink countryData={countryData} />
        </div>
      </div>
    </div>
  );
};

export default CountryDataSection;
