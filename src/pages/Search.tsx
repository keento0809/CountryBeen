import Wrapper from "../components/Wrapper/Wrapper";
import { Link } from "react-router-dom";
import { regionArrFixed } from "../data/data";
import RegionCard from "../components/Card/RegionCard";

const Search = () => {
  const regionData = regionArrFixed;
  return (
    <Wrapper>
      <>
        <div className="title text-center text-white">
          <h2 className="py-6 font-bold text-2xl dark:text-gray-200">
            Select Region
          </h2>
        </div>
        <section className="countries lg:pb-6">
          <div className="countries-container max-h-680 overflow-scroll lg:flex lg:flex-wrap lg:justify-between xl:justify-evenly">
            {regionData.length === 0 && (
              <p className="text-slate-800">Loading...</p>
            )}
            {regionData &&
              regionData.map((region, index) => {
                return (
                  <Link
                    to={`/countries/region/${region}`}
                    key={index}
                    className="lg:block lg:max-w-374"
                  >
                    <RegionCard region={region} />
                  </Link>
                );
              })}
          </div>
        </section>
      </>
    </Wrapper>
  );
};

export default Search;
